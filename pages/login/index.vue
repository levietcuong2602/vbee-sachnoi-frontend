<template>
  <div class="login">
    <Navbar />
    <div class="login-container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="box-title">
            <h5 class="box-title__header text-center">Đăng nhập và trải nghiệm</h5>
          </div>
          <div class="box-main">
            <i
              class="text-danger"
              v-if="errors.isErrorCaptcha || errors.isErrorOther"
            >{{ errors.message }}</i>
            <el-form :rules="loginRules" :model="loginForm" ref="loginForm">
              <el-form-item prop="userName" class="box-main__item">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  placeholder="Tên đăng nhập"
                  name="userName"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                  v-model="loginForm.userName"
                />
              </el-form-item>

              <el-form-item prop="password" class="box-main__item">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  placeholder="Mật khẩu"
                  name="password"
                  :type="passwordType"
                  tabindex="1"
                  auto-complete="on"
                  v-model="loginForm.password"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>

              <el-form-item prop="captcha-show" class="box-main-captcha">
                <el-col :span="8">
                  <div class="label-captcha">Mã Captcha</div>
                </el-col>
                <el-col :span="8">
                  <div class="img-captch" v-html="captcha.captchaSvg"></div>
                </el-col>
                <el-col :span="8">
                  <span class="change-captcha" @click="getCaptcha">
                    <i class="el-icon-refresh text-primary"></i> Đổi mã khác
                  </span>
                </el-col>
              </el-form-item>

              <el-form-item prop="captchaInput" class="box-main-captcha">
                <el-col :span="8">
                  <div class="label-captcha">Nhập mã Captcha</div>
                </el-col>
                <el-col :span="8">
                  <el-input
                    placeholder="Nhập mã captcha"
                    v-model="loginForm.captchaInput"
                    :class="[errors.isErrorCaptcha ? 'is-error' : 'is-success']"
                    @keyup.enter.native="handleLogin"
                  ></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <div class="btn-login">
              <el-button type="primary" @click="handleLogin">Đăng nhập</el-button>
            </div>
            <div class="tips">
              <span style="margin-right:20px;">
                <i>Chưa có tài khoản?</i>
              </span>
              <a href="/register">
                <i class="text-primary">Đăng ký</i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-12 d-none d-sm-block d-block">
          <img src="/img/robo.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from "@/utils/auth";

import { generateCaptcha } from "@/api/captcha";
import { login } from "@/api/authen";

import Navbar from "@/layouts/components/Splash/Navbar";
import { mapState } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapState("auth", ["loggedIn", "user"])
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Tên đăng nhập không được bỏ trống"));
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Mật khẩu phải không được bỏ trống"));
      } else if (value.length < 6) {
        callback(new Error("Mật khẩu phải ít nhất 6 kí tự"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userName: "vietcuong97",
        password: "vietcuong123",
        captchaInput: ""
      },
      loginRules: {
        userName: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        captchaInput: [
          {
            required: true,
            trigger: "blur",
            message: "Captcha không được bỏ trống"
          }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      captcha: {
        captchaSvg: null,
        session: null
      },
      errors: {
        isErrorCaptcha: false,
        isErrorOther: false,
        message: ""
      }
    };
  },
  components: {
    Navbar
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  layout() {
    return "splash";
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    async handleLogin() {
      try {
        this.$refs.loginForm.validate();
        const { status, result, message, code } = await login({
          userName: this.loginForm.userName,
          password: this.loginForm.password,
          captcha: this.loginForm.captchaInput,
          session: this.captcha.session
        });
        if (status === 1) {
          // redrect to pages
          const { access_token } = result;
          setToken(access_token);
          // set store then will set store
          this.$store.dispatch("user/setToken", access_token);
          this.$auth.setUserToken(access_token);
          // redirect to home
          this.$router.push("/");
          return;
        }
        this.getCaptcha();
        this.loginForm.captchaInput = "";
        if (code === 20) {
          this.errors.isErrorCaptcha = true;
          this.errors.message = message;
          this.loginForm.captchaInput = "";
          return;
        }
        this.errors.isErrorOther = true;
        this.errors.message = message;

        // this.$store
        //   .dispatch("user/login", {
        //     userName: this.loginForm.userName,
        //     password: this.loginForm.password,
        //     captcha: this.loginForm.captchaInput,
        //     session: this.captcha.session
        //   })
        //   .then(() => {
        //     this.$router.push({ path: this.redirect || "/" });
        //     this.loading = false;
        //   })
        //   .catch(() => {
        //     this.loading = false;
        //   });
      } catch (error) {}
    },
    async getCaptcha() {
      const { status, result } = await generateCaptcha();
      if (status === 1) {
        const { data, session } = result;
        this.captcha.captchaSvg = data;
        this.captcha.session = session;
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  },
  async mounted() {
    await this.getCaptcha();
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login .el-input .box-main__item input {
    color: $cursor;
  }
}
#__layout {
  height: 100%;
}
/* reset element-ui css */
.login {
  img {
    width: 100%;
    height: 100%;
  }
  .login-container {
    margin-top: 40px;
    padding-left: 10%;
  }
  .box-title {
    .box-title__header {
      color: #fff;
      padding: 20px 0px;
    }
  }
  .box-main__item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }
  .box-main-captcha {
    color: #fff;
    .el-form-item__content {
      display: flex;
      align-items: center;
      font-weight: 600;
      .change-captcha {
        cursor: pointer;
        &:hover {
          color: lightblue;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .btn-login {
    text-align: center;
    margin-top: 35px;
    .el-button {
      min-width: 100%;
    }
  }
  .tips {
    margin-top: 20px;
    text-align: center;
    color: #fff;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
