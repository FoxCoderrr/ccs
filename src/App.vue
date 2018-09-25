<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view name="main"></router-view>
    <bot-nav></bot-nav>
  </div>
</template>

<script>
import "../comman.css";
import $ from "jquery";
import "../jquery.cookie.js";
import BotNav from "@/components/botnav";
import TopNav from "@/components/topnav";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    "bot-nav": BotNav,
    "top-nav": TopNav
  },
  mounted() {
    // if (window.history && window.history.pushState) {
    //   $(window).on("popstate", function() {
    //     /// 当点击浏览器的 后退和前进按钮 时才会被触发，
    //     window.history.pushState("forward", null, "");
    //     window.history.forward(1);
    //   });
    // } //
    // window.history.pushState("forward", null, ""); //在IE中必须得有这两行
    // window.history.forward(1);

    function IsPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
    if (!IsPC()) {
      let height =
        document.documentElement.clientHeight || document.body.clientHeight;
      $("#app").css("minHeight", height);
    }
  }
};
</script>

<style>
#app {
  font-family: "Microsoft YaHei,Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 900px;
  background-color: transparent;
  position: relative;
  background: #27292e;
}
@media screen and (max-width: 500px) {
  #app {
    min-width: 0;
    width: 100%;
  }
  .el-message {
    width: 46%;
    min-width: 0;
  }
}
</style>
<style lang="less">
@import "~vux/src/styles/close.less";
</style>
