<template>
  <el-button @click="handleCallAPI">Call API</el-button>
</template>
 
<script>
import axios from "axios";

export default {
  data() {
    return {
      editorText: "This is initialValue.",
      editorOptions: {
        hideModeSwitch: true,
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "divider",
          "indent",
          "outdent"
        ]
      },
      editorHtml: ""
    };
  },
  methods: {
    async handleCallAPI() {
      const { status, data } = await axios({
        type: "POST",
        method: "POST",
        url: "http://frontend.dev.test:8080/default/register-captcha"
      });

      console.log({ status, data });
    }
  }
};
</script>