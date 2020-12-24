<template>
  <div :class="['cost-item', getClassWrap()]">
    <div class="cost-item__header">
      <div class="cost-item__title">{{ packageInfo.name }}</div>
      <div class="cost-item__money">{{ formatNumber(getPricePackage()) }}</div>
      <div class="cost-item__unit">VNĐ</div>
    </div>
    <div class="cost-item__main">
      <p>Thời gian chờ xử lý mỗi 50 trang</p>
      <el-slider
        :step="50"
        :max="100"
        :marks="getMarks(slider)"
        @change="handleChange"
        v-model="slider"
        :show-tooltip="false"
      ></el-slider>
      <!-- <RangeSlider /> -->
      <p>Hạn sử dụng {{ packageInfo.number_expire_day }} ngày</p>
      <el-divider></el-divider>
      <p>Tối đa {{ formatNumber(packageInfo.max_page) }} trang</p>
      <el-divider></el-divider>
      <p>{{ packageInfo.support_description }}</p>
      <el-divider></el-divider>
      <p>Định dạng {{ packageInfo.support_format }}</p>
    </div>
    <div class="cost-item__footer">
      <el-button type="warning" round @click="handleBuyPackage">Mua ngay</el-button>
    </div>
  </div>
</template>
<script>
import { formatNumber } from "@/utils";
const SliderTime = {
  0: 0.25,
  50: 1,
  100: 24
};
const TimeSlider = {
  0.25: 0,
  1: 50,
  24: 100
};
export default {
  name: "CostFeeItem",
  props: {
    packageInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeSlider: [],
      marks: this.getMarks(0),
      slider: 0
    };
  },
  methods: {
    getClassWrap() {
      const slider = this.slider;
      if (slider === 0) {
        return "package-class-1";
      }
      if (slider === 50) {
        return "package-class-2";
      }
      if (slider === 100) {
        return "package-class-3";
      }
    },
    handleChange(value) {
      if (value === 0) {
        this.marks = {
          0: {
            label: "15 phút",
            style: {
              top: "-50px"
            }
          },
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (value === 50) {
        this.marks = {
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (value === 100) {
        this.marks = {
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      }

      if (!this.timeSlider.includes(value)) {
        this.slider = this.timeSlider[0];
      } else {
        this.slider = value;
      }
      // this.$emit("changeSlider", {
      //   id: this.packageInfo.id,
      //   timeProcess: this.slider
      // });
    },
    getMarks(slider) {
      if (slider === 0) {
        return {
          0: {
            label: "15 phút",
            style: {
              top: "-50px"
            }
          },
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (slider === 50) {
        return {
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (slider === 100) {
        return {
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      }
    },
    convertTimeSlider(processingTime = []) {
      this.timeSlider = processingTime.map(time => TimeSlider[time]);
    },
    formatNumber,
    getPricePackage() {
      if (this.packageInfo) {
        const { amount } = this.packageInfo;
        const index = this.timeSlider.indexOf(this.slider);
        if (index < 0) {
          return "";
        }
        const price = amount[index];
        return price;
      }
      return "";
    },
    handleBuyPackage() {
      const packagePrice = this.getPricePackage();
      const timeProcess = SliderTime[this.slider];
      const {
        number_expire_day,
        name,
        amount,
        processing_time,
        id
      } = this.packageInfo;
      let packageId = null;
      if (
        amount.indexOf(packagePrice) === processing_time.indexOf(timeProcess)
      ) {
        const index = amount.indexOf(packagePrice);
        packageId = id[index];
      }
      this.$store.dispatch("package/updatePackage", {
        packageId,
        packageName: name,
        amount: packagePrice,
        numberExpireDay: number_expire_day,
        processingTime: timeProcess
      });

      this.$emit("showConfirmDialog");
    }
  },
  mounted() {
    const { processing_time } = this.packageInfo;
    this.convertTimeSlider(processing_time);
    this.slider = this.timeSlider[0];
  }
};
</script>
<style lang="scss" scoped>
.cost-item {
  background-color: #eeeeee;
  // margin: 0px 20px;
  text-align: center;
  padding: 20px 0px;
  border-top: 5px solid;
  .cost-item__header {
    .cost-item__title {
      font-size: 1.5vw;
      font-weight: 500;
    }
    .cost-item__money {
      font-size: 2.1vw;
      font-weight: 500;
    }
    .cost-item__unit {
      font-weight: 500;
    }
  }
  .cost-item__main {
    padding: 0px 25px;
  }
  .cost-item__footer {
    .el-button {
      min-width: 150px;
    }
  }
  .el-divider {
    margin: 5px;
  }
}
</style>