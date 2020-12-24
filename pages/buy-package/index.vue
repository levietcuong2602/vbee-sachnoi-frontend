<template>
  <div class="buy-package">
    <el-breadcrumb class="pt-3" separator="-">
      <el-breadcrumb-item>Sách nói</el-breadcrumb-item>
      <el-breadcrumb-item>Mua gói cước</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="buy-package__header">
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active buy-package__tab-item"
            data-toggle="tab"
            href="#cost-fee"
          >Gói cước TTS</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link buy-package__tab-item"
            data-toggle="tab"
            href="#book-voice"
          >Gói cước sách nói</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link buy-package__tab-item"
            data-toggle="tab"
            href="#paper-voice"
          >Gói cước báo nói</a>
        </li>
      </ul>
    </div>
    <div class="buy-package__main mt-3">
      <!-- Tab panes -->
      <div class="tab-content" id="tab-content">
        <div id="cost-fee" class="container tab-pane active">
          <client-only>
            <carousel
              :items="4"
              :margin="10"
              :nav="false"
              :dots="false"
              :responsive="options.responsive"
              :loop="false"
            >
              <PackageData
                v-for="element in listPackages"
                :key="element.id.toString()"
                :packageInfo="element"
                @changeSlider="changeTimeProcess"
                @showConfirmDialog="onShowConfirmDialog"
              />
            </carousel>
          </client-only>
        </div>
        <div id="book-voice" class="container tab-pane fade">
          <client-only>
            <carousel
              :items="4"
              :margin="10"
              :nav="false"
              :dots="false"
              :responsive="options.responsive"
              :loop="false"
            >
              <PackageData
                v-for="element in listPackages"
                :key="element.id.toString()"
                :packageInfo="element"
                @changeSlider="changeTimeProcess"
                @showConfirmDialog="onShowConfirmDialog"
              />
            </carousel>
          </client-only>
        </div>
        <div id="paper-voice" class="container tab-pane fade">
          <client-only>
            <carousel
              :items="4"
              :margin="10"
              :nav="false"
              :dots="false"
              :responsive="options.responsive"
              :loop="false"
            >
              <PackageData
                v-for="element in listPackages"
                :key="element.id.toString()"
                :packageInfo="element"
                @changeSlider="changeTimeProcess"
                @showConfirmDialog="onShowConfirmDialog"
              />
            </carousel>
          </client-only>
        </div>
      </div>
    </div>
    <div class="buy-package__footer mt-5">
      <p>
        <strong>Chú thích:</strong>
      </p>
      <ul>
        <li>
          <span>Các gói cước sẽ được tự động gia hạn định kỳ</span>
        </li>
        <li>
          <span>Trong trường hợp sản lượng gói cước hết trước thời hạn. Khách hàng tuỳ chọn một trong hai lựa chọn sau:</span>
          <ul>
            <li>
              <i>Tự động gia hạn các gói cước</i>
            </li>
            <li>
              <i>Tính cước ngoài gói theo giá thông thường</i>
            </li>
          </ul>
        </li>
        <li>
          <span>Bảng giá cước áp dụng cho khách hàng cá nhân.</span>
        </li>
      </ul>
      <span>* Các cước phí trên đã bao gồm phí VAT</span>
    </div>

    <!-- dialog -->
    <el-dialog :visible.sync="dialogVisible" width="38%">
      <h5 slot="title" class="text-center">Xác nhận mua gói cước</h5>
      <p class="text-center">
        Quý khách đang sử dụng
        <strong>{{ 'TTS1' }}</strong>. Gói
        cước cũ sẽ bị
        <strong>HỦY</strong> khi đăng ký mới
      </p>
      <p class="text-center">Bạn có chắc chắn muốn thực hiện thao tác này?</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onBuyPackage">Đồng ý</el-button>
        <el-button type="danger" @click="dialogVisible = false">Huỷ bỏ</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
let carousel;
if (process.client) {
  carousel = require("vue-owl-carousel");
}
import { mapGetters } from "vuex";

import Breadcrumb from "@/components/Breadcrumb";
import PackageData from "@/components/BuyPackage/PackageData";

import { getPackages } from "@/api/package";

export default {
  name: "BuyPackage",
  components: {
    carousel,
    Breadcrumb,
    PackageData
  },
  computed: {
    ...mapGetters(["package"])
  },
  data() {
    return {
      options: {
        items: 4,
        margin: 10,
        loop: true,
        autoplay: true,
        nav: false,
        rewind: true,
        dots: false,
        responsive: {
          1024: {
            items: 4,
            margin: 40
          },
          768: {
            items: 3,
            margin: 30
          },
          640: {
            items: 2,
            margin: 20
          },
          320: {
            items: 1,
            margin: 10
          }
        }
      },
      dialogVisible: false,
      listPackages: []
    };
  },
  methods: {
    changeTimeProcess(id, timeProcess) {
      // this.listPackages = this.listPackages.map(value =>
      //   value.id === id ? { ...value, timeProcess } : value
      // );
    },
    onShowConfirmDialog() {
      this.dialogVisible = true;
    },
    onBuyPackage() {
      this.dialogVisible = false;
      const { packageId } = this.package;
      if (!packageId) {
        this.$message({
          type: "error",
          message: "Không tìm thấy gói cước",
          offset: 50
        });
        return;
      }
      this.$router.push("/buy-package/payment");
    },
    onJqueryTabpane() {
      $("#tab-content").on("shown.bs.tab", function() {
        $(".carousel-inner > .active").removeClass("active");
        var $tp = $(".tab-pane:visible");
        $tp.find(".item:first").addClass("active");
        scrollTo($tp, 40);
      });
    },
    async getPackageList() {
      await getPackages()
        .then(res => {
          const { status, result } = res;
          if (status === 1) {
            const data = {};
            for (const item of result) {
              const { code, id, amount, processing_time } = item;
              if (data[code] === undefined) {
                data[code] = {
                  ...item,
                  id: [id],
                  amount: [amount],
                  processing_time: [processing_time]
                };
              } else {
                data[code].id.unshift(id);
                data[code].amount.unshift(amount);
                data[code].processing_time.unshift(processing_time);
              }
            }
            const listPackages = [];
            for (const item in data) {
              if (data.hasOwnProperty(item)) {
                const pkg = data[item];
                listPackages.push(pkg);
              }
            }
            this.listPackages = listPackages;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    // this.getPackageList();
    this.onJqueryTabpane();
  },
  async asyncData() {
    return await getPackages()
      .then(res => {
        const { status, result } = res;
        if (status === 1) {
          const data = {};
          for (const item of result) {
            const { code, id, amount, processing_time } = item;
            if (data[code] === undefined) {
              data[code] = {
                ...item,
                id: [id],
                amount: [amount],
                processing_time: [processing_time]
              };
            } else {
              data[code].id.unshift(id);
              data[code].amount.unshift(amount);
              data[code].processing_time.unshift(processing_time);
            }
          }
          const listPackages = [];
          for (const item in data) {
            if (data.hasOwnProperty(item)) {
              const pkg = data[item];
              listPackages.push(pkg);
            }
          }
          return { listPackages };
        }
      })
      .catch(err => {
        return { listPackages: [] };
      });
  }
};
</script>
<style lang="scss" scoped>
.buy-package {
  padding: 0px 20px;
  .buy-package__header {
    align-items: center;
    display: flex;
    justify-content: center;
    .buy-package__tab-item {
      font-size: 1.5vw;
      color: #838383;
      &.active {
        background-color: #fff;
        color: #000;
      }
      &:hover {
        color: #000;
      }
    }
  }
  // .buy-package__main {
  // }
  // .buy-package__footer {
  // }
}
</style>