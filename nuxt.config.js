const { resolve } = require("path");
require("dotenv").config();

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    credentials: false,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/img/headphones.svg" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css",
      },
    ],
    script: [
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js",
      },
      { src: "https://code.jquery.com/jquery-3.3.1.slim.min.js" },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js",
      },
    ],
  },
  env: {
    baseUrl: process.env.DOMAIN_BACKEND
      ? process.env.DOMAIN_BACKEND
      : "http://localhost:8080",
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  router: {
    // middleware: ["auth"],
    extendRoutes(routes, resolve) {
      routes.push({
        name: "custom",
        path: "*",
        component: resolve(__dirname, "pages/404.vue"),
      });
    },
  },
  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css", "@/assets/styles/index.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/svg-icon",
    "@/plugins/bootstrap-vue.js",
    "@/plugins/performance-nuxt.js",
    {
      src: "~/plugins/highcharts.js",
      ssr: true,
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  /**
   * Axios configuration
   */
  axios: {
    baseURL: `${process.env.DOMAIN_BACKEND}/api/v1`, // Used as fallback if no runtime config is provided
    proxyHeaders: false,
    credentials: false,
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "access_token",
          property: "token",
          // required: true,
          type: "Bearer",
          maxAge: 1800,
        },
        // refreshToken: {
        //   property: "refresh_token",
        //   maxAge: 60 * 60 * 24 * 30,
        // },
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "access",
          },
          logout: {
            url: "/auth/logout",
            method: "post",
            propertyName: "access",
          },
          // user: {
          //   url: "/auth/verify-token",
          //   method: "post",
          //   propertyName: "users",
          // },
          tokenRequired: false,
          logout: false,
        },
      },
      watchLoggedIn: true,
      redirect: {
        login: "/login",
        logout: "/",
        home: "/",
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const svgRule = config.module.rules.find((rule) =>
        rule.test.test(".svg")
      );
      svgRule.exclude = [resolve(__dirname, "assets/icons/svg")];

      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [resolve(__dirname, "assets/icons/svg")], //将存放svg的目录加入到loader处理目录
        use: [
          { loader: "svg-sprite-loader", options: { symbolId: "icon-[name]" } },
        ],
      });
    },
  },
};
