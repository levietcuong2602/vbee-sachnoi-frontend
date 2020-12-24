<template>
  <div>
    <div class="step2">
      <div class="row mt-3">
        <div class="col-12 options">
          <span
            class="btn-option"
            @click="handleCheckIsExtend"
            @contextmenu.prevent="showContextMenu"
          >{{ isExtend ? 'Thu gọn' : 'Mở rộng' }}</span>
        </div>
      </div>
      <div class="row mt-1">
        <div :class="[isExtend ? 'col-md-6' : '', 'col-sm-12', 'box-left']">
          <div class="box-main">
            <!-- <div class="box-main__header">
              <el-button @click="addTagChapter">break_tag</el-button>
            </div>-->
            <div class="preview-book">
              <el-scrollbar wrap-class="preview-book__scroll">
                <div class="el-textarea content">
                  <textarea
                    ref="segmentPage"
                    v-model="segmentPage"
                    class="el-textarea__inner"
                    @blur="handleBlurSegmentPage"
                    @contextmenu.prevent="showContextMenu"
                  ></textarea>
                </div>
              </el-scrollbar>
            </div>
            <div class="preview-pager">
              <el-pagination
                :page-count="totalPage"
                :pager-count="5"
                layout="prev, pager, next, jumper"
                :current-page="currentPage"
                @current-change="handleChangePage"
              ></el-pagination>
            </div>
            <!-- <div class="preview-pager">Trang 24/29</div> -->
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
          <div class="step3 preview-option">
            <div class="box-introduct" v-if="!detachFile">
              <div class="box-introduct__header">
                <div class="title-introduct text-center w-100">
                  <h5 class="title text-center m-0">HƯỚNG DẪN TÁCH CHƯƠNG</h5>
                  <i>(không bắt buộc)</i>
                </div>
              </div>
              <div class="box-introduct__main">
                <p>
                  - Muốn tách file audio thành từng phần/chương, hệ thống sẽ căn cứ vào việc chủ động gắn thẻ vào trước từ đầu tiên của trang bắt đầu và sau từ cuối cùng của trang kết thúc từng phần/chương, với mã thẻ:
                  <br />
                  <strong>&lt;C[số thứ tự của chương]></strong>
                  <!-- hoặc <strong>&lt;P[số thứ tự của phần]></strong> -->
                </p>
                <br />
                <p>
                  Ví dụ: Phần/chương 1 của bạn từ trang 1 tới trang 20, bạn gắn thẻ
                  <strong>&lt;C1></strong>
                  <!-- hoặc <strong>&lt;P1></strong>  -->
                  vào trước từ bắt đầu của trang 1 và sau từ cuối của trang 20. Tương tự với các phần/chương sau.
                </p>
                <br />
                <p>- Click “Bắt đầu tách phần/chương” để đặt tên cho các phân đoạn đã tách. Click “Bỏ qua” nếu không có nhu cầu tách file.</p>
                <br />
                <p>- Vui lòng xem clip hướng dẫn dưới đây để hiểu rõ hơn.</p>
                <br />
              </div>
              <div class="box-introduct__footer">
                <div class="embed-responsive embed-responsive-16by9">
                  <video width="450" controls src="https://youtu.be/YC6NCr6_HbA"></video>
                  <!-- <iframe class="embed-responsive-item" src="https://youtu.be/YC6NCr6_HbA" allowfullscreen></iframe> -->
                </div>
                <!-- <div class="text-center">
                  <a href="#" @click.prevent="isIntroduction = false">Bắt đầu tách phân/chương</a>
                </div>-->
              </div>
            </div>
            <div class="box-step3" v-else>
              <div class="box-step3__header">
                <div class="title-step3">
                  <h5>TÁCH FILE AUDIO THÀNH TỪNG PHẦN</h5>
                  <i>(không bắt buộc)</i>
                </div>
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
              <div class="box-step3__main">
                <el-scrollbar wrap-class="preview-book__scroll">
                  <el-table
                    :data="chapters"
                    height="600"
                    style="width: 100%;"
                    @row-click="gotoPageStartChapter"
                  >
                    <el-table-column type="index" label="STT" width="50" align="center"></el-table-column>
                    <el-table-column
                      prop="title"
                      label="Tên phần/chương"
                      width="200"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-input
                          v-model="scope.row.title"
                          :value="'Chương ' + scope.row + scope.row.title"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="startPage"
                      label="Trang bắt đầu"
                      width="120"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="endPage"
                      label="Trang kết thúc"
                      width="120"
                      align="center"
                    ></el-table-column>
                    <el-table-column label="Hành động" width="120" align="center" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          icon="el-icon-delete"
                          @click="handleDeleteChapter(scope.$index)"
                        >Xóa</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-scrollbar>
              </div>
              <div class="box-step3__footer">
                <!-- <el-pagination
                  v-show="chapters.length > pageSize"
                  :page-size="pageSize"
                  layout="prev, pager, next"
                  :total="chapters.length"
                ></el-pagination>-->
                <!-- <a href="#" class="btn-save">Lưu thay đổi</a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 pb-5">
      <div class="col text-right">
        <el-button @click="gotoBackStep()">Quay lại</el-button>
        <!-- <el-button>Bỏ qua</el-button> -->
        <el-button type="warning" @click="gotoNextStep()">Tiếp tục</el-button>
      </div>
    </div>

    <!-- dialog 1 -->
    <el-dialog title="Thông báo" :visible.sync="dialogNotifyVisible" width="40%" center>
      <h5>
        Bạn có chưa gắn thẻ tách chương.
        <br />Bạn muốn tiếp tục tách chương?
      </h5>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogNotifyVisible = false">Bỏ qua</el-button>
        <el-button type="primary" @click="handleDetachFile">Tiếp tục</el-button>
      </span>
    </el-dialog>

    <!-- dialog 2 -->
    <el-dialog title="Thông báo" :visible.sync="dialogNotifyBack" width="40%" center>
      <span>
        Quay lại bước trước đó có thể mất thông tin tách chương của bạn
        <br />Bạn muốn tiếp tục?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogNotifyBack = false">Bỏ qua</el-button>
        <el-button type="primary" @click="handleGotoBack">Tiếp tục</el-button>
      </span>
    </el-dialog>
    <!-- context menu -->
    <ul id="context-menu">
      <li class="context-menu-item" @click="addTagChapter">
        <img
          class="context-menu-icon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NS40IDQ1LjQiPjxwYXRoIGZpbGw9IiNmOTY5MGUiIGQ9Ik00MS4zIDE4LjZIMjYuOFY0YzAtMi0xLjgtNC00LTQtMi40IDAtNC4yIDItNC4yIDR2MTQuNkg0Yy0yIDAtNCAxLjgtNCA0IDAgMS4yLjUgMi4zIDEuMiAzIC44LjggMS44IDEuMyAzIDEuM2gxNC40djE0LjNjMCAxIC40IDIgMS4yIDMgLjcuNiAxLjggMSAzIDEgMi4yIDAgNC0xLjcgNC00VjI3aDE0LjVjMi4zIDAgNC0yIDQtNC4zcy0xLjgtNC00LTR6Ii8+PC9zdmc+"
          width="12"
        />
        Ngắt chương
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { createBook, updateBook, deleteBook } from "@/api/book";
import { createChapters } from "@/api/chapter";
import { getPageSentences, getSentences } from "@/utils/convert";
import { STATUS_BOOK, STATUS_CHAPTER, STATUS_SENTENCE } from "@/constant";

export default {
  name: "Step2",
  data() {
    return {
      isExtend: true,
      segmentPage: "",
      bufferPages: [],
      totalPage: 0,
      currentPage: 1,
      limitPage: 3000,
      detachFile: false,
      chapters: [],
      dialogNotifyVisible: false,
      dialogNotifyBack: false,
      isSaveBook: false,
      isSaveChapter: false,
      pageSize: 10,
      isChange: true,
      // textarea
      isFocus: false,
      // context-menu
      contextMenuWidth: null,
      contextMenuHeight: null
    };
  },
  computed: {
    ...mapGetters(["contentBook", "book", "userId", "sidebar"])
  },
  methods: {
    gotoBackStep() {
      const { chapters, pages } = this.book;
      if (chapters.length <= 0 || pages.length <= 0) {
        this.dialogNotifyBack = true;
        return;
      }
      this.handleGotoBack();
    },
    handleGotoBack() {
      this.$emit("handleNextStep", 1);
    },
    gotoNextStep() {
      // check nội dung chương
      const { content } = this.book;
      if (!content || content.length <= 0) {
        this.$notify({
          type: "error",
          message: "Không tìm thấy nội dung sách",
          offset: 35
        });
        return;
      }
      // check đã gắn thẻ tách chương
      if (!this.detachFile) {
        this.dialogNotifyVisible = true;
        return;
      }

      this.handleDetachFile();
    },
    gotoPageStartChapter(row) {
      const { startPage } = row;
      this.handleChangePage(startPage);
    },
    getPageSentences,
    getSentences,
    updateBreakChapter() {
      // lấy ra chapter cần tách chương
      const indexPage = this.currentPage;
      const indexChapter = this.chapters.findIndex(
        ({ startPage, endPage }) =>
          startPage <= indexPage && indexPage <= endPage
      );

      const { startPage, endPage } = this.chapters[indexChapter];
      // lấy ra nội dung content chapter update theo buffer
      const content = this.bufferPages
        .filter((page, index) => {
          if (index >= startPage - 1 && index <= endPage - 1) return true;
          return false;
        })
        .join(" ");

      let indexTemp = indexChapter;
      let chapters = content.split("<break_tag>");
      let pageStart = startPage;
      let pageEnd = startPage;
      const updateChapters = chapters.map(chapter => {
        const pages = this.getPageSentences(chapter, this.limitPage);
        pageStart = pageEnd;
        pageEnd = pageStart + pages.length;

        return {
          content: chapter,
          startPage: pageStart,
          endPage: pageEnd - 1,
          title: `Chương ${++indexTemp}: `
        };
      });

      // update trang của chương phía sau
      const increatePage = pageEnd - 1 - endPage;
      this.chapters = this.chapters.map((chapter, index) => {
        if (index > indexChapter)
          return {
            ...chapter,
            startPage: chapter.startPage + increatePage,
            endPage: chapter.endPage + increatePage
          };
        return chapter;
      });
      // cập nhật các chương vừa tách
      this.chapters.splice(indexChapter, 1, ...updateChapters);

      // cập nhật buffers pages
      const bufferPages = [];
      for (const { content } of this.chapters) {
        const pages = this.getPageSentences(content, this.limitPage);
        bufferPages.push(...pages);
      }

      this.bufferPages = bufferPages;
      this.totalPage = bufferPages.length;
      this.segmentPage = bufferPages[this.currentPage - 1];
    },
    loadBufferPages() {
      const { pages, chapters } = this.book;
      // Trường hợp 1: Đã tách chương nhưng chưa tạo sách nói.
      if (pages.length > 0) {
        this.bufferPages = pages;
        this.currentPage = 1;
        this.segmentPage = this.bufferPages[this.currentPage - 1];
        this.totalPage = this.bufferPages.length;
        this.chapters = chapters;
        return;
      }

      // Trường hợp 2: Sửa sách từ trong thống kê sách
      if (pages.length <= 0 && chapters.length > 0) {
        let pageEnd = 1,
          pageStart = 1,
          indexTemp = 0;
        this.chapters = chapters.map(chapter => {
          const pagesTmp = this.getPageSentences(
            chapter.content,
            this.limitPage
          );
          this.bufferPages.push(...pagesTmp);
          pageStart = pageEnd;
          pageEnd = pageStart + pagesTmp.length;

          return {
            content: chapter.content,
            startPage: pageStart,
            endPage: pageEnd - 1,
            title: `Chương ${++indexTemp}: `
          };
        });

        this.$store.dispatch("book/updatePages", this.bufferPages);
        this.segmentPage = this.bufferPages[this.currentPage - 1];
        this.totalPage = this.bufferPages.length;
        return;
      }

      // Trường hợp 3: còn lại
      this.bufferPages = this.getPageSentences(
        this.contentBook,
        this.limitPage
      );

      this.segmentPage = this.bufferPages[this.currentPage - 1];
      this.totalPage = this.bufferPages.length;
      this.chapters = [
        {
          content: this.contentBook,
          startPage: 1,
          endPage: this.totalPage,
          title: "Chương 1:"
        }
      ];
    },
    handleDeleteChapter(indexChapter) {
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
        .then(() => {
          const { length } = this.chapters;
          if (indexChapter < 0 || indexChapter >= length) return;
          if (length <= 1) return;

          if (indexChapter === 0) {
            indexChapter = 1;
          }
          const currentChapter = this.chapters[indexChapter];
          const beforeChapter = this.chapters[indexChapter - 1];
          const content = beforeChapter.content + "\n" + currentChapter.content;
          const pages = this.getPageSentences(content, this.limitPage);
          const startPage = beforeChapter.startPage;
          const endPage = startPage + pages.length - 1;

          delete beforeChapter.id;
          const mergeChapter = {
            ...beforeChapter,
            startPage,
            endPage,
            content,
            title: beforeChapter.title
          };

          const increatePage = endPage - currentChapter.endPage;
          this.chapters = this.chapters.map((chapter, index) => {
            if (index > indexChapter)
              return {
                ...chapter,
                startPage: chapter.startPage + increatePage,
                endPage: chapter.endPage + increatePage
              };
            return chapter;
          });
          this.chapters.splice(indexChapter - 1, 2, mergeChapter);

          // cập nhật buffers pages
          const bufferPages = [];
          for (const { content } of this.chapters) {
            const pages = this.getPageSentences(content, this.limitPage);
            bufferPages.push(...pages);
          }

          this.bufferPages = bufferPages;
          this.totalPage = bufferPages.length;
          this.segmentPage = bufferPages[this.currentPage - 1];
        })
        .catch();
    },
    handleBlurSegmentPage() {
      this.isFocus = false;
      // this.bufferPages.splice(this.currentPage - 1, 1, this.segmentPage);
      this.bufferPages = this.bufferPages.map((page, index) => {
        if (index === this.currentPage - 1) {
          return this.segmentPage;
        }
        return page;
      });
    },
    updateOriginBook() {
      const content = this.bufferPages.join(" ");
      this.$store.dispatch("book/updateContentBook", content);
    },
    handleCheckIsExtend() {
      this.isExtend = !this.isExtend;
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.segmentPage = this.bufferPages[page - 1];
    },
    async handleDetachFile() {
      this.dialogNotifyVisible = false;
      const { content } = this.book;
      if (!content || content.length <= 0) {
        this.$notify({
          type: "error",
          message: "Không tìm thấy nội dung sách",
          offset: 35
        });
        return;
      }
      // create book and chapter
      await this.saveBookInfo();
      await this.saveChaptersInfo();

      if (this.isSaveBook && this.isSaveChapter) {
        this.$emit("handleNextStep", 3);
      }
    },
    async saveBookInfo() {
      try {
        const { id, name, publicYear, author, file } = this.book;
        if (id) {
          // tạo rồi thì xóa đi tạo lại
          await deleteBook(id);
        }

        const userId = this.userId;
        const { status, result } = await createBook({
          userId,
          title: name,
          author,
          publicYear,
          status: STATUS_BOOK.INIT,
          numberChapter: this.chapters.length,
          file: {
            name: file.name,
            status: file.status
          }
        });
        if (status === 1) {
          const { id } = result;
          this.$store.dispatch("book/updateIdBook", id);
          this.isSaveBook = true;
          return;
        }
        this.isSaveBook = false;
      } catch (error) {
        console.log(error.message);
        this.$notify.error({
          title: "Lỗi",
          message: "Lưu thông tin sách thất bại",
          offset: 40
        });
        this.isSaveBook = false;
      }
    },
    async saveChaptersInfo() {
      if (!this.isSaveBook) return;

      const userId = this.userId;
      this.chapters = this.chapters.map(chapter => {
        let sentences = this.getSentences(chapter.content);
        sentences = sentences
          .filter(sentence => sentence.trim())
          .map(sentence => {
            return {
              content: sentence,
              fileName: null,
              link: null,
              status: STATUS_SENTENCE.ADD
            };
          });
        return {
          ...chapter,
          bookId: this.book.id,
          userId,
          title: chapter.title,
          content: chapter.content,
          status: STATUS_CHAPTER.INIT,
          sentences
        };
      });

      try {
        const { status, result } = await createChapters({
          chapters: this.chapters
        });
        if (status === 1) {
          if (result.length === this.chapters.length) {
            this.chapters = this.chapters.map((chapter, index) => {
              return {
                ...chapter,
                id: result[index]
              };
            });

            this.$store.dispatch("book/updateChapterBook", this.chapters);
            this.$store.dispatch("book/updatePages", this.bufferPages);
            this.isSaveChapter = true;
            return;
          }

          this.$notify({
            type: "error",
            title: "Lỗi",
            message: "Lưu thông tin chương thất bại",
            offset: 40
          });
          return;
        }
      } catch (error) {
        console.log(error.message);
        this.$notify({
          type: "error",
          title: "Lỗi",
          message: "Lưu thông tin chương thất bại",
          offset: 40
        });
        this.isSaveChapter = false;
      }
    },
    addTagChapter() {
      const { content } = this.book;
      if (!content || content.length <= 0) {
        this.$notify({
          type: "error",
          message: "Nội dung chương không tồn tại.",
          offset: 35
        });
        return;
      }

      const tArea = this.$refs.segmentPage;
      if (!tArea) {
        this.$notify({
          type: "error",
          message: "Có lỗi xảy ra",
          offset: 35
        });
        return;
      }
      const startPos = tArea.selectionStart;
      const endPos = tArea.selectionEnd;

      if (startPos) {
        let tempStr = tArea.value;
        tempStr =
          tempStr.substring(0, startPos) +
          "<break_tag>" +
          tempStr.substring(endPos, tempStr.length);

        tArea.textContent = tempStr;
        this.bufferPages[this.currentPage - 1] = tempStr;
        this.updateBreakChapter();
        this.detachFile = true;

        return;
      }
      this.$notify({
        type: "error",
        message: "Không thể gắn thẻ tách chương",
        offset: 35
      });
    },
    onClickHideContextMenu() {
      document.addEventListener("click", function(e) {
        if (document.getElementById("context-menu")) {
          document.getElementById("context-menu").classList.remove("active");
        }
      });
    },
    showContextMenu(vm) {
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
    }
  },
  mounted() {
    this.onClickHideContextMenu();
    this.loadBufferPages();
    // check xem đã tồn tại chương chưa
    const { chapters, pages } = this.book;
    if (chapters.length > 0) {
      this.detachFile = true;
      this.isSaveBook = true;
      this.isSaveChapter = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./styles/_step2.scss";
@import "./styles/_step3.scss";
@import "@/assets/styles/context-menu.scss";
</style>