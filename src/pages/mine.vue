<template>
    <div class="mine">
            <div class="b"></div>
        <div class="con">
            <div class="left fl">
                <ul>
                    <li class="fc cp" :class="{se:nid==1}" @click="navtap(1)">账户管理</li>
                    <li class="fc cp" :class="{se:nid==2}" @click="navtap(2)">战队招募</li>
                    <li class="fc cp" :class="{se:nid==3}" @click="navtap(3)">我的战队</li>
                </ul>
            </div>
            <div class="right fr">
                <div class="top">
                    <div class="topc ovh">
                        <div class="header fl">
                            <img src="../assets/FKlogo.png" alt="">
                        </div>
                        <div class="info tal fl">
                            <p class="rz">
                                <span>ID:{{uinfo.id}}</span>
                            </p>
                            <p>
                                <span>等级：{{uinfo.level}}</span>
                                <img src="" alt="">
                            </p>
                        </div>
                        <div class="oo fl tal">
                            <p v-show="nid==1&&uinfo.pid" class="ml000">上级ID：{{uinfo.pid}}</p>
                            <p>
                                <span class="ml000">信息认证：</span>
                                <img v-if="uinfo.qq" src="../assets/rz0.png" alt="">
                                <img v-if="uinfo.phone" src="../assets/rz1.png" alt="">
                                <img v-if="uinfo.mail" src="../assets/rz2.png" alt="">
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 我的战队 -->
                <div v-show="nid==3" class="bot">
                    <div class="myteam fc tal"><p>我的战队</p></div>
                    <div class="team">
                        <p class="d-flex lh000">
                            <span class="flex1">矿池算力 <span class="fc1">{{num[2]||0}}(T)</span> </span>
                            <span class="flex1">总矿工数 <span class="fc1">({{num[1]}})</span> </span>
                        </p>
                        <div class="tab">
                            <p class="d-flex tabt">
                                <span class="flex1 cp" :class="{select:nid1==1}" @click="navtap1(1)">直推({{num[0]||0}})</span>
                                <span class="flex1 cp" :class="{select:nid1==2}" @click="navtap1(2)">团队({{num[1]}})</span>
                            </p>
                            <ul class="mem">
                                <li class="d-flex" v-for="(item,index) in list">
                                    <div class="flex1">
                                        <img src="" alt="">
                                    </div>
                                    <span class="tipname">{{item.name}}</span>
                                    <p class="flex1 name cp tal">{{item.name}}</p>
                                    <p class="flex3">注册时间: {{item.createtime}}</p>
                                </li>
                            </ul>
                            <el-pagination :small="small" :pager-count="5" :page-size="8"  background layout="prev, pager, next" :total="sum" :current-page="page" @current-change="handpage"></el-pagination>
                        </div>
                    </div>
                </div>
                <!-- 战队招募 -->
                <div v-show="nid==2" class="bot bot1">
                    <p class="ff">邀请好友 挖矿提升算力</p>
                    <div class="qrcode mt10">
                         <qrcode fg-color="#d5af7b" :value="msg" type="img"></qrcode>
                    </div>
                    <p class="lh fc">推荐二维码</p>
                    <p class="lh">我的推荐链接：{{msg}}
                        <span class="btn1 cp"  v-clipboard:copy="msg" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span> 
                    </p>
                    <p class="btn2 cp" @click="sh">立即分享</p>
                    <div v-show="show" class="social-share" data-initialized="true">
                      <a href="#" class="social-share-icon icon-qq"></a>
                      <a href="#" class="social-share-icon icon-qzone"></a>
                      <a href="#" class="social-share-icon icon-wechat"></a>
                      <a href="#" class="social-share-icon icon-weibo"></a>
                    </div>
                </div>
                <!-- 账户管理 -->
                <div v-show="nid==1" class="bot bot2">
                  <div class="zc">
                    <div class="rl fl">
                      <p class="tac">总资产<span class="as000">(美元)</span></p>
                      <p class="tac"> <span class="fca">{{uinfo.asset||0}}</span></p>
                    </div>
                    <div class="fl assets">
                      <p class="tal">
                        <span>可用SCS：<span class="fcb">{{uinfo.rxb||0}}</span> </span>
                        <span class="fr">冻结SCS：<span class="fcb">{{uinfo.freeze||0}}</span> </span>
                      </p>
                      <p class="tal">钱包地址：<span class="btn0 cp fr" v-if="uinfo.wallet"  v-clipboard:copy="msg1" v-clipboard:success="onCopy1" v-clipboard:error="onError1">复制</span><span class="fcb fcbb">{{uinfo.wallet}}</span> </p>
                    </div>
                  </div>
                    <div class="d-flex xx">
                        <span class="flex1 tal">手机号验证</span>
                        <span class="flex1">{{uinfo.phone}}</span>
                        <span class="flex1 tar"><span class="cp">已认证</span></span>
                    </div>
                    <div class="d-flex xx">
                        <span class="flex1 tal">完善信息</span>
                        <span class="flex1"></span>
                        <span class="flex1 tar"><span class="cp ss">未完善</span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import { Loading } from "element-ui";
import { Qrcode } from "vux";
import "../../static/overtrue-share.js-a62713a/dist/css/share.min.css";
export default {
  data() {
    return {
      show: false,
      nid: 1,
      nid1: 1,
      uinfo: "",
      list: "",
      num: "",
      msg: "http://ccsserve.qilinpz.com/ccspc/#?yqm=" + $.cookie("tjm"),
      msg1: "",
      small: false,
      page: 1,
      sum: 100
    };
  },
  components: {
    Qrcode
  },
  mounted() {
    let that = this;
    that
      .$http({
        url: "/xinxi",
        method: "get",
        params: {
          id: $.cookie("id")
        }
      })
      .then(function(res) {
        that.num = [res.data.msg.count, res.data.msg.tcount, res.data.msg.sum];
      });
    let width =
      document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 600) {
      that.small = true;
    }
    that.setname("mine");
    this.init();
    var $config = {
      url: that.msg,
      image: "",
      title: "快来加入吧！戳我的邀请链接：" + that.msg
    };
    socialShare(".social-share", $config);
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
    that.getuinfo();
    // 名字
    $(".mem").on("click", ".name", function() {
      $(".tipname").stop(false, true);
      $(this)
        .siblings(".tipname")
        .fadeIn();
    });
    $(".mem").on("touchstart", ".name", function() {
      $(".tipname").stop(false, true);
      $(this)
        .siblings(".tipname")
        .fadeIn();
    });
    $(".mem").on("mouseleave", ".name", function() {
      $(this)
        .siblings(".tipname")
        .fadeOut();
    });
    $(".mem").on("touchend", ".name", function() {
      $(this)
        .siblings(".tipname")
        .fadeOut();
    });
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
      $(".mem").unbind("click");
    }
  },
  methods: {
    sh() {
      this.show = !this.show;
    },
    navtap(i) {
      let that = this;
      this.nid = i;
      if (i == 1) {
        that.getuinfo();
      } else if (i == 2) {
        var $config = {
          url: that.msg,
          image: ""
        };
        socialShare(".social-share", $config);
      } else if (i == 3) {
        that
          .$http({
            url: "/xinxi",
            method: "get",
            params: {
              id: $.cookie("id")
            }
          })
          .then(function(res) {
            that.num = [
              res.data.msg.count,
              res.data.msg.tcount,
              res.data.msg.sum
            ];
          });
        that.getlist();
      }
    },
    navtap1(i) {
      let that = this;
      that.page = 1;
      this.nid1 = i;
      if (i == 1) {
        that.getlist();
      } else {
        that.getlist1();
      }
    },
    getuinfo() {
      let that = this;
      that
        .$http({
          url: "/user/user",
          method: "get",
          params: {
            id: $.cookie("id")
          }
        })
        .then(function(res) {
          if (res.data.msg.asset) {
            res.data.msg.asset = parseFloat(res.data.msg.asset).toFixed(2);
          }
          if (res.data.msg.rxb) {
            res.data.msg.rxb = parseFloat(res.data.msg.rxb).toFixed(2);
          }
          if (res.data.msg.freeze) {
            res.data.msg.freeze = parseFloat(res.data.msg.freeze).toFixed(2);
          }
          that.uinfo = res.data.msg;
          that.msg1 = res.data.msg.wallet;
        });
    },
    getlist() {
      var loadingInstance = Loading.service({
        target: document.getElementsByClassName("tab")[0],
        background: "rgba(0,0,0,0.7)"
      });
      let that = this;
      that
        .$http({
          url: "/zhitui",
          method: "get",
          params: {
            id: $.cookie("id"),
            page: that.page
          }
        })
        .then(function(res) {
          loadingInstance.close();
          if (res.data.code != -1) {
            that.list = res.data.msg;
            that.sum = that.num[0];
          } else {
            that.list = "";
            that.sum = 0;
          }
        });
    },
    getlist1() {
      var loadingInstance = Loading.service({
        target: document.getElementsByClassName("tab")[0],
        background: "rgba(0,0,0,0.7)"
      });
      let that = this;
      that
        .$http({
          url: "/team",
          method: "get",
          params: {
            id: $.cookie("id"),
            page: that.page
          }
        })
        .then(function(res) {
          loadingInstance.close();
          that.list = res.data.msg;
          that.sum = that.num[1];
        });
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
    onCopy1(e) {
      let that = this;
      that.$message({
        message: "已成功复制我的钱包地址至剪切板！",
        type: "success",
        duration: 1500
      });
    },
    onError1(e) {
      that.$message({
        message: "复制失败！",
        type: "error",
        duration: 1000
      });
    },
    init: function() {
      let url =
        "../../static/overtrue-share.js-a62713a/dist/js/social-share.min.js";
      let script = document.createElement("script");
      script.setAttribute("src", url);
      document.getElementsByTagName("head")[0].appendChild(script);
    },
    handpage(i) {
      let that = this;
      that.page = i;
      if (that.nid1 == 1) {
        that.getlist();
      } else {
        that.getlist1();
      }
    }
  }
};
</script>
<style scoped>
.mine {
  padding-top: 80px;
  background: url("../assets/bg1.png") no-repeat;
  background-origin: content-box;
  width: 100%;
  min-width: 750px;
  min-height: 930px;
  background-size: 100% 100%;
  background-color: #27292e;
  overflow: hidden;
}
.con {
  width: 66%;
  margin: 120px auto 0;
  max-width: 850px;
}
.left {
  min-height: 620px;
  padding-top: 30px;
  width: 28%;
  background: white;
  box-shadow: 0px 0px 20px 1px whitesmoke;
}
.left li {
  width: 70%;
  margin: 0 auto;
  line-height: 60px;
  font-size: 24px;
  margin-top: 10px;
}
.left .se {
  color: white;
  font-weight: 700;
  background-color: #d5af7b;
}
.right {
  min-height: 650px;
  width: 70%;
}
.top {
  height: 100px;
  background: white;
  box-shadow: 0px 0px 20px 1px whitesmoke;
  font-size: 20px;
  padding: 30px 0 30px;
}
.topc {
  width: 94%;
  margin: 0 auto;
}
.header img {
  width: 90%;
  height: 90%;
}
.header {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
}
.info {
  margin-left: 30px;
}
.info p,
.oo p {
  line-height: 50px;
}
.ml000 {
  margin-left: 20px;
}
.oo img {
  vertical-align: middle;
}
.bot {
  background: white;
  box-shadow: 0px 0px 20px 1px whitesmoke;
  margin-top: 20px;
  font-size: 20px;
  margin-bottom: 20px;
}
.team {
  width: 86%;
  margin: 0 auto;
  min-height: 400px;
  padding-bottom: 20px;
}
.myteam {
  font-weight: 700;
  background: #28292d;
}
.myteam p {
  width: 86%;
  margin: 0 auto;
  line-height: 50px;
}
.lh {
  line-height: 40px;
}
.lh000 {
  line-height: 60px;
}
.tab {
  border: 1px solid #28292d;
}
.tabt {
  line-height: 40px;
}
.tabt span {
  background: #7e7f83;
  color: white;
}
.tabt .select {
  background: white;
  font-weight: 700;
  color: #2c3e50;
}
.mem li {
  line-height: 50px;
  position: relative;
}
.bot2 {
  padding: 30px 4% 30px;
  min-height: 410px;
}
.bot2 .d-flex {
  font-size: 18px;
  padding: 0 16px 0;
  line-height: 40px;
  border-bottom: 1px solid #3e4145;
}
.bot2 .xx span:last-child span {
  border: 1px solid black;
  padding: 1px 2px 1px;
  border-radius: 18px;
}
.bot2 .d-flex span:last-child .ss {
  color: #999;
  border-color: #999;
}
.bot1 {
  padding: 10px 4% 30px;
  font-size: 18px;
  min-height: 430px;
}
.bot1 p {
  line-height: 40px;
}
.btn1 {
  padding: 2px 6px 2px;
  background: #d5af7b;
  border-radius: 4px;
  color: white;
}
.btn2 {
  width: 320px;
  line-height: 40px;
  text-align: center;
  color: white;
  background: #d5af7b;
  border-radius: 6px;
  margin: 30px auto 0;
}
.bot2 .assets {
  font-size: 16px;
  padding-left: 20px;
}
.assets p:first-child {
  margin-top: 4px;
}
.assets p:nth-child(2) {
  margin-top: 14px;
}
.bot2 .as000 {
  font-size: 12px;
}
.fca {
  color: #c6162f;
  font-weight: 700;
  font-size: 20px;
}
.fcb {
  color: #ca2b41;
}
.fcbb {
  float: right;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 120px;
}
.rl {
  border-right: 1px solid #ca1e39;
  padding: 0 20px 0;
}
.rl p:nth-child(2) {
  margin-top: 10px;
}
.bot2 .zc {
  padding-bottom: 20px;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 30px;
  overflow: hidden;
}
.btn0 {
  padding: 1px 4px 1px;
  background: #d5af7b;
  border-radius: 4px;
  color: white;
  margin-left: 4px;
}
.name {
  max-width: 98px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.tipname {
  display: none;
  position: absolute;
  left: 20%;
  top: -4px;
  font-size: 14px;
  line-height: 20px;
  padding: 0 4px 0;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
@media screen and (max-width: 1220px) {
  .assets p:first-child {
    margin-top: 1px;
  }
  .assets p:nth-child(2) {
    margin-top: 12px;
  }
  .rl {
    padding: 0;
    padding-right: 6px;
  }
  .bot2 .assets {
    padding-left: 6px;
  }
  .topc {
    font-size: 16px;
  }
  .info {
    margin-left: 10px;
  }
  .ml000 {
    margin-left: 10px;
  }
  .oo img {
    width: 26px;
  }
  .header {
    width: 76px;
    height: 76px;
    margin-top: 20px;
  }
  .mem {
    font-size: 16px;
  }
  .left li {
    font-size: 20px;
    line-height: 40px;
  }
  .bot2 .d-flex {
    font-size: 16px;
  }
  .bot {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .bot1 {
    font-size: 14px;
  }
  .btn1 {
    display: block;
    width: 40px;
    line-height: 24px;
    margin: 0 auto;
  }
  .fca {
    font-size: 18px;
  }
  .name {
    max-width: 46px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media screen and (max-width: 970px) {
  .btn1 {
    display: block;
    width: 50px;
    line-height: 20px;
    margin: 0 auto;
  }
  .name {
    max-width: 46px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ff {
    font-size: 18px;
    font-weight: 700;
  }
}

@media screen and (max-width: 500px) {
  .mine {
    width: 100%;
    min-width: 0;
    padding-top: 1.4rem;
    min-height: 0;
  }
  .con {
    margin-top: 20px;
    width: 96%;
  }
  .left {
    float: none;
    width: 100%;
    min-height: 0;
    padding-top: 0;
  }
  .left ul {
    display: flex;
    padding: 4px 2% 4px;
    box-sizing: border-box;
  }
  .left ul li {
    flex: 1;
    margin-top: 0;
    font-size: 0.38rem;
  }
  .right {
    width: 100%;
    margin-top: 10px;
    min-height: 500px;
  }
  .top {
    padding: 4px 2% 4px;
    height: 88px;
  }
  .topc {
    width: 100%;
    font-size: 0.34rem;
  }
  .info {
    margin-left: 6px;
  }
  .header {
    margin-top: 10px;
  }
  .info p,
  .oo p {
    line-height: 40px;
  }
  .oo img {
    width: 20px;
  }
  .bot {
    font-size: 0.34rem;
    min-height: 0;
  }
  .bot2 .d-flex {
    font-size: 0.34rem;
  }
  .myteam p {
    line-height: 40px;
  }
  .team {
    width: 96%;
    min-height: 0;
  }
  .lh000 {
    line-height: 30px;
  }
  .tabt {
    line-height: 34px;
  }
  .mem {
    font-size: 0.28rem;
  }
  .mem li {
    line-height: 36px;
  }
  .rl {
    border: 0;
    padding: 0;
  }
  .bot2 {
    padding-top: 10px;
  }
  .bot2 .assets {
    padding: 0;
    max-width: 320px;
    font-size: 0.4rem;
    clear: both;
  }
  .rl p {
    display: inline-block;
  }
  .rl p:first-child {
    font-size: 0.4rem;
  }
  .rl p:nth-child(2) {
    margin: 0;
  }
  .rl p:first-child:after {
    content: "：";
  }
  .assets p:nth-child(2) {
    margin-top: 0;
  }
  .rl p,
  .assets p {
    margin-top: 6px !important;
  }
  .bot2 .zc {
    margin-bottom: 10px;
  }
  .fcbb {
    float: right;
    line-height: 0.6rem;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn0 {
    padding: 0 6px 0;
  }
  .tipname {
    font-size: 0.34rem;
    top: -8px;
  }
  .name{
    max-width: 1.8rem;
  }
}
</style>
 