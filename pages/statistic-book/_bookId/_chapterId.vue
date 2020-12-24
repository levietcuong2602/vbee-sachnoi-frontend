<template>
  <div class="chapter-detail">
    <div class="box__body">
      <el-scrollbar wrap-class="preview-book__scroll">
        <div class="dialog-box">
          <div class="dialog-box__main col-lg-10 col-12">
            <div class="title-chapter">
              <div class="note">
                <p class="note-item bg-danger"></p>
                <span>lỗi</span>
                <p class="note-item bg-info"></p>
                <span>thêm</span>
                <p class="note-item bg-warning"></p>
                <span>sửa</span>
              </div>
              <h5 class="text-center">{{ currentChapter ? currentChapter.title : "" }}</h5>
              <div class="back">
                <el-tooltip effect="light" content="Đóng" placement="bottom-start">
                  <i class="fas fa-times" @click="gotoBack" style="cursor: pointer"></i>
                </el-tooltip>
              </div>
            </div>
            <template v-for="(sentence, index) in sentences">
              <span
                v-if="currentSentence === index"
                :key="sentence.file_name"
                class="highlight-btn"
                @contextmenu.prevent="event => showContextMenu(event, index)"
                @click="jumpToPhare(sentence, index)"
              >{{ sentence.content }}</span>
              <span
                v-else
                :key="sentence.file_name"
                class="highlight"
                :class="getClassByStatus(sentence.status)"
                @contextmenu.prevent="event => showContextMenu(event, index)"
                @click="jumpToPhare(sentence, index)"
              >{{ sentence.content }}&nbsp;</span>
            </template>
            <div class="footer-chapter text-right">
              <el-button v-if="isChange" type="primary" @click="requestConvertChapter">Cập nhật</el-button>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="box__footer">
      <div class="box__footer_main row">
        <div class="box__footer_main-controll col-lg-3">
          <span class="btn btn-prev" @click="handlePrevSentence">
            <el-tooltip effect="light" content="Previous" placement="bottom-start">
              <i class="fas fa-step-backward"></i>
            </el-tooltip>
          </span>
          <span v-if="isStartingAudio" class="btn btn-pause" @click="handleStopAudio">
            <el-tooltip effect="light" content="Play" placement="bottom-start">
              <i class="far fa-pause-circle"></i>
            </el-tooltip>
          </span>
          <span v-else class="btn btn-play" @click="handleStartAudio">
            <el-tooltip effect="light" content="Pause" placement="bottom-start">
              <i class="far fa-play-circle"></i>
            </el-tooltip>
          </span>
          <span class="btn btn-next" @click="handleNextSentence">
            <el-tooltip effect="light" content="Next" placement="bottom-start">
              <i class="fas fa-step-forward"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="box__footer_main-process col-lg-6">
          <div class="process">
            <p class="name m-0">{{ currentChapter ? currentChapter.title : "" }}</p>
          </div>
          <div class="sound">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="fas fa-volume-up"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-slider
                    v-model="soundVolume"
                    :min="0"
                    :max="100"
                    vertical
                    height="200px"
                    @change="handleChangeVolume"
                  ></el-slider>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="download">
            <el-tooltip effect="light" content="Tải xuống" placement="bottom-start">
              <span @click="handleDownloadChapter">
                <img src="/img/download.png" alt />
              </span>
            </el-tooltip>
            <!-- <el-dropdown trigger="click" @command="handleDownloadChapter">
              <span class="el-dropdown-link">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="item-download" command="1">
                  <img src="/img/download.png" alt />
                  <span>Tải xuống</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
          </div>
        </div>
        <div class="box__footer_main-chapter col-lg-3">
          <el-select v-model="chapterId" placeholder="Chọn chương" @change="handleChangeChapter">
            <el-option
              v-for="chapter in chapterOptions"
              :key="chapter.id"
              :label="chapter.title"
              :value="chapter.id"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- inner dialog -->
    <el-dialog
      class="book-detail__inner-dialog"
      width="40%"
      :visible.sync="innerVisible"
      append-to-body
    >
      <template slot="title">
        <h5 class="text-center m-0">{{ titleInnerDialog }}</h5>
      </template>
      <!-- body inner dialog -->
      <div class="body-inner">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Vui lòng nhập vào đây ..."
          v-model="tempSentence"
        ></el-input>
      </div>
      <!-- end body inner dialog -->
      <div slot="footer">
        <el-button type="primary" @click="handlePhrases">Xác nhận</el-button>
        <el-button type="danger" @click="innerVisible = false">Bỏ qua</el-button>
      </div>
    </el-dialog>
    <!-- end inner dialog -->
    <!-- context menu -->
    <ul id="context-menu">
      <li class="context-menu-item">
        <img
          class="context-menu-icon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NS40IDQ1LjQiPjxwYXRoIGZpbGw9IiNmOTY5MGUiIGQ9Ik00MS4zIDE4LjZIMjYuOFY0YzAtMi0xLjgtNC00LTQtMi40IDAtNC4yIDItNC4yIDR2MTQuNkg0Yy0yIDAtNCAxLjgtNCA0IDAgMS4yLjUgMi4zIDEuMiAzIC44LjggMS44IDEuMyAzIDEuM2gxNC40djE0LjNjMCAxIC40IDIgMS4yIDMgLjcuNiAxLjggMSAzIDEgMi4yIDAgNC0xLjcgNC00VjI3aDE0LjVjMi4zIDAgNC0yIDQtNC4zcy0xLjgtNC00LTR6Ii8+PC9zdmc+"
          width="12"
        />
        Thêm mới
        <ul>
          <li
            class="context-menu-item"
            @click="handleChangeOption('ADD_BEFORE_PHRASE')"
          >Thêm vào đầu</li>
          <li
            class="context-menu-item"
            @click="handleChangeOption('ADD_AFTER_PHRASE')"
          >Thêm vào cuối</li>
        </ul>
      </li>
      <li class="context-menu-item" @click="handleChangeOption('EDIT_PHRASE')">
        <img
          class="context-menu-icon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjguOSA1MjguOSI+PHBhdGggZmlsbD0iI2Y5NjkwZSIgZD0iTTMyOSA4OWwxMDcuNSAxMDcuN0wxNjQgNDY5IDU2LjcgMzYxLjYgMzI5IDg5em0xODktMjUuOGwtNDgtNDhjLTE4LjQtMTguNS00OC41LTE4LjUtNjcgMGwtNDYgNDYgMTA3LjUgMTA3LjVMNTE4IDExNWMxNC41LTE0LjIgMTQuNS0zNy40IDAtNTEuOHpNLjQgNTEyLjdjLTIgOC44IDYgMTYuNyAxNC44IDE0LjZsMTIwLTI5TDI3LjUgMzkwLjUuMyA1MTIuNnoiLz48L3N2Zz4="
          width="12"
        />
        Sửa
      </li>
      <li class="context-menu-item" @click="deletePhrases">
        <img
          class="context-menu-icon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzkuMiAzMzkuMiI+PHBhdGggZmlsbD0iI2Y5NjkwZSIgZD0iTTI0Ny4yIDE2OS42bDg0LTg0YzUuMy01LjMgOC0xMS43IDgtMTkuNCAwLTcuNi0yLjctMTQtOC0xOS40TDI5Mi40IDhDMjg3IDIuNyAyODAuNiAwIDI3MyAwYy03LjcgMC0xNCAyLjctMTkuNSA4bC04NCA4NEw4NS44IDhDODAuMyAyLjcgNzQgMCA2Ni4yIDBjLTcuNiAwLTE0IDIuNy0xOS40IDhMOCA0Ni44Yy01LjMgNS40LTggMTEuOC04IDE5LjQgMCA3LjcgMi43IDE0IDggMTkuNWw4NCA4NC04NCA4My44QzIuNyAyNTkgMCAyNjUuMyAwIDI3M2MwIDcuNiAyLjcgMTQgOCAxOS40bDM4LjggMzguOGM1LjQgNS4zIDExLjggOCAxOS40IDggNy43IDAgMTQtMi43IDE5LjUtOGw4NC04NCA4My44IDg0YzUuNCA1LjMgMTEuOCA4IDE5LjUgOCA3LjYgMCAxNC0yLjcgMTkuNC04bDM4LjgtMzguOGM1LjMtNS40IDgtMTEuOCA4LTE5LjUgMC03LjctMi43LTE0LTgtMTkuNWwtODQtODR6Ii8+PC9zdmc+"
          width="10"
        />
        Xóa
      </li>
    </ul>
    <!-- end context menu -->
    <audio ref="audioSrc" id="idAudio" preload="auto" autoplay :src="audioSrc"></audio>

    <el-backtop
      target=".chapter-detail .box__body"
      :right="40"
      :bottom="60"
      :visibility-height="100"
    ></el-backtop>
  </div>
</template>
  </div>
</template>
<script>
import {
  getChapter,
  updateChapter,
  downloadChapter,
  getChapters
} from "@/api/chapter";
import { reconvertChapter } from "@/api/tts";
import { mapGetters } from "vuex";
import { STATUS_SENTENCE } from "@/constant";
import { downloadMixins } from "@/mixins/chapter";
import { async } from "q";

const OPTIONS_TYPE = {
  ADD_BEFORE_PHRASE: 0,
  ADD_AFTER_PHRASE: 1,
  EDIT_PHRASE: 2,
  DELETE_PHRASE: 3
};

export default {
  name: "chapter",
  data() {
    return {
      sentences: [],
      isStartingAudio: false,
      tempSentence: "",
      tempIndex: null,
      titleInnerDialog: "Thêm mới",
      currentOption: -1,
      currentSentence: 0,
      dateRange: [],
      // context-menu
      contextMenuWidth: null,
      contextMenuHeight: null,
      isLoadingData: true,
      currentChapter: null,
      audioSrc: null,
      innerVisible: false,
      bookdId: null,
      chapterId: null,
      soundVolume: 40,
      isChange: false,
      chapterOptions: []
    };
  },
  mixins: [downloadMixins],
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    jumpToPhare(sentence, index) {
      const { content } = sentence;
      this.tempSentence = content;
      this.currentSentence = index;

      this.handleStartAudio();
    },
    showContextMenu(vm, index) {
      this.tempIndex = index;
      this.tempSentence = vm.target.textContent;
      var widthSidebar = this.sidebar.opened ? 210 : 54;
      var menu = document.getElementById("context-menu");
      if (!this.contextMenuWidth || !this.contextMenuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.contextMenuWidth = menu.offsetWidth;
        this.contextMenuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }

      if (this.contextMenuWidth + vm.pageX >= window.innerWidth) {
        menu.style.left = vm.pageX - this.contextMenuWidth + "px";
      } else {
        // để dialog nên phải trừ đi độ rộng của sidebar
        // menu left: tính từ mép phải sidebar
        // bt tính mép phải màn hình
        if (vm.pageX < widthSidebar) {
          menu.style.left = "0px";
        } else {
          menu.style.left = vm.pageX - widthSidebar + "px";
        }
      }
      if (this.contextMenuHeight + vm.pageY >= window.innerHeight) {
        menu.style.top = vm.pageY - this.contextMenuHeight + "px";
      } else {
        menu.style.top = vm.pageY + "px";
      }

      menu.classList.add("active");
    },
    hideContextMenu: () => {
      if (document.getElementById("context-menu")) {
        document.getElementById("context-menu").classList.remove("active");
      }
    },
    async addBeforePhrases() {
      if (this.tempSentence.trim().length > 0) {
        const sentences = this.sentences.filter(
          sentence => sentence.content.trim().length > 0
        );
        const sentence = {
          content: this.tempSentence,
          fileName: null,
          link: null,
          status: STATUS_SENTENCE.ADD
        };
        sentences.splice(this.tempIndex, 0, sentence);

        const content = sentences.reduce(
          (accumulator, sentence) => `${accumulator} ${sentence.content}`,
          ""
        );
        this.sentences = sentences;
        this.isChange = true;
        await updateChapter(this.chapterId, { sentences, content });
        await this.getChapterInfo();
        return;
      }
      this.$notify({
        type: "error",
        message: "Lỗi thao tác dữ liệu",
        offset: 40
      });
    },
    async addAfterPhrases() {
      if (this.tempSentence.trim().length > 0) {
        const sentences = this.sentences.filter(
          sentence => sentence.content.trim().length > 0
        );
        const sentence = {
          content: this.tempSentence,
          fileName: null,
          link: null,
          status: STATUS_SENTENCE.ADD
        };
        sentences.splice(this.tempIndex + 1, 0, sentence);
        const content = sentences.reduce(
          (accumulator, sentence) => `${accumulator} ${sentence.content}`,
          ""
        );
        this.sentences = sentences;
        this.tempIndex += 1;
        this.isChange = true;
        await updateChapter(this.chapterId, { sentences, content });
        await this.getChapterInfo();
        return;
      }
      this.$notify({
        type: "error",
        message: "Lỗi thao tác dữ liệu",
        offset: 40
      });
    },
    async editPhrases() {
      if (this.tempSentence.trim().length > 0) {
        const sentences = this.sentences
          .filter(sentence => sentence.content.trim().length > 0)
          .map((sentence, index) => {
            if (index === this.tempIndex) {
              return {
                ...sentence,
                content: this.tempSentence,
                status: STATUS_SENTENCE.EDIT
              };
            }
            return sentence;
          });
        const content = sentences.reduce(
          (accumulator, sentence) => `${accumulator} ${sentence.content}`,
          ""
        );

        this.sentences = sentences;
        this.isChange = true;
        await updateChapter(this.chapterId, { sentences, content });
        await this.getChapterInfo();
        return;
      }
      this.$notify({
        type: "error",
        message: "Nội dung câu không được bỏ trống",
        offset: 40
      });
    },
    deletePhrases() {
      this.$confirm(
        "Bạn có chắc chắn muốn xóa câu này khỏi đoạn văn không?",
        "Cảnh báo",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy bỏ",
          type: "warning",
          customClass: "book-detail__messagebox"
        }
      )
        .then(async () => {
          this.sentences.splice(this.tempIndex, 1);
          await updateChapter(this.chapterId, { sentences: this.sentences });
          await this.getChapterInfo();

          this.isChange = true;
          this.$message({
            type: "success",
            message: "Cập nhật thông tin chương thành công",
            offset: 100
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "Xóa câu thất bại",
            offset: 100,
            duration: 1500
          });
        });
    },
    handleChangeVolume(value) {
      const audioElement = this.$refs.audioSrc;
      audioElement.volume = parseFloat(value / 100);
    },
    handleChangeOption(option) {
      if (!OPTIONS_TYPE.hasOwnProperty(option) || this.tempIndex === null) {
        this.$message({
          type: "error",
          message: "Lỗi thao tác. Vui lòng thử lại!",
          offset: 100,
          duration: 1500
        });
        return;
      }

      this.innerVisible = true;
      switch (OPTIONS_TYPE[option]) {
        case OPTIONS_TYPE["ADD_BEFORE_PHRASE"]:
          this.titleInnerDialog = "Thêm vào trước";
          this.currentOption = OPTIONS_TYPE["ADD_BEFORE_PHRASE"];
          this.tempSentence = "";
          break;
        case OPTIONS_TYPE["ADD_AFTER_PHRASE"]:
          this.titleInnerDialog = "Thêm vào sau";
          this.currentOption = OPTIONS_TYPE["ADD_AFTER_PHRASE"];
          this.tempSentence = "";
          break;
        case OPTIONS_TYPE["EDIT_PHRASE"]:
          this.titleInnerDialog = "Sửa câu";
          this.currentOption = OPTIONS_TYPE["EDIT_PHRASE"];
          break;
        default:
          this.$notify({
            type: "error",
            message: "Lỗi thao tác. Vui lòng thử lại!",
            offset: 100,
            duration: 1500
          });
          break;
      }
    },
    onClickHideContextMenu() {
      document.addEventListener("click", function(e) {
        if (document.getElementById("context-menu")) {
          document.getElementById("context-menu").classList.remove("active");
        }
      });
    },
    handlePhrases() {
      this.innerVisible = false;
      switch (this.currentOption) {
        case OPTIONS_TYPE["ADD_BEFORE_PHRASE"]:
          this.addBeforePhrases();
          break;
        case OPTIONS_TYPE["ADD_AFTER_PHRASE"]:
          this.addAfterPhrases();
          break;
        case OPTIONS_TYPE["EDIT_PHRASE"]:
          this.editPhrases();
          break;
        default:
          this.$message({
            type: "error",
            message: "Lỗi thao tác. Vui lòng thử lại!",
            offset: 100,
            duration: 1500
          });
          break;
      }
    },
    initPlayer() {
      if (!this.currentChapter) return;

      if (this.sentences.length > 0) {
        var me = this;
        const audioElement = me.$refs.audioSrc;

        // Audio track has ended playing.
        audioElement.addEventListener(
          "ended",
          e => {
            _trackHasEnded();
          },
          false
        );
        //Audio error.
        audioElement.addEventListener(
          "error",
          function(e) {
            switch (e.target.error.code) {
              case e.target.error.MEDIA_ERR_ABORTED:
                alert("You aborted the video playback.");
                break;
              case e.target.error.MEDIA_ERR_NETWORK:
                alert("A network error caused the audio download to fail.");
                break;
              case e.target.error.MEDIA_ERR_DECODE:
                alert(
                  "The audio playback was aborted due to a corruption problem or because the video used features your browser did not support."
                );
                break;
              case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                alert(
                  "The video audio not be loaded, either because the server or network failed or because the format is not supported."
                );
                break;
              default:
                alert("An unknown error occurred.");
                break;
            }
            me.isStartingAudio = false;
          },
          false
        );
        // change volume audio

        var _trackHasEnded = function() {
          let link = null;
          do {
            if (parseInt(me.currentSentence) === me.sentences.length - 1) {
              me.currentSentence = 0;
              _stopTrack();
              return;
            }
            me.currentSentence = parseInt(me.currentSentence) + 1;
            link = me.sentences[me.currentSentence].link;
          } while (!link);

          me.isStartingAudio = false;
          _setTrack();
        };
        var _setTrack = function() {
          const baseUrl = process.env.baseUrl;
          let { file_name } = me.sentences[me.currentSentence]; // get current entry, increment i

          const audioUrl = file_name.replace("public", "").replace(/\\/gi, "/");
          const songURL = baseUrl + audioUrl;
          audioElement.setAttribute("src", songURL);
          audioElement.volume = parseFloat(me.soundVolume / 100);
          audioElement.load();
          me.isStartingAudio = true;
          _playBack();
        };
        var _playBack = function() {
          if (audioElement.paused) {
            audioElement.play();
          } else {
            audioElement.pause();
          }
        };
        var _stopTrack = function() {
          me.isStartingAudio = false;
          audioElement.pause();
          audioElement.currentTime = 0;
        };
        return;
      }

      this.$notify({
        type: "error",
        message: "Lỗi không tìm thấy nội dung của chương này",
        offset: "40"
      });
    },
    handleStartAudio() {
      // start audio
      const baseUrl = process.env.baseUrl;
      let { file_name } = this.sentences[this.currentSentence];
      const { book_id, id } = this.currentChapter;
      while (!file_name) {
        this.currentSentence =
          parseInt(this.currentSentence) === this.sentences.length - 1
            ? 0
            : parseInt(this.currentSentence) + 1;

        file_name = this.sentences[this.currentSentence].file_name;
      }

      this.isStartingAudio = true;
      let audio = this.$refs.audioSrc;
      if (!audio.paused) {
        audio.pause();
        audio.src = "";
        audio.currentTime = 0;
      }

      const link = file_name.replace("public", "").replace(/\\/gi, "/");
      const songURL = baseUrl + link;
      this.audioSrc = songURL;

      audio.src = songURL;
      audio.load();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {}).catch(error => {});
      }
    },
    handleStopAudio() {
      this.isStartingAudio = false;
      try {
        const audio = this.$refs.audioSrc;
        audio.pause();
      } catch (error) {
        console.log(error.message);
      }
    },
    async handleDownloadChapter() {
      const { audio, title } = this.currentChapter;
      this.downloadChapter(audio, title);
    },
    handleChangeChapter(chapterId) {
      this.$router.push(`/statistic-book/${this.bookdId}/${chapterId}`);
    },
    checkTimeHightLight: function() {
      return ({ start, end }) => {
        const time = this.time;
        return time >= start && time < end;
      };
    },
    async getChapterInfo() {
      await getChapter(this.chapterId)
        .then(res => {
          const { result } = res;
          this.currentChapter = result;
          this.sentences = result.sentences;
          this.isChange =
            !result.audio ||
            this.sentences.some(
              sentence => sentence.status !== STATUS_SENTENCE.SUCCESS
            );
        })
        .catch(err => {});
    },
    async getChapterOptions() {
      const options = {
        limit: 100,
        page_num: 1,
        book_id: this.bookdId
      };
      await getChapters(options)
        .then(res => {
          const { status, result } = res;
          if (status === 1) {
            const { data } = result;
            this.chapterOptions = data;
          }
        })
        .catch();
    },
    async requestConvertChapter() {
      try {
        const me = this;
        const sentences = this.sentences
          .filter(sentence => sentence.content.trim().length > 0)
          .map(sentence => {
            const { status } = sentence;
            if (status !== STATUS_SENTENCE.SUCCESS) {
              return { ...sentence, status: STATUS_SENTENCE.WAITING };
            }
            return sentence;
          });
        await updateChapter(this.chapterId, { sentences }).then(async res => {
          await reconvertChapter(this.chapterId).then(res => {
            const { status } = res;
            if (status === 1) {
              me.$notify({
                type: "success",
                message: "reconvert chương thành công",
                offset: 40
              });
            }
          });
          await me.getChapterInfo();
          me.isChange = false;
        });
      } catch (error) {
        me.$notify({
          type: "error",
          message: "reconvert chương thất bại",
          offset: 40
        });
        console.log(error.message);
      }
    },
    getClassByStatus(status) {
      switch (status) {
        case STATUS_SENTENCE.ADD:
          return "text-info";
        case STATUS_SENTENCE.EDIT:
          return "text-warning";
        case STATUS_SENTENCE.SUCCESS:
          return "";
        case STATUS_SENTENCE.WAITING:
          return "text-muted";
        case STATUS_SENTENCE.ERROR:
          return "bg-danger";
        default:
          return "";
      }
    },
    gotoBack() {
      this.$router.push(`/statistic-book/${this.bookdId}`);
    },
    handleNextSentence() {
      if (this.currentSentence < this.sentences.length - 1) {
        this.currentSentence += 1;
      }
    },
    handlePrevSentence() {
      if (this.currentSentence > 0) {
        this.currentSentence -= 1;
      }
    }
  },
  created() {
    const { bookId, chapterId } = this.$route.params;
    this.bookdId = bookId;
    this.chapterId = chapterId;
  },
  async mounted() {
    this.onClickHideContextMenu();
    await this.getChapterInfo();
    this.initPlayer();
    await this.getChapterOptions();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/_chapter_id.scss";
</style>