<template>
  <div class="payment-history">
    <Breadcrumb />
    <div class="payment-history__header">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="đến"
        start-placeholder="Bắt đầu"
        end-placeholder="Kết thúc"
      ></el-date-picker>
      <el-button type="warning" @click="handleSearch">Tìm kiếm giao dịch</el-button>
      <el-button>
        <i class="el-icon-refresh"></i>
        Cập nhật
      </el-button>
    </div>
    <div class="payment-history__main">
      <el-scrollbar wrap-class="payment-history__scroll">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background: '#EAECED'}"
          v-loading="loading"
        >
          <el-table-column property="code" width="120" label="Mã giao dịch"></el-table-column>
          <el-table-column label="Thời gian giao dịch" width="220">
            <template slot-scope="scope">{{formatTimeRequest(scope.row.created_at)}}</template>
          </el-table-column>
          <el-table-column label="Số tiền thanh toán">
            <template slot-scope="scope">{{formatNumber(scope.row.amount)}} VNĐ</template>
          </el-table-column>
          <el-table-column
            property="status"
            label="Trạng thái giao dịch"
            :filters="[{ text: 'Thành công', value: '1' }, { text: 'Thất bại', value: '0' }]"
          ></el-table-column>
          <el-table-column
            property="packages.name"
            label="Tên gói cước"
            :filters="[{ text: 'S1', value: 'S1' }, { text: 'S7', value: 'S7' }, { text: 'S30', value: 'S30' }, { text: 'S30MAX', value: 'S30MAX' }]"
            filter-placement="bottom-end"
          ></el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div class="payment-history__footer" v-if="total > 0">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import { mapGetters } from "vuex";

import { formatNumber, formatTimeRequest } from "@/utils";
import { getTransactions } from "@/api/transactions";

export default {
  name: "PaymentHistory",
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters(["userId"])
  },
  data() {
    return {
      dateRange: [],
      tableData: [],
      limit: 10,
      total: 0,
      pageCurrent: 0,
      loading: true
    };
  },
  methods: {
    async getTransactions() {
      try {
        let start = "";
        let end = "";
        if (this.dateRange) {
          start = new Date(this.dateRange[0]).valueOf();
          end = new Date(this.dateRange[1]).valueOf();
        }
        // const { data, status } = await axios({
        //   type: "GET",
        //   method: "GET",
        //   url: `http://localhost:8888/api/v1/transactions?type=PACKAGE&limit=${this.limit}
        // &user_id=${this.userId}&page_num=${this.pageCurrent}&start_time=${start}&end_time=${end}`
        // });
        const { status, result } = await getTransactions({
          type: "PACKAGE",
          limit: this.limit,
          user_id: this.userId,
          page_num: this.pageCurrent,
          start_time: start,
          end_time: end
        });
        const {
          pager: { total_count, current_page_num },
          data
        } = result;

        this.total = total_count;
        this.pageCurrent = current_page_num;
        this.tableData = data;

        this.loading = false;
      } catch (error) {
        console.log(error.message);
        // init attribute
        // this.tableData = [];
        this.loading = false;
      }
    },
    handleCurrentChange(pageNum) {
      this.pageCurrent = pageNum;
      this.getTransactions();
    },
    initDateRangeDefault() {
      var date = new Date();
      var start = new Date(date.getFullYear(), date.getMonth(), 1);
      var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      this.dateRange = [start, end];
    },
    formatTimeRequest,
    formatNumber,
    handleSearch() {
      this.getTransactions();
    }
  },
  mounted() {
    this.initDateRangeDefault();
    this.getTransactions();
  }
};
</script>
<style lang="scss">
.payment-history {
  padding: 10px 20px;
  .payment-history__header {
    .el-range-separator {
      width: 35px;
    }
  }
  .payment-history__main {
    margin-top: 20px;
    .payment-history__scroll {
      max-height: 650px;
    }
  }
}
</style>
