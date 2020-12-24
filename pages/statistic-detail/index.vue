<template>
  <div class="analysic-detail pt-3" v-loading.fullscreen.lock="fullscreenLoading">
    <div id="user_dashboard" class="components-container">
      <el-breadcrumb separator="-">
        <el-breadcrumb-item :to="{ path: '/' }">Sách nói</el-breadcrumb-item>
        <el-breadcrumb-item>Thống kê chi tiết</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="analysic-detail__header mt-3">
        <div class="title">
          <strong>THỐNG KÊ CHI TIẾT</strong>
        </div>
        <div class="select-time">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="Chọn ngày"
            end-placeholder="Chọn ngày"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </div>
      </div>
      <div class="analysic-detail__main">
        <div class="chart-books el-col-lg-9 el-col-md-9 el-col-sm-24 el-col-xs-24">
          <div class="title">
            <h3>Thống kê số đầu sách</h3>
          </div>
          <highcharts class="chart" :options="chartOptionBooks" :updateArgs="updateArgs"></highcharts>
          <div class="title-bottom">
            <h2>Tổng số đầu sách: {{formatNumber(totalBooks)}}</h2>
          </div>
        </div>
        <div class="chart-chapters el-col-lg-9 el-col-md-9 el-col-sm-18 el-col-xs-24">
          <div class="title">
            <h3>Thống kê đầu chương</h3>
          </div>
          <highcharts class="chart" :options="chartOptionChapters" :updateArgs="updateArgs"></highcharts>
          <div class="title-bottom">
            <h2>Tổng số chương: {{formatNumber(totalChapters)}}</h2>
          </div>
        </div>
        <div class="box-request-detail el-col-lg-6 el-col-md-6 el-col-sm-6 el-col-xs-24">
          <div class="title">
            <h3>Dữ liệu so với kỳ trước</h3>
          </div>
          <div class="statistic-request-detail">
            <div class="line-detail" v-for="item  in statisticsDetail" :key="item.title">
              <p class="statistic-title">{{item.title}}</p>
              <p class="detail-value">
                {{item.value}}
                <br />
                <span
                  class="increase-percent"
                  :class="{'text-danger': item.increase < 0, 'text-success': item.increase > 0}"
                  v-if="item.increase"
                >{{item.increase > 0 ? `tăng ${item.increase}` : `giảm ${item.increase}` }} %</span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="box-user-overview el-col-lg-9 el-col-md-9 el-col-sm-24 el-col-xs-24"
          style="display: none;"
        >
          <div class="title">
            <h3>Tổng Quan</h3>
          </div>
          <div class="box-statistic">
            <div class="box box-total-request el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
                  <svg
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1783 14.7477C9.57791 14.7477 9.0918 15.272 9.0918 15.901C9.0918 16.5151 9.5636 17.0543 10.1783 17.0543C10.7931 17.0543 11.2792 16.5151 11.2792 15.901C11.2792 15.272 10.7789 14.7477 10.1783 14.7477Z"
                      fill="white"
                    />
                    <path
                      d="M10.3643 6.01569C8.43418 6.01569 7.54779 7.21387 7.54779 8.02267C7.54779 8.60683 8.01955 8.87642 8.40559 8.87642C9.17759 8.87642 8.86308 7.72314 10.3213 7.72314C11.0362 7.72314 11.6081 8.05266 11.6081 8.74162C11.6081 9.55047 10.8075 10.0147 10.3357 10.4341C9.92108 10.8085 9.37778 11.4227 9.37778 12.7107C9.37778 13.4895 9.5779 13.7142 10.1641 13.7142C10.8646 13.7142 11.0076 13.3847 11.0076 13.1002C11.0076 12.3213 11.0219 11.872 11.8082 11.228C12.1942 10.9134 13.4095 9.89495 13.4095 8.48703C13.4095 7.07912 12.1942 6.01569 10.3643 6.01569Z"
                      fill="white"
                    />
                    <path
                      d="M10.5 0C4.69695 0 0 4.91979 0 11V21.1406C0 21.6153 0.367254 22 0.820312 22H10.5C16.303 22 21 17.0802 21 11C21 4.92061 16.3038 0 10.5 0ZM10.5 20.2812H1.64062V11C1.64062 5.87052 5.60302 1.71875 10.5 1.71875C15.3963 1.71875 19.3594 5.86983 19.3594 11C19.3594 16.1295 15.397 20.2812 10.5 20.2812Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{formatNumber(overview.requestCountTotal)}}</p>
                  <p>yêu cầu</p>
                </div>
              </div>
            </div>
            <div class="box box-request-success el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
                  <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.24 0.590027L11.66 11.17L7.48 7.00003L6.07 8.41003L11.66 14L23.66 2.00003L22.24 0.590027ZM18 2.00003L16.59 0.590027L10.25 6.93003L11.66 8.34003L18 2.00003ZM6 14L0.410004 8.41003L1.83 7.00003L7.41 12.59L6 14Z"
                      fill="#3C4858"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{formatNumber(overview.requestCountSuccess)}}</p>
                  <p>yêu cầu thành công</p>
                </div>
              </div>
            </div>
            <div class="box box-request-fail el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
                  <svg
                    width="22"
                    height="19"
                    viewBox="0 0 22 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 19L11 0L22 19H0ZM18.53 17L11 3.99L3.47 17H18.53ZM10 14V16H12V14H10ZM10 8H12V12H10V8Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{formatNumber(overview.requestCountFail)}}</p>
                  <p>yêu cầu thất bại</p>
                </div>
              </div>
            </div>
            <div class="box box-request-process el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
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
                      d="M21 3V10H14L16.95 7.05C15.68 5.79 13.93 5 12 5C8.14 5 5 8.14 5 12C5 15.86 8.14 19 12 19C15.86 19 19 15.86 19 12H21C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C14.49 3 16.74 4.01 18.36 5.64L21 3ZM11 13V8H12.5V12.15L16.02 14.24L15.25 15.52L11 13Z"
                      fill="#3C4858"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{formatNumber(overview.requestCountProcessing)}}</p>
                  <p>yêu cầu đang xử lý</p>
                </div>
              </div>
            </div>
            <div class="box box-percent-success el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
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
                      d="M10.6 5H13.4V19H10.6V5ZM5 9.2H8V19H5V9.2ZM19 13H16.2V19H19V13Z"
                      fill="#3C4858"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{(overview.percentSuccess)}} %</p>
                  <p>tỷ lệ thành công</p>
                </div>
              </div>
            </div>
            <div class="box box-pro-ser el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
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
                      d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM8 20H4V16H8V20ZM4 14H8V10H4V14ZM14 14H10V10H14V14ZM16 4V8H20V4H16ZM14 8H10V4H14V8ZM16 14H20V10H16V14ZM20 20H16V16H20V20Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{overview.currentPackage}}</p>
                  <p>Gói cước đang sử dụng</p>
                </div>
              </div>
            </div>
            <div class="box box-total-user el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.99 3C9.99 4.66 8.66 6 7 6C5.34 6 4 4.66 4 3C4 1.34 5.34 0 7 0C8.66 0 9.99 1.34 9.99 3ZM16.99 4.5C16.99 5.88 15.88 7 14.5 7C13.12 7 12 5.88 12 4.5C12 3.12 13.12 2 14.5 2C15.88 2 16.99 3.12 16.99 4.5ZM14.5 9C12.67 9 9 9.92 9 11.75V14H20V11.75C20 9.92 16.33 9 14.5 9ZM0 11.5C0 9.17 4.67 8 7 8C7.66 8 8.5 8.1 9.37 8.28C7.33 9.41 7 10.9 7 11.75V14H0V11.5Z"
                      fill="#3C4858"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{formatNumber(overview.totalBookConvert)}}</p>
                  <p>sách đã convert</p>
                </div>
              </div>
            </div>
            <div class="box box-total-money el-col-md-12 el-col-sm-24 el-col-xs-24">
              <div class="box-content">
                <div class="icon-left">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.8 10.9C9.53001 10.31 8.80001 9.7 8.80001 8.75C8.80001 7.66 9.81001 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06001 5.58 6.50001 6.84 6.50001 8.77C6.50001 11.08 8.41001 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44001 17.1 8.63001 16.18 8.52001 15H6.32001C6.44001 17.19 8.08001 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="right-content">
                  <p class="number">{{formatNumber(overview.totalMoney)}} đ</p>
                  <p>Tổng số tiền</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-sentences el-col-lg-24 el-col-md-24 el-col-sm-24 el-col-xs-24">
          <div class="title">
            <h3>Thống kê đầu câu</h3>
          </div>
          <highcharts class="chart" :options="chartOptionSentences" :updateArgs="updateArgs"></highcharts>
          <div class="title-bottom">
            <h2>Tổng số câu: {{formatNumber(totalSentences)}} câu</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { mapGetters } from "vuex";

import {
  statisticsBooks,
  statisticsChapters,
  statisticsSentences,
  statisticsPeriod
} from "@/api/statistic";
import { STATUS_SENTENCE } from "@/constant";

export default {
  name: "AnalysicDetail",
  data() {
    return {
      fullscreenLoading: false,
      statisticsDetail: [],
      overview: {
        requestCountTotal: 1230,
        requestCountSuccess: 320,
        requestCountFail: 20,
        requestCountProcessing: 20,
        requestCountWaiting: 10,
        currentPackage: "Gói TS3",
        totalMoney: 3000000,
        percentSuccess: 100,
        totalBookConvert: 200
      },
      // totalUser: 0,
      updateArgs: [true, true, { duration: 1000 }],
      chartOptionBooks: {
        chart: {
          type: "line"
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: [
            "20/06/2018",
            "21/06/2018",
            "22-06-2018",
            "23-06-2018",
            "24-06-2018",
            "25-06-2018",
            "26-06-2018"
          ],
          crosshair: true
        },
        yAxis: {
          title: {
            text: "Số sách"
          },
          min: 0
        },
        plotOptions: {
          line: {
            marker: false
          },
          series: {
            grouping: false,
            maxPointWidth: 45
          }
        },
        tooltip: {
          pointFormat: "{point.stackTotal}<br/>{series.name}: {point.y}</b>"
        },
        legend: false,
        series: []
      },
      totalBooks: 0,
      chartOptionChapters: {
        chart: {
          type: "line"
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: [],
          crosshair: true
        },
        yAxis: {
          title: {
            text: "Số chương"
          },
          min: 0
        },
        plotOptions: {
          line: {
            marker: false
          },
          series: {
            grouping: false,
            maxPointWidth: 45
          }
        },
        legend: false,
        tooltip: {
          pointFormat: "{point.stackTotal}<br/>{series.name}: {point.y}</b>"
        },
        legend: {
          layout: `horizontal`,
          align: `right`,
          verticalAlign: `top`,
          borderWidth: 0
        },
        series: []
      },
      totalChapters: 0,
      chartOptionSentences: {
        chart: {
          type: "column"
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: [],
          crosshair: true
        },
        yAxis: {
          title: {
            text: "Số câu"
          },
          min: 0
        },
        plotOptions: {
          column: {
            stacking: "normal"
          },
          series: {
            grouping: false,
            maxPointWidth: 45
          }
        },
        tooltip: {
          pointFormat: "{series.name}: {point.y} câu</b>"
        },
        series: []
      },
      totalSentences: 0,
      pickerOptions2: {
        shortcuts: [
          {
            text: "7 ngày trước",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "30 ngày trước",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "90 ngày trước",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dateRange: [
        moment()
          .startOf("month")
          .valueOf(),
        moment().valueOf()
      ]
    };
  },
  methods: {
    formatNumber(value) {
      const val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async statisticsBooks() {
      this.fullscreenLoading = false;
      let startTime = 0,
        endTime = new Date().valueOf();
      if (this.dateRange) {
        startTime = moment(this.dateRange[0])
          .startOf("day")
          .valueOf();
        endTime = moment(this.dateRange[1])
          .endOf("day")
          .valueOf();
      }
      const length =
        moment(endTime).dayOfYear() - moment(startTime).dayOfYear();
      // format array date category
      let arrDateCategories = [];
      for (let i = 0; i <= length; i++) {
        let date = moment(endTime)
          .subtract(i, "d")
          .format("DD-MM-YYYY");
        arrDateCategories.push(date);
      }
      arrDateCategories = arrDateCategories.reverse();
      // get data api
      const { status, result } = await statisticsBooks({
        startTime,
        endTime
      });
      if (status === 1) {
        this.fullscreenLoading = true;
        // format array data
        const dataCharts = [];
        let totalBooks = 0;
        for (const date of arrDateCategories) {
          const dateItem = date.replace(/-/g, "_");
          if (result[dateItem]) {
            const total = parseInt(result[dateItem]);
            totalBooks += total;
            dataCharts.push(total);
          } else {
            dataCharts.push(0);
          }
        }

        this.totalBooks = totalBooks;
        this.chartOptionBooks.xAxis.categories = arrDateCategories;
        this.chartOptionBooks.series = [
          {
            color: "#0DD260",
            name: "Tổng số đầu sách",
            data: dataCharts
          }
        ];
      }
    },
    async statisticsChapters() {
      this.fullscreenLoading = true;
      let startTime = 0,
        endTime = new Date().valueOf();
      if (this.dateRange) {
        startTime = moment(this.dateRange[0])
          .startOf("day")
          .valueOf();
        endTime = moment(this.dateRange[1])
          .endOf("day")
          .valueOf();
      }
      const length =
        moment(endTime).dayOfYear() - moment(startTime).dayOfYear();
      // format array date category
      let arrDateCategories = [];
      for (let i = 0; i <= length; i++) {
        let date = moment(endTime)
          .subtract(i, "d")
          .format("DD-MM-YYYY");
        arrDateCategories.push(date);
      }
      arrDateCategories = arrDateCategories.reverse();
      // get data api
      const { status, result } = await statisticsChapters({
        startTime,
        endTime
      });
      if (status === 1) {
        this.fullscreenLoading = false;
        // format array data
        const dataCharts = [];
        let totalChapters = 0;
        for (const date of arrDateCategories) {
          const dateItem = date.replace(/-/g, "_");
          if (result[dateItem]) {
            const total = parseInt(result[dateItem]);
            totalChapters += total;
            dataCharts.push(total);
          } else {
            dataCharts.push(0);
          }
        }

        this.totalChapters = totalChapters;
        this.chartOptionChapters.xAxis.categories = arrDateCategories;
        this.chartOptionChapters.series = [
          {
            color: "#0DD260",
            name: "Tổng số chương",
            data: dataCharts
          }
        ];
      }
    },
    async statisticsSentences() {
      this.fullscreenLoading = true;
      let startTime = 0,
        endTime = new Date().valueOf();
      if (this.dateRange) {
        startTime = moment(this.dateRange[0])
          .startOf("day")
          .valueOf();
        endTime = moment(this.dateRange[1])
          .endOf("day")
          .valueOf();
      }
      const length =
        moment(endTime).dayOfYear() - moment(startTime).dayOfYear();
      // format array date category
      let arrDateCategories = [];
      for (let i = 0; i <= length; i++) {
        let date = moment(endTime)
          .subtract(i, "d")
          .format("DD-MM-YYYY");
        arrDateCategories.push(date);
      }
      arrDateCategories = arrDateCategories.reverse();
      // get data api
      const { status, result } = await statisticsSentences({
        startTime,
        endTime
      });
      if (status === 1) {
        this.fullscreenLoading = false;
        // format array data
        const dataChartsSuccess = [];
        const dataChartsError = [];
        const dataChartsWaiting = [];
        // const dataChartsOther = [];
        let totalSentences = 0;
        for (const date of arrDateCategories) {
          const dateItem = date.replace(/-/g, "_");
          if (result[dateItem]) {
            const item = result[dateItem];
            let count = 0;
            if (item.hasOwnProperty(STATUS_SENTENCE.SUCCESS)) {
              count = parseInt(item[STATUS_SENTENCE.SUCCESS]);
              dataChartsSuccess.push(count);
            } else {
              dataChartsSuccess.push(0);
            }
            if (item.hasOwnProperty(STATUS_SENTENCE.ERROR)) {
              count = parseInt(item[STATUS_SENTENCE.ERROR]);
              dataChartsError.push(count);
            } else {
              dataChartsError.push(0);
            }
            if (item.hasOwnProperty(STATUS_SENTENCE.WAITING)) {
              count = parseInt(item[STATUS_SENTENCE.WAITING]);
              dataChartsWaiting.push(count);
            } else {
              dataChartsWaiting.push(0);
            }
            totalSentences += count;
          } else {
            dataChartsSuccess.push(0);
            dataChartsError.push(0);
            dataChartsWaiting.push(0);
            // dataChartsOther.push(0);
          }
        }

        this.totalSentences = totalSentences;
        this.chartOptionSentences.xAxis.categories = arrDateCategories;
        this.chartOptionSentences.series = [
          {
            color: "#ff3333",
            name: "Số câu lỗi",
            data: dataChartsError
          },
          {
            color: "#ffd633",
            name: "Số câu đang chờ",
            data: dataChartsWaiting
          },
          {
            color: "#0DD260",
            name: "Số câu thành công",
            data: dataChartsSuccess
          }
        ];
      }
    },
    async statisticsPeriod() {
      this.fullscreenLoading = true;
      let startTime = 0,
        endTime = new Date().valueOf();
      if (this.dateRange) {
        startTime = moment(this.dateRange[0])
          .startOf("day")
          .valueOf();
        endTime = moment(this.dateRange[1])
          .endOf("day")
          .valueOf();
      }
      const { status, result } = await statisticsPeriod({ startTime, endTime });
      if (status === 1) {
        this.fullscreenLoading = false;
        this.statisticsDetail = result;
      }
    }
  },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    points(newValue) {
      this.chartOptions.series[0].data = newValue;
    },
    chartType(newValue) {
      this.chartOptions.chart.type = newValue.toLowerCase();
    },
    seriesColor(newValue) {
      this.chartOptions.series[0].color = newValue.toLowerCase();
    },
    animationDuration(newValue) {
      this.updateArgs[2].duration = Number(newValue);
    },
    dateRange(value) {
      this.statisticsBooks();
      this.statisticsChapters();
      this.statisticsSentences();
      this.statisticsPeriod();
    }
  },
  computed: {
    ...mapGetters(["userId"])
  },
  mounted() {
    this.statisticsBooks();
    this.statisticsChapters();
    this.statisticsSentences();
    this.statisticsPeriod();
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/analysic-detail/index.scss";
</style>