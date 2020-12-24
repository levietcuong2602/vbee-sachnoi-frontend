<template>
  <div>
    <div class="step2">
      <div class="row mt-3">
        <div class="col-12 options">
          <span
            class="btn-option"
            @click="handleCheckIsExtend"
          >{{ isExtend ? 'Thu gọn' : 'Mở rộng' }}</span>
        </div>
      </div>
      <div class="row mt-1">
        <div :class="[isExtend ? 'col-md-6' : '', 'col-sm-12', 'box-left']">
          <div class="box-main">
            <div class="preview-book">
              <el-scrollbar wrap-class="preview-book__scroll">
                <el-input class="content" type="textarea" :value="segmentPage"></el-input>
              </el-scrollbar>
            </div>
            <div class="preview-pager">
              <el-pagination
                layout="prev, pager, next"
                :page-count="bufferPages.length"
                :current-page="currentPage"
                @current-change="handleChangePage"
              ></el-pagination>
            </div>
          </div>
          <div class="no-extend" v-if="!isExtend">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 16V18H11V16H13ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 11.2829 15.21 11.9733 14.4408 12.6455C13.711 13.2833 13 13.9046 13 15H11C11 13.1787 11.9421 12.4566 12.7704 11.8217C13.4202 11.3236 14 10.8792 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8Z"
                fill="black"
                fill-opacity="0.54"
              />
            </svg>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 box-right" v-if="isExtend">
          <div class="preview-option">
            <div class="box-header">
              <span class="title">Kiểm tra cách đọc</span>
              <div class="search">
                <el-input placeholder="Tìm kiếm từ" v-model="wordSearch"></el-input>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 16V18H11V16H13ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 11.2829 15.21 11.9733 14.4408 12.6455C13.711 13.2833 13 13.9046 13 15H11C11 13.1787 11.9421 12.4566 12.7704 11.8217C13.4202 11.3236 14 10.8792 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8Z"
                    fill="black"
                    fill-opacity="0.54"
                  />
                </svg>
              </div>
            </div>
            <div class="box-main">
              <el-scrollbar wrap-class="preview-book__scroll">
                <el-table :data="tableWord" height="500" style="width: 100%">
                  <el-table-column prop="word" label="Từ" width="70"></el-table-column>
                  <el-table-column prop="pronOld" label="Cách đọc cũ" width="100"></el-table-column>
                  <el-table-column label="Cách đọc chuẩn" prop="pronRegular" width="120">
                    <template slot-scope="scope">
                      <el-input
                        placeholder="Cách đọc chuẩn"
                        v-model="scope.row.pronRegular"
                        @input="handleCheckChange"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="Nghe thử" width="90" align="center">
                    <i v-if="true" class="el-icon-video-play"></i>
                    <i v-else class="el-icon-video-pause"></i>
                  </el-table-column>
                  <el-table-column label width="100" align="center">
                    <i class="el-icon-arrow-left"></i>
                    <span>20/40</span>
                    <i class="el-icon-arrow-right"></i>
                  </el-table-column>
                  <el-table-column label="Sửa tất cả" align="center">
                    <el-checkbox></el-checkbox>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
            <div class="box-footer">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
              <a href="#" class="btn-save" @click.prevent="onSaveChange">Lưu thay đổi</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 pb-5">
      <div class="col text-right">
        <el-button @click="handleSkip">Quay lại</el-button>
        <el-button type="warning" @click="gotoNextStep(4)">Tiếp tục</el-button>
      </div>
    </div>

    <!-- dialog -->
    <el-dialog :visible.sync="dialogNextVisible" width="40%" center>
      <h5>Đồng ý lưu các thay đổi về chỉnh sửa cách đọc?</h5>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">Xác nhận</el-button>
        <el-button type="danger" @click="dialogNextVisible = false">Bỏ qua</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogSkipVisible" width="40%" center>
      <h5>Nếu không tiếp tục chuyển cuốn sách này thành audio, bạn sẽ bị trừ tiền bằng 30% chi phí tổng số trang sách của cuốn này.</h5>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSkipVisible = false">Chuyển đổi tiếp</el-button>
        <el-button type="danger" @click="gotoBackStep">Vẫn quay lại</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getPageSentences } from "@/utils/convert";
export default {
  name: "Step3",
  computed: { ...mapGetters(["book"]) },
  data() {
    return {
      isExtend: true,
      wordSearch: "",
      tableWord: [
        {
          word: "Trump",
          pronOld: "trum",
          pronRegular: "trăm"
        }
      ],
      segmentPage: "",
      bufferPages: [],
      limitPage: 3000,
      currentPage: 1,
      dialogNextVisible: false,
      dialogSkipVisible: false,
      isCheckChange: false
    };
  },
  methods: {
    handleCheckIsExtend() {
      this.isExtend = !this.isExtend;
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.segmentPage = this.bufferPages[page - 1];
    },
    handleSkip() {
      this.dialogSkipVisible = true;
    },
    handleCheckChange() {
      console.log("check change");
      this.isCheckChange = true;
    },
    getPageSentences,
    gotoNextStep(step) {
      if (this.isCheckChange) {
        this.dialogNextVisible = true;
        return;
      }
      this.$emit("handleNextStep", step);
    },
    gotoBackStep() {
      this.$emit("handleNextStep", 2);
    },
    loadBufferPages() {
      const { chapters } = this.book;
      console.log("chapters: ", chapters);
      const pages = [];
      chapters.forEach(chapter => {
        const { content, title } = chapter;
        const page = this.getPageSentences(
          title + "\n" + content,
          this.limitPage
        );
        pages.push(...page);
      });

      this.bufferPages = pages;
      this.segmentPage = this.bufferPages[0];
      console.log("buffer-pages", pages);
    },
    onSaveChange() {}
  },
  mounted() {
    this.loadBufferPages();
  }
};
</script>
<style lang="scss" scoped>
@import "./styles/_step2.scss";
</style>