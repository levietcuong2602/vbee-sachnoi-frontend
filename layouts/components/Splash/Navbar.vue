<template>
  <div class="navbar">
    <div class="brand">
      <a href="/" class="logo-container">
        <img src="/img/logo.png" alt="logo" class="logo-brand" />
      </a>
    </div>
    <div class="right-menu">
      <div class="right-menu-item">
        <a class="btn-menu btn-menu-login" href="/login">Đăng nhập</a>
      </div>
      <div class="right-menu-item">
        <a class="btn-menu btn-menu-register" href="/register">Đăng ký</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    routeLogin() {
      this.$router.push("/login");
    },
    routeRegister() {
      this.$router.push("/register");
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  z-index: 9999;
  height: 50px;
  overflow: hidden;
  position: fixed;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0px;

  .logo-container {
    float: left;
    .logo-brand {
      max-width: 100px;
      padding: 5px 15px 5px 5px;
      vertical-align: middle;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
      .btn-menu {
        padding: 5px 35px;
        font-size: 90%;
        height: 35px;
        margin-right: 25px;
        font-weight: 600;
        color: #000;
        text-decoration: none;
      }
      .btn-menu-register {
        background-color: #f2c94c !important;
        color: #fff !important;
        border-radius: 0;
      }
    }
  }
}
</style>