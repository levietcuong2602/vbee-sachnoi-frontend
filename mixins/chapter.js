import { downloadChapter } from "@/api/chapter";
import { changeToSlug } from "@/utils/convert";
import JSZip from "jszip";
let saveAs = null;
if (process.client) {
  saveAs = require("jszip/vendor/FileSaver.js");
}

export const downloadMixins = {
  methods: {
    async downloadChapter(audioUrl, chapterName) {
      const baseUrl = process.env.baseUrl;
      if (audioUrl && audioUrl.length > 0) {
        const link = audioUrl.replace("public", "").replace(/\\/gi, "/");
        const desc = baseUrl + link;
        const mimtype = link.substring(link.lastIndexOf(".") + 1);
        const fileName = `${changeToSlug(chapterName)}.${mimtype}`;
        try {
          await downloadChapter(desc).then(res => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName); //or any other extension
            document.body.appendChild(link);
            link.click();
          });
        } catch (error) {
          console.log(error.message);
          this.$notify({
            type: "error",
            message: "Có lỗi xảy ra",
            offset: 40
          });
        }
        return;
      }
      this.$notify({
        type: "error",
        message: "File audio của chương chưa được tổng hợp.",
        offset: 40
      });
    },
    downloadZip({ bookName, chapters }) {
      let count = 0;
      let zip = new JSZip();

      const query = { bookName: changeToSlug(bookName), chapters, count, zip };
      this.downloadFile(query, this.onDownloadComplete);
    },
    downloadFile(query, onSuccess) {
      const baseUrl = process.env.baseUrl;
      const { chapters, count } = query;

      const audioUrl = chapters[count].audio;
      const link = audioUrl.replace("public", "").replace(/\\/gi, "/");
      const desc = baseUrl + link;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", desc, true);
      xhr.responseType = "blob";
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
          if (onSuccess) onSuccess(query, xhr.response);
        }
      };
      xhr.send();
    },
    onDownloadComplete(query, blobData) {
      const baseUrl = process.env.baseUrl;
      let { bookName, chapters, count, zip } = query;

      if (count < chapters.length) {
        const _this = this;
        this.blobToBase64(blobData, function(binaryData) {
          // add downloaded file to zip:
          const { title, audio } = chapters[count];
          const file =
            changeToSlug(title) + audio.substring(audio.lastIndexOf("."));
          zip.file(file, binaryData, { base64: true });

          if (count < chapters.length - 1) {
            count++;
            _this.downloadFile({ ...query, count }, _this.onDownloadComplete);
          } else {
            // all files have been downloaded, create the zip
            zip.generateAsync({ type: "blob" }).then(function(content) {
              // see FileSaver.js
              saveAs(content, `${bookName}.zip`);
            });
          }
        });
      }
    },
    blobToBase64(blob, callback) {
      var reader = new FileReader();
      reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(",")[1];
        callback(base64);
      };
      reader.readAsDataURL(blob);
    }
  }
};
