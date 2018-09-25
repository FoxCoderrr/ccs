<template>
    <div class="entry">
      <div class="form ovh">
        <div class="con fr">
          <div class="d-flex title">
            <p class="flex1 cp" :class="{select:nid!=1}" @click="navtap(1)">登录</p>
            <p class="flex1 cp" :class="{select:nid!=2}" @click="navtap(2)">注册</p>
          </div>
          <div v-if="nid==1" class="login">
            <div class="ipt">
              <div class="aaa">
                <p class="fl pimg">
                  <img src="../assets/c.png" alt="">
                </p>
                <input type="text" v-model="lphone" placeholder="请输入用户名/手机号">
              </div>
              <div class="aaa">
                <p class="fl pimg">
                  <img src="../assets/b.png" alt="">
                </p>
                <input type="password" v-model="lpwd" placeholder="请输入登录密码">
              </div>
              <div class="yzm aaa">
                <p class="fr cp">
                  <s-identify :identifyCode="identifyCode" @refreshcode="getIcode"></s-identify>
                </p>
                <input type="text cinput" placeholder="请输入图形验证码" v-model="usercode">
              </div>
            </div>
            <div class="tip d-flex aaa">
              <p class="flex1 tal">
                <el-checkbox text-color="#d5af7b" v-model="checked" @change="rempwd"></el-checkbox>
                <span class="cp" :class="{rem:checked}" @click="label">记住用户名</span>
              </p>
              <p class="flex1 tar cp">忘记密码？</p>
            </div>
            <p class="btn cp llog" @click="log">登录</p>
            <p class="tore cp mt30" @click="navtap(2)">还没有账号？立即去注册！</p>
          </div>
          <div v-if="nid==2" class="reg">
            <div class="ipt">
              <div class="aaa">
                <p class="fl pimg">
                  <img src="../assets/nc.png" alt="">
                </p>
                <input type="text" v-model="rname" placeholder="请输入昵称" >
              </div class="aaa">
              <div class="aaa">
                <p class="fl pimg">
                  <img src="../assets/c.png" alt="">
                </p>
                <input type="text" v-model="rphone" placeholder="请输入手机号" >
              </div class="aaa">
              <div class="prl aaa">
                <p class="fl pimg">
                  <img src="../assets/d.png" alt="">
                </p>
                <input type="text" v-model="code" placeholder="请输入验证码">
                <span class="gcode" :class="{gcode1:btnmsg!='获取验证码',cp:btnmsg=='获取验证码'}" @click="getcode">{{btnmsg}}</span>
              </div>
              <div class="aaa">
                <p class="fl pimg">
                  <img src="../assets/b.png" alt="">
                </p>
                <input type="password" v-model="rpwd" placeholder="登录密码(至少6位数字或字母)">
              </div>
              <div class="aaa">
                <p class="fl pimg">
                  <img src="../assets/b.png" alt="">
                </p>
                <input type="password" v-model="rpwd1" placeholder="安全密码(6位数字)">
              </div>
              <div class="aaa">
                <p class="fl pimg pimg000">
                  <img src="../assets/e.png" alt="">
                </p>
                <input type="text" v-model="yqm" placeholder="推荐人手机号/邀请码">
              </div>
            </div>
            <p class="btn rbtn cp ssub"  @click="sub">提交</p>
            <p class="tore cp mt30" @click="navtap(1)">已账号？直接登录！</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import SIdentify from "../components/icode";
import Bus from "../../event.js";
import $ from "jquery";
export default {
  data() {
    return {
      nid: 1,
      yqm: "",
      lphone: "",
      lpwd: "",
      usercode: "",
      checked: false,
      rphone: "",
      rpwd: "",
      btnmsg: "获取验证码",
      time: 60,
      code: "",
      ccode: "",
      identifyCodes: "123456789",
      identifyCode: "",
      rname: ""
    };
  },
  mounted() {
    let that = this;
    $(document).keyup(function(event) {
      if (event.keyCode == 13 && that.nid == 1) {
        $(".llog").trigger("click");
      } else if (event.keyCode == 13 && that.nid == 2) {
        $(".ssub").trigger("click");
      }
    });
    if ($.cookie("id")) {
      that.$router.push({
        name: that.name
      });
    }
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.href
        .split("?")[1]
        .toString()
        .match(reg);
      if (r != null) return r[2];
      return "";
    }
    if (window.localStorage.getItem("if")) {
      that.checked = Boolean(window.localStorage.getItem("if"));
    }
    if (window.localStorage.getItem("phone")) {
      that.lphone = window.localStorage.getItem("phone");
    }
    if (window.location.href.split("?").length > 1) {
      that.nid = 2;
      that.yqm = getQueryString("yqm");
      // function IsPC() {
      //   let userAgentInfo = navigator.userAgent;
      //   let Agents = [
      //     "Android",
      //     "iPhone",
      //     "SymbianOS",
      //     "Windows Phone",
      //     "iPad",
      //     "iPod"
      //   ];
      //   let flag = true;
      //   for (let v = 0; v < Agents.length; v++) {
      //     if (userAgentInfo.indexOf(Agents[v]) > 0) {
      //       flag = false;
      //       break;
      //     }
      //   }
      //   return flag;
      // }
      // if(!IsPC()){
      //   let x = "http://ccsapp.qilinpz.com/#?yqm="+that.yqm;
      //   window.location.href = x;
      // }
    }
    this.getIcode();
  },
  methods: {
    navtap(i) {
      this.nid = i;
    },
    rempwd() {},
    label() {
      this.checked = !this.checked;
    },
    getIcode() {
      this.usercode = "";
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    log() {
      let that = this;
      if (that.lphone != "" && that.lpwd != "" && that.usercode != "") {
        let reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (reg1.test(that.lphone)) {
          if (that.usercode != that.identifyCode) {
            that.$message({
              message: "验证码输入错误！",
              type: "error",
              duration: 1000
            });
            that.refreshCode();
            that.usercode = "";
          } else {
            const loading = this.$loading({
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            that
              .$http({
                url: "/login",
                method: "post",
                data: {
                  phone: that.lphone,
                  password: that.lpwd
                }
              })
              .then(function(res) {
                loading.close();
                if (res.data.id) {
                  that.$message({
                    message: "登录成功！",
                    type: "success",
                    duration: 1000
                  });
                  Bus.$emit("change", 1);
                  that.$router.push({
                    name: "mine"
                  });
                  $.cookie("id", res.data.id);
                  $.cookie("tjm", res.data.link);
                  window.localStorage.setItem("if", that.checked);
                  if (that.checked) {
                    window.localStorage.setItem("phone", that.lphone);
                  }
                } else if (res.data.code == -1) {
                  that.$message({
                    message: "密码输入错误！",
                    type: "error",
                    duration: 1500
                  });
                } else if (res.data.code == -2) {
                  that.$message({
                    message: "用户名不存在！",
                    type: "error",
                    duration: 1500
                  });
                }
              });
          }
        } else {
          that.$message({
            message: "请输入正确的手机号！",
            type: "error",
            duration: 1500
          });
        }
      } else {
        that.$message({
          message: "请输入完整信息！",
          type: "error",
          duration: 1000
        });
      }
    },
    sub() {
      let that = this;
      let reg = /^[a-zA-Z0-9]{6,30}$/;
      let reg1 = /^[0-9]{6}$/;
      if (
        that.rname != "" &&
        that.rphone != "" &&
        that.rpwd != "" &&
        that.rpwd1 != "" &&
        that.code != null &&
        that.tjm != ""
      ) {
        if (reg.test(that.rpwd) && reg1.test(that.rpwd1)) {
          if (that.code != that.ccode) {
            that.$message({
              message: "请输入有效的验证码！",
              type: "error",
              duration: 1000
            });
          } else {
            const loading = this.$loading({
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            console.log(that.yqm);
            that
              .$http({
                url: "/insert",
                method: "post",
                data: {
                  name: that.rname,
                  phone: that.rphone,
                  password: that.rpwd,
                  paypwd: that.rpwd1,
                  links: that.yqm,
                  yzm: that.code
                }
              })
              .then(function(res) {
                loading.close();
                if (res.data.code == 0) {
                  that.$message({
                    message: "注册成功！",
                    type: "success",
                    duration: 1500
                  });
                  that.nid = 1;
                } else if (res.data.code == -1) {
                  that.$message({
                    message: "该账户已被注册过！",
                    type: "error",
                    duration: 1500
                  });
                } else if (res.data.code == -2) {
                  that.$message({
                    message: "邀请码不存在！",
                    type: "error",
                    duration: 1500
                  });
                } else if (res.data.code == -3) {
                  that.$message({
                    message: "请输入有效的验证码！",
                    type: "error",
                    duration: 1500
                  });
                } else if (res.data.code == -4) {
                  that.$message({
                    message: "昵称已存在！",
                    type: "error",
                    duration: 1500
                  });
                }
              });
          }
        }else{
        that.$message({
          message: "密码格式错误！",
          type: "error",
          duration: 1000
        });
        }
      } else {
        that.$message({
          message: "请输入完整信息！",
          type: "error",
          duration: 1000
        });
      }
    },
    getcode() {
      let that = this;
      let reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (that.btnmsg == "获取验证码" && reg1.test(that.rphone)) {
        that
          .$http({
            url: "/yzm",
            method: "get",
            params: {
              phone: that.rphone
            }
          })
          .then(function(res) {
            console.log(res.data.yzm);
            that.ccode = res.data.yzm;
            that.code = res.data.yzm;
          });
        that.btnmsg = that.time + "秒后重新发送";
        window.t0 = setInterval(function() {
          if (that.time == 0) {
            that.time = 60;
            that.btnmsg = "获取验证码";
            clearInterval(window.t0);
          } else {
            that.time--;
            that.btnmsg = that.time + "秒后重新发送";
          }
        }, 1000);
      } else if (that.btnmsg != "获取验证码" && reg1.test(that.rphone)) {
      } else {
        that.$message({
          message: "请输入正确的手机号！",
          type: "error",
          duration: 1000
        });
      }
    }
  },
  components: {
    SIdentify
  }
};
</script>
<style scoped>
.entry {
  width: 100%;
  min-width: 750px;
  height: 930px;
  background: url("../assets/bg0.png");
  background-size: 100% 100%;
  z-index: -1;
}
.title {
  line-height: 56px;
}
.title p {
  font-weight: 700;
}
.title .select {
  font-weight: 700 !important;
  background-color: rgba(255, 255, 255, 0.5);
}
.form {
  width: 66%;
  margin: 0 auto;
  padding-top: 180px;
  font-size: 16px;
}
.con {
  width: 490px;
  border: 1px solid white;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  padding-bottom: 60px;
}
input {
  background: transparent;
  line-height: 40px;
  width: 260px;
  color: white;
}
.yzm input {
  width: 50%;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #a3b0b4;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #a3b0b4;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #a3b0b4;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #a3b0b4;
}
.ipt .aaa {
  background-color: rgba(255, 255, 255, 0.2);
  width: 66%;
  margin: 30px auto 0;
  border: 1px solid white;
}
.ipt .aaa:first-child {
  margin-top: 50px;
}
.pimg {
  width: 40px;
  height: 34px;
  background-color: rgba(255, 255, 255, 0.5);
  padding-top: 6px;
}
.tip {
  width: 66%;
  margin: 20px auto 0;
  color: #a3b0b4;
}
.tip .rem {
  color: white;
}
.btn {
  width: 66%;
  margin: 16px auto 0;
  background: #7d0100;
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
}
.rbtn {
  margin-top: 30px;
}
.tore {
  color: #cfd2d4;
}
.prl {
  position: relative;
}
.gcode {
  position: absolute;
  right: 4px;
  line-height: 40px;
  font-size: 14px;
}
.gcode1 {
  color: #a3b0b4;
}
.pimg000 {
  padding-top: 10px;
  height: 30px;
}
@media screen and (max-width: 500px) {
  .entry {
    width: 100%;
    min-width: 0;
    height: 560px;
  }
  .form {
    width: 94%;
    font-size: 0.34rem;
    padding-top: 80px;
  }
  .con {
    width: 100%;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  .title {
    line-height: 1rem;
  }
  .login {
    font-size: 0.34rem;
  }
  .ipt .aaa {
    margin-top: 10px;
    width: 84%;
  }
  .ipt .aaa:first-child {
    margin-top: 20px;
  }
  input {
    width: 80%;
  }
}
</style>
