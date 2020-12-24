<template>
  <div class="analysic-book pt-3">
    <el-breadcrumb separator="-">
      <el-breadcrumb-item :to="{ path: '/' }">Sách nói</el-breadcrumb-item>
      <el-breadcrumb-item>Thống kê sách</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="analysic-book__header mt-3">
      <div class="title">
        <strong>THỐNG KÊ SÁCH</strong>
      </div>
      <div class="options">
        <el-input
          placeholder="Nhập tên sách"
          class="input-search"
          v-model="inputSearch"
          @keyup.enter.native="getBooks()"
        ></el-input>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="đến"
          start-placeholder="Bắt đầu"
          end-placeholder="Kết thúc"
          format="dd/MM/yyyy"
        >></el-date-picker>
        <el-button class="search" @click="getBooks()" icon="el-icon-search">Tra cứu</el-button>
      </div>
    </div>
    <div class="analysic-book__index">
      <div class="analysic-book__main">
        <el-scrollbar wrap-class="analysic-book__scroll">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            :header-cell-style="{background: '#EAECED'}"
            v-loading="loading"
            @row-click="gotoDetailBook"
          >
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column property="title" label="Tên sách" width="200" align="center" sortable></el-table-column>
            <el-table-column property="author" label="Tác giả" width="150" align="center" sortable></el-table-column>
            <el-table-column
              property="public_year"
              label="Năm xuất bản"
              width="140"
              align="center"
              sortable
            ></el-table-column>
            <el-table-column label="Ngày gửi yêu cầu" align="center" width="230">
              <template slot-scope="scope">{{ formatTimeRequest(scope.row.created_at) }}</template>
            </el-table-column>
            <el-table-column label="Số chương" align="center" width="100">
              <template slot-scope="scope">{{ scope.row.number_chapter }}</template>
            </el-table-column>
            <el-table-column property="status" label="Trạng thái" align="center" width="250">
              <template slot-scope="scope">
                <span
                  class="text-center"
                  v-html="scope.row.detail ? convertStatusDetail(scope.row.detail) : convertStatusBook(scope.row.status)"
                ></span>
              </template>
            </el-table-column>
            <el-table-column label="Thao tác" align="center" fixed="right" width="150">
              <template slot-scope="scope">
                <el-tooltip effect="light" content="Tải xuống" placement="bottom-start">
                  <el-button
                    icon="el-icon-download"
                    circle
                    @click.stop="handleDownloadBook(scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="light" content="Chi tiết" placement="bottom-start">
                  <el-button icon="el-icon-info" circle @click="gotoDetailBook(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip effect="light" content="Sửa" placement="bottom-start">
                  <el-button icon="el-icon-edit" circle @click.stop="showDialogEditBook(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip effect="light" content="Xóa" placement="bottom-start">
                  <el-button
                    icon="el-icon-delete"
                    circle
                    @click.stop="showDialogDeleteBook(scope.row.id)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <div class="analysic-book__footer" v-if="total > 1">
        <el-pagination
          layout="prev, pager, next"
          :page-count="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>

    <!-- dialog edit book -->
    <el-dialog title="Sửa thông tin sách" :visible.sync="dialogEditVisiable" width="30%" center>
      <el-form v-model="formEditBook" label-width="120px">
        <el-form-item label="Tên sách" prop="title">
          <el-input v-model="formEditBook.title" placeholder="Tên sách"></el-input>
        </el-form-item>
        <el-form-item label="Tác giả" prop="author">
          <el-input v-model="formEditBook.author" placeholder="Tác giả"></el-input>
        </el-form-item>
        <el-form-item label="Năm xuất bản">
          <el-date-picker v-model="yearTime" type="year" placeholder="Năm xuất bản"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisiable = false">Hủy</el-button>
        <el-button type="primary" @click="handleEditBook">Chỉnh sửa</el-button>
      </span>
    </el-dialog>

    <!-- dialog vaof casu hinh -->
    <el-dialog title="Thông báo" :visible.sync="dialogSettingVisiable" width="30%" center>
      <span>
        Sách của bạn chưa được cài đặt thông số.
        <br />Vui lòng vào cấu hình để cài đặt.
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleToSetting">Vào cấu hình</el-button>
        <el-button @click="dialogSettingVisiable = false">Bỏ qua</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { getBooks, updateBook, deleteBook } from "@/api/book";
import { getChapters } from "@/api/chapter";
import { mixins } from "@/mixins/status";
import { downloadMixins } from "@/mixins/chapter";

export default {
  name: "AnalysicBook",
  computed: { ...mapGetters(["userId"]) },
  data() {
    return {
      tableData: [],
      dateRange: [moment().subtract(1, 'month').startOf("month"), moment().endOf("month")],
      limit: 10,
      pageCurrent: 1,
      total: 0,
      loading: true,
      dialogEditVisiable: false,
      formEditBook: {
        id: "",
        title: "",
        author: "",
        publicYear: ""
      },
      yearTime: "",
      inputSearch: "",
      timer: "",
      dialogSettingVisiable: false,
      bookTemp: null
    };
  },
  watch: {
    dateRange: function(range) {
      this.getBooks();
    },
    yearTime: function(time) {
      const date = new Date(time);
      this.formEditBook.publicYear = date.getFullYear();
    }
  },
  mixins: [mixins, downloadMixins],
  methods: {
    gotoDetailBook(book) {
      const {
        id,
        detail: { add }
      } = book;

      if (add) {
        this.dialogSettingVisiable = true;
        this.bookTemp = book;
        return;
      }
      this.$router.push("/statistic-book/" + id);
    },
    async handleToSetting() {
      if (this.bookTemp) {
        try {
          const { id, title, public_year, author, file } = this.bookTemp;
          const { status, result } = await getChapters({
            book_id: id,
            limit: 100,
            page_num: 1
          });
          let chapters = result.data;
          let contentBook = "";
          chapters = chapters.map(chapter => {
            const { title, content, id } = chapter;
            return {
              content,
              title,
              id
            };
          });
          chapters.forEach(({ content }) => {
            contentBook += content + " ";
          });

          this.$store.dispatch("book/updateInfoBook", {
            id,
            name: title,
            publicYear: public_year,
            author,
            chapters,
            content: contentBook,
            file
          });

          this.$router.push({ path: "/convert-book", query: { step: 3 } });
        } catch (error) {
          this.$notify({
            type: "error",
            message: "Có lỗi xảy ra",
            offset: 35
          });
          console.log(error.message);
        }
      }
    },
    async getBooks() {
      this.book = true;
      let start = "";
      let end = "";
      if (this.dateRange) {
        start = new Date(this.dateRange[0]).valueOf();
        end = new Date(this.dateRange[1]).valueOf();
      }
      const params = {
        limit: this.limit,
        user_id: this.userId,
        page_num: this.pageCurrent,
        start_time: start,
        end_time: end
      };

      if (this.inputSearch && this.inputSearch.length > 0) {
        params.inputSearch = this.inputSearch;
      }
      try {
        const { status, result } = await getBooks(params);
        if (status === 1) {
          const {
            data,
            pager: { last_page_num, current_page_num }
          } = result;

          this.pageCurrent = current_page_num;
          this.total = last_page_num;
          this.tableData = data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error.message);
        // this.tableData = [];
        // this.pageCurrent = 1;
        // this.total = 0;
        // this.loading = false;
      }
    },
    formatTimeRequest(time) {
      const date = new Date(time);
      return moment(date.valueOf()).format("h:mm:ss - DD/MM/YYYY");
    },
    handleCurrentChange(pageNum) {
      this.pageCurrent = pageNum;
      this.getBooks();
    },
    async handleEditBook() {
      try {
        const { id, title, author, publicYear } = this.formEditBook;
        const { status } = await updateBook(id, {
          title,
          author,
          publicYear
        });
        if (status === 1) {
          this.$notify({
            type: "success",
            message: "Sửa thông tin sách thành công",
            offset: 40
          });

          this.getBooks();
          this.dialogEditVisiable = false;
          return;
        }
      } catch (error) {
        console.log(error.message);
        this.$notify({
          type: "error",
          message: "Sửa thông tin sách không thành công",
          offset: 40
        });
      }
    },
    showDialogEditBook(book) {
      const { id, title, author, public_year } = book;

      this.formEditBook.id = id;
      this.formEditBook.title = title;
      this.formEditBook.author = author;
      this.formEditBook.publicYear = public_year;

      this.dialogEditVisiable = true;
    },
    showDialogDeleteBook(bookId) {
      const me = this;
      this.$confirm("Bạn có chắc chắn muốn xóa sách này không?", "Cảnh báo", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy bỏ",
        type: "warning",
        customClass: "book-detail__messagebox"
      })
        .then(async () => {
          const { status, message } = await deleteBook(bookId);
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
    async handleDownloadBook(book) {
      try {
        const { title, id } = book;
        const { status, result } = await getChapters({
          book_id: id,
          limit: 100,
          page_num: 1
        });
        if (status === 1) {
          let chapters = result.data;
          chapters = chapters
            .filter(chapter => chapter.audio)
            .map(({ audio, title }) => {
              return {
                audio,
                title
              };
            });
          this.downloadZip({ bookName: title, chapters });
        }
      } catch (error) {
        console.log(error.message);
        this.$notify({
          type: "error",
          message: "Đã có lỗi xảy ra",
          offset: 40
        });
      }
    }
  },
  async mounted() {
    await this.getBooks();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/index.scss";
</style>