<template>
    <div class="tg">
        <div class="top">
            <!-- <p>拉新返佣正式上线</p>
            <p>现在邀请您的朋友加入，立刻享受矿机日产量的1%</p> -->
        </div>
        <div class="con">
            <p class="lh fs111">邀请好友 挖矿提升算力</p>
            <div class="qrcode">
                <qrcode fg-color="#d5af7b" :value="msg" type="img"></qrcode>
            </div>
            <p class="ma lh fc ppp">推荐二维码</p>
            <p class="ma lh">我的推荐链接：<span>{{msg}}</span>
            <span class="btn1 cp" v-clipboard:copy="msg" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        </p>
            <p class="btn2 cp" @click="sh">立刻分享</p>
            <div v-show="show" class="social-share" data-initialized="true">
              <a href="#" class="social-share-icon icon-qq"></a>
              <a href="#" class="social-share-icon icon-qzone"></a>
              <a href="#" class="social-share-icon icon-wechat"></a>
              <a href="#" class="social-share-icon icon-weibo"></a>
            </div>
            <!-- <p class="fc1 cp lh fs000">《了解推荐制度》</p> -->
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import "../../static/overtrue-share.js-a62713a/dist/css/share.min.css";
import { Qrcode } from "vux";
export default {
  data() {
    return {
      msg: "http://ccsserve.qilinpz.com/ccspc/#?yqm=" + $.cookie("tjm"),
      show: false,
      bg:""
    };
  },
  components: {
    Qrcode
  },
  mounted() {
    let that = this;
    that.setname("tuiguang");
    this.init();
    if (!$.cookie("id")) {
      that.$message({
        message: "请先登录！",
        type: "warning",
        duration: 1500
      });
      that.$router.push({
        name: "entry"
      });
    }
    that
      .$http({
        url: "/pic",
        method: "get",
        params: {}
      })
      .then(function(res) {
        that.bg = "http://" + res.data.msg.tuiguang;
        $(".top").css("background-image", "url(" + that.bg + ")");
      });
  },
  methods: {
    sh() {
      this.show = !this.show;
    },
    onCopy(e) {
      let that = this;
      that.$message({
        message: "已成功复制我的推荐链接至剪切板！",
        type: "success",
        duration: 1500
      });
    },
    onError(e) {
      that.$message({
        message: "复制失败！",
        type: "error",
        duration: 1000
      });
    },
    init: function() {
      // let url =
      //   "../../static/overtrue-share.js-a62713a/dist/js/social-share.min.js";
      // let script = document.createElement("script");
      // script.setAttribute("src", url);
      // document.getElementsByTagName("head")[0].appendChild(script);
      let that = this;
      var $config = {
        url: that.msg,
        image: "",
        title: "快来加入吧！戳我的邀请链接：" + that.msg
      };
      socialShare(".social-share", $config);
    }
  }
};
</script>
<style scoped>
.tg {
  min-width: 750px;
  background: white;
}
.top {
  height: 380px;
  padding-top: 80px;
    background-repeat: no-repeat;
  background-origin: content-box;
  background-size: 100% 100%;
  background-color: #27292e;
}
.btn1 {
  display: inline-block;
  padding: 2px 6px 2px;
  background: #d5af7b;
  border-radius: 4px;
  color: white;
  line-height: 26px;
  margin-left: 6px;
}
.btn2 {
  width: 260px;
  line-height: 40px;
  text-align: center;
  color: white;
  background: #d5af7b;
  border-radius: 6px;
  margin: 20px auto 10px;
}
.con {
  padding-bottom: 20px;
}
.con p:first-child {
  line-height: 90px;
}
.ma {
  margin: 10px 0 10px;
  font-size: 20px;
}
.lh {
  line-height: 40px;
}
.fs000 {
  font-size: 14px;
}
.fs111 {
  font-size: 22px;
  font-weight: 700;
}
@media screen and (max-width: 500px) {
  .tg {
    width: 100%;
    min-width: 0;
  }
  .con p:first-child {
    line-height: 1.4rem;
  }
  .top {
    padding-top: 1.4rem;
    height: 150px;
  }
  .fs111 {
    font-size: 0.4rem;
  }
  .ma {
    font-size: 0.36rem;
    margin-top: 0;
  }
  .btn1 {
    display: block;
    width: 1rem;
    margin: 0 auto;
  }
  .lh {
    line-height: 0.6rem;
  }
  .ppp {
    margin: 0;
    margin-top: 6px;
  }
}
</style>
