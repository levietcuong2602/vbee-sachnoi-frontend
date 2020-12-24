<template>
  <div class="app-wrapper">
    <div class="splash-container">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout"
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .splash-container {
    height: 100%;
  }
}
</style>
