<template>
  <div class="navbar">
    <div class="brand">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <!-- <breadcrumb class="breadcrumb-container" /> -->
      <a href="/" class="logo-container">
        <img src="/img/logo.png" alt="logo" class="logo-brand" />
      </a>
    </div>

    <div class="right-menu profile">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="hi-user">Xin chào, {{ userInfo.fullName }}</i>
          <i class="el-icon-user-solid"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit-info">
            <i class="fas fa-users-cog"></i>Thông tin
          </el-dropdown-item>
          <el-dropdown-item command="edit-pass">
            <i class="fas fa-cogs"></i>Đổi mật khẩu
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <i class="fas fa-sign-out-alt"></i>Đăng xuất
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="Thông tin tài khoản" :visible.sync="dialogVisible" width="40%" center>
      <el-form :model="userInfo" label-width="120px">
        <el-form-item label="Tên tài khoản" prop="title">
          <el-input v-model="userInfo.username" placeholder="Tên đăng nhập" disabled></el-input>
        </el-form-item>
        <el-form-item label="Họ và tên" prop="author">
          <el-input v-model="userInfo.fullName" placeholder="Họ và tên"></el-input>
        </el-form-item>
        <el-form-item label="Số điện thoại" prop="publicYear">
          <el-input v-model="userInfo.phoneNumber" placeholder="Số điện thoại"></el-input>
        </el-form-item>
      </el-form>
      <i class="text-danger" v-if="errors.isError">{{ errors.message }}</i>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="updateUser">Cập nhật</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Đổi mật khẩu" :visible.sync="dialogVisibleChangeWord" width="40%" center>
      <el-form :model="formPass" label-width="180px" :rules="rulesPass" ref="formPass">
        <el-form-item label="Mật khẩu cũ" prop="passwordOld">
          <el-input v-model="formPass.passwordOld" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Mật khẩu mới" prop="passwordNew">
          <el-input v-model="formPass.passwordNew" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Nhập lại mật khẩu mới" prop="passwordConfirm">
          <el-input v-model="formPass.passwordConfirm" type="password"></el-input>
        </el-form-item>
      </el-form>
      <i class="text-danger" v-if="errors.isErrorPass">{{ errors.messagePass }}</i>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChangeWord = false">Hủy</el-button>
        <el-button type="primary" @click="changePassword">Cập nhật</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

import { setToken } from "@/utils/auth";
import { getUserInfo, updateUser, changePassword } from "@/api/authen";

export default {
  data() {
    const validatePassOld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Mật khẩu không được bỏ trống"));
      } else {
        callback();
      }
    };
    const validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Mật khẩu không được bỏ trống"));
      } else if (value === this.formPass.passwordOld) {
        callback(
          new Error("Mật khẩu mới không được trùng với mật khẩu trước đó")
        );
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
        callback(new Error("Vui lòng nhập lại mật khẩu mới"));
      } else if (value !== this.formPass.passwordNew) {
        callback(new Error("Nhập lại mật khẩu mới trùng khớp"));
      } else {
        callback();
      }
    };

    return {
      userInfo: {
        username: "",
        fullName: "",
        phoneNumber: "",
        password: ""
      },
      errors: {
        isError: false,
        isErrorPass: false,
        message: "",
        messagePass: ""
      },
      isChange: false,
      isChangePass: false,
      dialogVisible: false,
      dialogVisibleChangeWord: false,
      formPass: {
        passwordOld: "",
        passwordNew: "",
        passwordConfirm: ""
      },
      rulesPass: {
        passwordOld: [{ validator: validatePassOld, trigger: "change" }],
        passwordNew: [{ validator: validateNewPass, trigger: "change" }],
        passwordConfirm: [{ validator: validateConfirm, trigger: "change" }]
      }
    };
  },
  watch: {
    "userInfo.fullName": function() {
      this.isChange = true;
    },
    "userInfo.phoneNumber": function() {
      this.isChange = true;
    },
    "formPass.passwordOld": function() {
      this.errors.isErrorPass = false;
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async handleCommand(command) {
      if (command === "edit-info") {
        this.dialogVisible = true;
      } else if (command === "edit-pass") {
        this.dialogVisibleChangeWord = true;
        this.formPass.passwordOld = "";
        this.formPass.passwordNew = "";
        this.formPass.passwordConfirm = "";
        this.errors.isErrorPass = false;
        if (this.$refs.formPass) {
          this.$refs.formPass.clearValidate();
        }
      } else if (command === "logout") {
        await this.logout();
      }
    },
    async changePassword() {
      try {
        this.$refs.formPass.validate();
        const { passwordOld, passwordNew } = this.formPass;
        const { status, message } = await changePassword({
          passwordOld,
          passwordNew
        });
        if (status === 1) {
          this.$notify({
            type: "success",
            message: "Cập nhật mật khẩu thành công",
            offset: 35
          });
          this.errors.isErrorPass = false;
          this.dialogVisibleChangeWord = false;
          return;
        }

        this.errors.isErrorPass = true;
        this.errors.messagePass = message;
      } catch (error) {
        this.errors.isErrorPass = true;
        this.errors.messagePass = error.message;
      }
    },
    async logout() {
      this.$auth.setToken("local", "");
      setToken("");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    async getUserInfo() {
      try {
        const { status, result } = await getUserInfo();
        if (status === 1) {
          const { full_name, phone_number, username, password } = result;
          this.userInfo.username = username;
          this.userInfo.fullName = full_name;
          this.userInfo.phoneNumber = phone_number;
          this.userInfo.password = password;
        } else {
          this.$auth.setToken("local", "");
          setToken();
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }
      } catch (error) {
        console.log(error.message);
        this.$notify({
          type: "error",
          message: error.message,
          offset: 35
        });
      }
    },
    async updateUser() {
      if (this.isChange) {
        const updateField = {};
        const { fullName, phoneNumber, password } = this.userInfo;
        updateField.fullName = fullName;
        updateField.phoneNumber = phoneNumber;
        try {
          const { status } = await updateUser(updateField);
          if (status === 1) {
            this.$notify({
              type: "success",
              message: "Cập nhật thông tin thành công!",
              offset: 35
            });
            this.dialogVisible = false;
            this.isChange = false;
          }
        } catch (error) {
          this.errors.isError = true;
          this.errors.message = error.message;
        }
      }
    }
  },
  async mounted() {
    this.getUserInfo();
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

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

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
    padding-right: 20px;

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
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
