<template>
  <div class="box-order">
    <h3>Xác nhận đơn hàng</h3>
    <div class="line-order">
      <div>
        <p>
          <b>Mã đơn hàng:</b>
        </p>
      </div>
      <div>
        <b>{{data.tradding_code}}</b>
      </div>
    </div>
    <div class="line-order">
      <div>
        <p>
          <b>Gói dịch vụ:</b>
        </p>
      </div>
      <div>
        <b>{{data.name_package}}</b>
      </div>
    </div>
    <div class="line-order">
      <div>
        <p>
          <b>Thời gian sử dụng:</b>
        </p>
      </div>
      <div>
        <b
          v-if="data.name_package === 'Gói cá nhân' || data.name_package === 'Gói khởi tạo'"
        >Không có</b>
        <b v-else>{{data.expire_day}} ngày</b>
      </div>
    </div>
    <div class="line-order">
      <div>
        <p>
          <b>Số tiền cần thanh toán:</b>
        </p>
      </div>
      <div>
        <b
          style="font-size: 21px;"
          v-bind:class="'money-fee-mb'"
        >{{formatNumber(data.total_price)}} VNĐ</b>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber } from "@/utils/convert";
export default {
  name: "AcceptOder",
  props: ["data"],
  data() {
    return {};
  },
  watch: {
    data(value) {}
  },
  methods: {
    formatNumber
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "styles/AcceptOder.scss";
</style>
