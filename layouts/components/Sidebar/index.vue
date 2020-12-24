<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      // return this.$router.options.routes;
      return [
        {
          path: "/convert-book",
          redirect: "/convert-book",
          children: [
            {
              path: "/convert-book",
              name: "convertBook",
              meta: { title: "Chuyển sách nói", icon: "convert-book" }
            }
          ]
        },
        {
          path: "/statistic-detail",
          redirect: "/statistic-detail",
          children: [
            {
              path: "/statistic-detail",
              name: "StatisticDetail",
              meta: { title: "Thống kê chi tiết", icon: "statistic-detail" }
            }
          ]
        },
        {
          path: "/statistic-book",
          redirect: "/statistic-book",
          children: [
            {
              path: "/statistic-book",
              name: "StatisticBook",
              meta: { title: "Thống kê sách", icon: "statistic-book" }
            }
          ]
        },
        {
          path: "/payment-history",
          redirect: "/payment-history",
          children: [
            {
              path: "/payment-history",
              name: "PaymentHistory",
              meta: { title: "Lịch sử thanh toán", icon: "payment-history" }
            }
          ]
        },
        {
          path: "/buy-package",
          redirect: "/buy-package",
          children: [
            {
              path: "/buy-package",
              name: "BuyPackage",
              meta: { title: "Mua gói cước", icon: "buy-package" }
            }
          ]
        },
        {
          path: "/logout",
          redirect: "/logout",
          children: [
            {
              path: "/logout",
              meta: { title: "Đăng xuất", icon: "logout" }
            }
          ]
        }
      ];
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
