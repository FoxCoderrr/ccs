<template>
    <div class="tn ovh">
        <div class="top">
            <div class="fl lg">
                <img class="fl" src="../assets/pclogo.png" alt=""><span class="fl lang">中文版</span>
            </div>
            <div class="nav fr">
                <ul class="d-flex">
                    <router-link tag="li" class="flex1 tar" :to="{name:'entry'}">
                        <span @click="lefun">{{msg}}</span>
                    </router-link>
                    <router-link tag="li" class="flex1 tar" :to="{name:'shengou'}">
                        <span>我要申购</span>
                    </router-link>
                    <router-link tag="li" class="flex1 tar" :to="{name:'tuiguang'}">
                        <span>我要推广</span>
                    </router-link>
                    <router-link tag="li" class="flex1 tar" :to="{name:'mine'}">
                        <span>我的账户</span>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from "../../event.js";
import $ from "jquery";
export default {
  data() {
    return {
      nid: "1",
      msg: "登录/注册"
    };
  },
  mounted() {
    let that = this;
    if ($.cookie("id")) {
      that.msg = "退出登录";
    } else {
      that.msg = "登录/注册";
    }
    Bus.$on("change", e => {
      if (e) {
        that.msg = "退出登录";
      } else {
        that.msg = "登录/注册";
      }
    });

  function IsPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
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
      $(".lang").html("CN");
    }

  },
  methods: {
    lefun() {
      let that = this;
      if ($.cookie("id")) {
        this.$confirm("确定要退出登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            that.msg = "登录/注册";
            $.cookie("id", "");
            that.$router.push({
              name: "entry"
            });
          })
          .catch(() => {
          });
      }
    }
  }
};
</script>
<style scoped>
.tn {
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  padding-top: 20px;
  background-color: rgba(255, 255, 255, 0.1);
}
.lang{
  color: #f5f6f8;
  font-size: 15px;
  line-height: 46px;
}
.tn1 {
  background-color: #27292e;
}
.top {
  width: 66%;
  min-width: 750px;
  margin: 0 auto;
}
.top img {
  width: 130px;
  height: 90px;
  margin-top: -22px;
}
.nav {
  width: 46%;
  color: white;
}
.nav li {
  min-width: 82px;
}
.nav span {
  padding-bottom: 4px;
  line-height: 36px;
  font-size: 19px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.router-link-exact-active span {
  color: #d5af7b;
  font-weight: 700;
  border-bottom: 2px solid #d5af7b;
}
@media screen and (max-width: 1200px) {
  .nav span {
    font-size: 18px;
  }
}
@media screen and (max-width: 500px) {
  .tn {
    height: 1.4rem;
    line-height: 0.8rem;
    padding: 0.2rem 2% 0;
    box-sizing: border-box;
  }
  .nav li {
    min-width: 0;
  }
  .top img {
    width: 2.2rem;
    height: 1.4rem;
    margin-top: 0;
    position: absolute;
    left: 4%;
    top: 0;
  }
  .lang{
    position: absolute;
    left: 1%;
    top: 6%;
    font-size: 0.3rem;
    line-height: 0.4rem;
  }
  .top {
    width: 96%;
    min-width: 0;
  }
  .nav {
    width: 74%;
  }
  .nav span {
    font-size: 0.34rem;
  }
}
</style>

