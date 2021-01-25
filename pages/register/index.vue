<template>
  <div class="register">
    <Navbar />
    <div class="register-container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-12">
          <el-scrollbar wrap-class="box-left">
            <div class="box-title">
              <h5 class="box-title__header text-center">Bắt đầu cùng Vbee</h5>
            </div>
            <div class="box-main">
              <i
                class="text-danger"
                v-if="errors.isErrorCaptcha || errors.isErrorOther"
              >{{ errors.message}}</i>
              <el-form :model="formRegister" :rules="rules" ref="formRegister">
                <el-form-item prop="userName" class="box-main__item" ref="userName">
                  <span class="svg-container">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input
                    placeholder="Tên đăng nhập"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                    v-model="formRegister.userName"
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
                    v-model="formRegister.password"
                    ref="password"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>

                <el-form-item prop="confirmPwd" class="box-main__item">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPwd"
                    type="password"
                    tabindex="1"
                    auto-complete="on"
                    v-model="formRegister.confirmPwd"
                    ref="confirm"
                  />
                  <!-- <span class="show-pwd" @click="showConfirmPwd">
                      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>-->
                </el-form-item>

                <el-form-item prop="fullName" class="box-main__item">
                  <span class="svg-container">
                    <svg-icon icon-class="name" />
                  </span>
                  <el-input
                    placeholder="Họ và tên"
                    name="fullName"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                    v-model="formRegister.fullName"
                  />
                </el-form-item>

                <el-form-item prop="phoneNumber" class="box-main__item" ref="phoneNumber">
                  <span class="svg-container">
                    <svg-icon icon-class="call" />
                  </span>
                  <el-input
                    placeholder="Số điện thoại"
                    name="phoneNumber"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                    v-model.number="formRegister.phoneNumber"
                  />
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

                <el-form-item
                  prop="captchaInput"
                  class="box-main-captcha"
                  ref="captchaInput"
                  :class="[errors.isErrorCaptcha ? 'is-error' : 'is-success']"
                >
                  <el-col :span="8">
                    <div class="label-captcha">Nhập mã Captcha</div>
                  </el-col>
                  <el-col :span="8">
                    <el-input placeholder="Nhập mã captcha" v-model="formRegister.captchaInput"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div class="btn-register">
                <el-button type="primary" @click="handleRegister">Đăng ký</el-button>
              </div>
              <div class="tips">
                <span style="margin-right:20px;">
                  <i>Đã có tài khoản?</i>
                </span>
                <a href="/login">
                  <i class="text-primary">Đăng nhập</i>
                </a>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-12 d-none d-sm-block d-block">
          <img src="/img/robo.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { generateCaptcha } from "@/api/captcha";
import { register } from "@/api/authen";
import { setToken } from "@/utils/auth";

import Navbar from "@/layouts/components/Splash/Navbar";

export default {
  name: "register",
  components: {
    Navbar
  },
  data() {
    const validateUser = (rule, value, callback) => {
      if (/ /g.test(value)) {
        callback(new Error("Tên tài khoản không được chứa khoảng trắng"));
      }
      if (!/^[a-zA-Z0-9.\-_$@*!]{3,30}$/.test(value)) {
        callback(new Error("Tên tài khoản không không hợp lệ"));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Mật khẩu không được bỏ trống"));
      } else if (value.length < 8) {
        callback(new Error("Mật khẩu phải chứa ít nhất 8 ký tự"));
      } else if (!/[a-z]/i.test(value)) {
        callback(new Error("Mật khẩu phải chứa ít nhất 1 kí tự chữ"));
      }
      if (!/[0-9]/.test(value)) {
        callback(new Error("Mật khẩu phải chứa ít nhất 1 kí tự số"));
      }
    };
    const validateConfirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập lại mật khẩu"));
      } else if (value !== this.formRegister.password) {
        callback(new Error("Nhập lại mật khẩu không trùng khớp"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") callback();
      else if (!/((0)+([0-9]{9})\b)/.test(value))
        callback(new Error("Số điện thoại không đúng định dạng"));
    };

    return {
      passwordType: "password",
      confirmType: "password",
      captcha: {
        captchaSvg: null,
        session: null
      },

      // form
      formRegister: {
        userName: "vietcuong97",
        password: "vietcuong97",
        confirmPwd: "vietcuong97",
        fullName: "vietcuong97",
        phoneNumber: "",
        captchaInput: ""
      },
      errors: {
        isErrorCaptcha: false,
        isErrorOther: false,
        message: ""
      },
      rules: {
        userName: [
          {
            validator: validateUser,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        confirmPwd: [{ validator: validateConfirm, trigger: "blur" }],
        fullName: [
          {
            required: true,
            message: "Họ và tên không được bỏ trống",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        captchaInput: [
          {
            required: true,
            message: "Mã captcha không được bỏ trống",
            trigger: "blur"
          }
        ]
      }
    };
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
    async getCaptcha() {
      const { status, result } = await generateCaptcha();
      if (status === 1) {
        const { data, session } = result;
        this.captcha.captchaSvg = data;
        this.captcha.session = session;
      }
    },
    async handleRegister() {
      try {
        this.$refs.formRegister.validate();
        
        const {
          userName,
          password,
          fullName,
          phoneNumber,
          captchaInput
        } = this.formRegister;
        const { session } = this.captcha;

        const { status, message, code, result } = await register({
          userName,
          password,
          fullName,
          phoneNumber,
          captcha: captchaInput,
          session
        });
        if (status === 1) {
          this.$notify({
            type: "success",
            message: "Đăng ký tài khoản thành công",
            offset: 35
          });
          // redrect to pages
          const { access_token } = result;
          setToken(access_token);
          this.$auth.setUserToken(access_token);
          // redirect to home
          this.$router.push("/");

          return;
        }

        this.getCaptcha();
        this.formRegister.captchaInput = "";
        if (code === 19) {
          this.errors.isErrorOther = true;
          this.errors.message = message;
        } else if (code === 20) {
          this.errors.isErrorCaptcha = true;
          this.errors.message = message;
          this.formRegister.captchaInput = "";
        }
      } catch (error) {
        this.getCaptcha();
        this.formRegister.captchaInput = "";
      }
    }
  },
  async mounted() {
    await this.getCaptcha();
  },
  layout() {
    return "splash";
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
  .register .el-input .box-main__item input {
    color: $cursor;
  }
}
#__layout {
  height: 100%;
}
/* reset element-ui css */
.register {
  img {
    width: 100%;
    height: 100%;
  }
  .el-scrollbar__bar {
    opacity: 0;
  }
  .box-left {
    width: 100%;
    height: 600px;
    // overflow: hidden !important;
  }
  .register-container {
    padding-left: 10%;
    margin-top: 40px;
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
$cursor: #fff;

.register {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .btn-register {
    text-align: center;
    margin-top: 35px;
    .el-button {
      min-width: 100%;
    }
  }
  .container {
    margin-top: 40px;
  }
  .box-title {
    .box-title__header {
      color: #fff;
      padding: 20px 0px;
    }
  }
  .box-main {
    padding-bottom: 100px;
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
