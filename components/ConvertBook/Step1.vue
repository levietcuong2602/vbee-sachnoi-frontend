<template>
  <div>
    <div class="step1">
      <el-form
        class="row mt-5"
        label-position="top"
        label-width="100px"
        :model="bookInfo"
        :rules="rules"
        status-icon
        ref="ruleForm"
      >
        <el-form-item label="Tên sách" class="col-md-4 col-sm-4 col-6" prop="name">
          <el-input v-model="bookInfo.name" placeholder="Nhập tên sách" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tác giả" class="col-md-4 col-sm-4 col-6" prop="author">
          <el-input v-model="bookInfo.author" placeholder="Nhập tên tác giả"></el-input>
        </el-form-item>
        <el-form-item label="Năm xuất bản" class="col-md-4 col-sm-4 col-6">
          <el-date-picker v-model="yearTime" type="year" placeholder="Năm xuất bản"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="row mt-3">
        <el-upload
          class="col-12"
          drag
          :action="domain + '/upload'"
          :file-list="fileBooks"
          :on-change="onChangeUpload"
          :on-success="onUploadSuccess"
          :on-remove="onRemoveFile"
          accept=".docx, .txt"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Thả file sách ở đây (.docx, .txt)
            <strong>Nhấn vào đây</strong> để tải lên
          </div>
        </el-upload>
      </div>
      <div class="row mt-5">
        <div class="col-12 text-center note-descript">
          <h5>Bạn chỉ có file .PDF</h5>
          <p>Chuyển đổi PDF sang Word ở một số link sau đây:</p>
          <span>
            <a
              href="https://smallpdf.com/vi/pdf-to-word"
              target="_blank"
              rel="noopener noreferrer"
            >https://smallpdf.com/vi/pdf-to-word</a>
          </span>
          <br />
          <span>
            <a
              href="https://www.cleverpdf.com/vi/pdf-to-word"
              target="_blank"
              rel="noopener noreferrer"
            >https://www.cleverpdf.com/vi/pdf-to-word</a>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="text-danger col-12">
        <small>*Lưu ý:</small>
        <ul>
          <li>
            <small>Kiểm tra nội dung sách của bạn trước khi tải lên hệ thống.</small>
          </li>
          <li>
            <small>Nếu vi phạm các vấn đề liên quan đến bản quyền bạn hoàn toàn chịu trách nhiệm.</small>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mt-5 pb-5">
      <div class="col text-right">
        <el-button type="warning" @click="gotoNextStep(2)">Tiếp tục</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Step1",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập tên sách"));
      }
      callback();
    };
    return {
      bookInfo: {
        name: "",
        author: "",
        publicYear: ""
      },
      yearTime: "",
      fileBooks: [],
      errors: "",
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      errors: null
    };
  },
  computed: {
    ...mapGetters(["contentBook", "book", "domain"])
  },
  watch: {
    yearTime: function(time) {
      const date = new Date(time);
      this.bookInfo.publicYear = date.getFullYear();
    }
  },
  methods: {
    onChangeUpload(file, fileList) {
      this.fileBooks = [file];
    },
    onUploadSuccess(res, file) {
      const { status, content } = res;
      if (status === 1) {
        const { name } = file;

        this.$store.dispatch("book/updateContentBook", content);
        this.$notify({
          title: "Thành công",
          message: `upload file ${name} is successfull`,
          type: "success",
          offset: 100
        });
      } else {
        const { message } = res;

        this.fileBooks = [];
        this.$store.dispatch("book/updateContentBook", "");
        this.$notify({
          title: "Lỗi",
          message,
          type: "error",
          offset: 100
        });
      }
    },
    onRemoveFile(file, fileList) {
      this.fileBooks = [];
      this.$store.dispatch("book/updateContentBook", "");
    },
    gotoNextStep(step) {
      this.$refs["ruleForm"].validate(valid => {
        if (!valid) {
          this.errors = "Bạn cần nhập trường tên sách!";
          return false;
        }
        this.errors = null;
        return true;
      });
      if (this.errors) {
        this.$notify({
          title: "Lỗi",
          message: this.errors,
          type: "error",
          offset: 50
        });
        return;
      }

      this.checkEmpty();

      if (this.errors) {
        this.$notify({
          title: "error",
          message: this.errors,
          type: "error",
          offset: 100
        });
        return;
      }
      this.$store.dispatch("book/updateInfoBook", {
        ...this.book,
        ...this.bookInfo,
        file: this.fileBooks[0]
      });
      this.$emit("handleNextStep", step);
    },
    checkEmpty() {
      const {
        bookInfo: { name }
      } = this;
      if (!name) {
        this.errors = "Trường tên sách không được bỏ trống";
        return;
      }

      const {
        fileBooks: { length }
      } = this;
      if (length <= 0) {
        this.errors = "Bạn cần tải file sách lên";
        return;
      }

      const { contentBook } = this;
      if (!contentBook) {
        this.errors = "Nội dung sách của bạn không tồn tại!";
        return;
      }

      this.errors = null;
    }
  },
  mounted() {
    if (this.book) {
      const { name, author, publicYear, file } = this.book;
      if (file) this.fileBooks = [file];
      this.bookInfo = { name, author, publicYear };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./styles/_step1.scss";
</style>