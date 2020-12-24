<template>
  <div class="analysic-book pt-3">
    <el-breadcrumb separator="-">
      <el-breadcrumb-item :to="{ path: '/' }">Sách nói</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/statistic-book/' }">Thống kê sách</el-breadcrumb-item>
      <el-breadcrumb-item>Thống kê sách chi tiết</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
      <div class="analysic-book__header mt-3">
        <div class="title">
          <strong>THỐNG KÊ SÁCH</strong>
        </div>
        <div class="options">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="đến"
            start-placeholder="Bắt đầu"
            end-placeholder="Kết thúc"
            format="dd/MM/yyyy"
          ></el-date-picker>
          <el-button class="search" @click="searchChapters">Tra cứu</el-button>
        </div>
      </div>
      <div class="book-detail">
        <div class="book-detail__header">
          <div class="title">
            <span>Tên sách:</span>
            <span>
              <strong>{{bookInfo ? bookInfo.title : ""}}</strong>
            </span>
          </div>
          <div class="download">
            <el-tooltip effect="light" content="Tải xuống file zip" placement="bottom-start">
              <strong>
                <a href="#" @click.prevent="handleDownloadBook">Tải xuống toàn bộ</a>
              </strong>
            </el-tooltip>
          </div>
        </div>
        <div class="book-detail__main">
          <el-scrollbar wrap-class="book-detail__scroll">
            <el-table
              v-loading="isLoadingData"
              ref="singleTable"
              :data="chapterBooks"
              highlight-current-row
              style="width: 100%"
              :header-cell-style="{background: '#EAECED'}"
              @row-click="showDetailContentChapter"
            >
              <el-table-column type="index" width="50" align="center"></el-table-column>
              <el-table-column property="title" label="Tên phần/chương" width="220" align="left"></el-table-column>
              <el-table-column label="Ngày gửi yêu cầu" align="center">
                <template slot-scope="scope">{{ formatTimeRequest(scope.row.created_at) }}</template>
              </el-table-column>
              <el-table-column label="Ngày trả file" align="center" prop="time_refund_file">
                <template
                  slot-scope="scope"
                >{{ scope.row.time_refund_file ? formatTimeRequest(scope.row.time_refund_file) : "-" }}</template>
              </el-table-column>
              <el-table-column label="Độ dài" align="center">
                <template
                  slot-scope="scope"
                >{{scope.row.duration ? toHHMMSS(scope.row.duration) : "-"}}</template>
              </el-table-column>
              <el-table-column label="Trạng thái" align="center">
                <template slot-scope="scope">
                  <span
                    class="text-center"
                    v-html="scope.row.detail ? convertStatusDetail(scope.row.detail) : convertStatusBook(scope.row.status)"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column label="Thao tác" align="center">
                <template slot-scope="scope">
                  <el-tooltip effect="light" content="Tải xuống" placement="bottom-start">
                    <el-button
                      icon="el-icon-download"
                      circle
                      @click.stop="downloadChapter(scope.row.audio, scope.row.title)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip effect="light" content="Chi tiết" placement="bottom-start">
                    <el-button
                      icon="el-icon-info"
                      circle
                      @click.stop="showDetailContentChapter(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip effect="light" content="Sửa" placement="bottom-start">
                    <el-button
                      icon="el-icon-edit"
                      circle
                      @click.stop="showDialogEditChapter(scope.row)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip effect="light" content="Xóa" placement="bottom-start">
                    <el-button
                      icon="el-icon-delete"
                      circle
                      @click.stop="showDialogDeleteChapter(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </template>

    <!-- dialog edit -->
    <el-dialog title="Sửa tên chương" :visible.sync="dialogEditVisiable" width="30%" center>
      <el-form v-model="formEditChapter" label-width="120px">
        <el-input v-model="formEditChapter.title" placeholder="Tên chương"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisiable = false">Hủy</el-button>
        <el-button type="primary" @click="handleEditChapter">Chỉnh sửa</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import phrases from "@/data";
import moment from "moment";
import { mapGetters } from "vuex";
import { getBookInfo } from "@/api/book";
import { getChapters, updateChapter, deleteChapter } from "@/api/chapter";
import { mixins } from "@/mixins/status";
import { downloadMixins } from "@/mixins/chapter";

export default {
  name: "BookDetail",
  data() {
    return {
      chapterBooks: [],
      bookInfo: null,
      limit: 10,
      pageCurrent: 1,
      isLoadingData: true,
      dateRange: [moment().subtract(1, 'month'), moment().endOf("month")],
      dialogEditVisiable: false,
      formEditChapter: {
        id: null,
        title: ""
      },
      timer: null
    };
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);

    next();
  },
  mixins: [mixins, downloadMixins],
  methods: {
    getClassStatus(status) {
      status = parseInt(status);
      switch (status) {
        case 0:
          return "";
          break;
        case 1:
          return "text-success";
          break;
        case 2:
          return "text-warning";
          break;
        default:
          return "";
          break;
      }
    },
    getTextStatus(status) {
      status = parseInt(status);
      switch (status) {
        case 0:
          return "Có lỗi";
          break;
        case 1:
          return "Thành công";
          break;
        case 2:
          return "Đang chờ";
          break;
        default:
          return "";
          break;
      }
    },
    convertTimeToMilliseconds(time) {
      if (!/^\d{1,2}\:\d{1,2}\:\d{1,2}.\d{1,3}$/.test(time)) return null;

      const date = time.split(".")[0].split(":");

      var millisecond = parseInt(time.split(".")[1]);
      const hours = parseInt(date[0]);
      const minutes = parseInt(date[1]);
      const seconds = parseInt(date[2]);

      millisecond += seconds * 1000 + minutes * 60000 + hours * 3600000;

      return millisecond;
    },
    searchChapters() {
      this.isLoadingData = true;
      this.getChapterList();
    },
    async getBookInfo() {
      try {
        const { bookId } = this.$route.params;
        getBookInfo(bookId).then(res => {
          const { status, result } = res;
          if (status === 1) {
            this.bookInfo = result;
            return;
          }
          this.bookInfo = null;
        });
      } catch (error) {
        console.log(error.message);
        this.bookInfo = null;
      }
    },
    async getChapterList() {
      try {
        // this.isLoadingData = true;
        const { bookId } = this.$route.params;
        let start = "";
        let end = "";

        if (this.dateRange) {
          start = new Date(this.dateRange[0]).valueOf();
          end = new Date(this.dateRange[1]).valueOf();
        }
        const options = {
          limit: this.limit,
          book_id: bookId,
          page_num: this.pageCurrent,
          start_time: start,
          end_time: end
        };
        const { status, result } = await getChapters(options);

        if (status === 1) {
          const {
            pager: { limit, total_count, current_page_num },
            data
          } = result;

          this.pageCurrent = current_page_num;
          this.total = total_count;
          this.chapterBooks = data;
          this.isLoadingData = false;

          if (
            this.chapterBooks.every(
              chapter => chapter.detail && !chapter.detail.waiting
            )
          ) {
            clearInterval(this.timer);
          }
        }
      } catch (error) {}
    },
    formatTimeRequest(time) {
      const date = new Date(time);
      return moment(date.valueOf()).format("h:mm:ss - DD/MM/YYYY");
    },
    toHHMMSS(seconds) {
      if (seconds) {
        return moment()
          .startOf("day")
          .seconds(Math.round(seconds))
          .format("HH:mm:ss");
      }
      return "-";
    },
    showDetailContentChapter(chapter) {
      const { sentences } = chapter;
      if (chapter && sentences > 0) {
        const { id } = this.bookInfo;
        this.$router.push(`/statistic-book/${id}/${chapter.id}`);
        return;
      }

      this.$notify({
        type: "error",
        message: "Nội dung chương chưa được convert",
        offset: 35
      });
    },
    showDialogEditChapter(chapter) {
      const { id, title } = chapter;

      this.formEditChapter.id = id;
      this.formEditChapter.title = title;
      this.dialogEditVisiable = true;
    },
    showDialogDeleteChapter(chapterId) {
      const me = this;
      this.$confirm("Bạn có chắc chắn muốn xóa chương này không?", "Cảnh báo", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy bỏ",
        type: "warning",
        customClass: "book-detail__messagebox"
      })
        .then(async () => {
          const { status, message } = await deleteChapter(chapterId);
          if (status === 1) {
            me.$notify({
              type: "success",
              message: "Xóa thành công",
              offset: 35
            });
            me.getBooks();
          } else {
            me.$notify({
              type: "error",
              message,
              offset: 35
            });
          }
        })
        .catch();
    },
    async handleEditChapter() {
      const { id, title } = this.formEditChapter;
      try {
        const { status } = await updateChapter(id, {
          title
        });
        if (status === 1) {
          this.$notify({
            type: "success",
            message: "Sửa thông tin chương thành công",
            offset: 40
          });

          this.getChapterList();
          this.dialogEditVisiable = false;
          return;
        }
      } catch (error) {
        console.log(error.message);
        this.$notify({
          type: "error",
          message: "Sửa thông tin chương không thành công",
          offset: 40
        });
      }
    },
    handleDownloadBook() {
      const chapters = this.chapterBooks
        .filter(chapter => chapter.audio)
        .map(({ audio, title }) => {
          return {
            audio,
            title
          };
        });
      this.downloadZip({ bookName: this.bookInfo.title, chapters });
    }
  },
  computed: {
    ...mapGetters(["userId"])
  },
  async mounted() {
    this.isLoadingData = true;
    await this.getBookInfo();
    await this.getChapterList();

    const me = this;
    if (
      this.chapterBooks.some(
        chapter => chapter.detail && chapter.detail.waiting
      )
    ) {
      this.timer = setInterval(() => {
        me.getChapterList();
      }, 10000);
    } else {
      clearInterval(this.timer);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/_book_id.scss";
@import "@/assets/styles/analysic-book/index.scss";
</style>

