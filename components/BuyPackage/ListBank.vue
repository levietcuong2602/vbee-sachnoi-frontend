<template>
  <div class="box_list_bank">
    <p>Chọn ngân hàng thanh toán:</p>
    <div class="list_bank">
      <div
        class="box-img el-col-lg-6 el-col-md-8 el-col-sm-12 el-col-xs-12"
        v-for="bank in banks"
        :key="bank.id"
      >
        <div class="img">
          <img
            :src="bank.bank_image"
            alt
            :class="{active:bank.id === idBank}"
            @click="onSetBank(bank.id)"
          />
          <i class="el-icon-check" :class="{active:bank.id === idBank}"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListBank",
  // props: ['banks', 'bankId'],
  props: {
    banks: Array,
    bankId: Number
  },
  data() {
    return {
      idBank: this.bankId
    };
  },
  methods: {
    onSetBank(id) {
      this.$store.commit("SET_BANK_ID", id);
      this.idBank = id;
    }
  }
};
</script>

<style scoped lang="scss">
@import "styles/ListBank.scss";
</style>
