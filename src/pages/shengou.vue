<template>
    <div class="sg">
        <div class="top"></div>
        <div class="con">
            <p class="lh fs111">充值直通车</p>
            <p class="ma lh">钱包地址：<span class="ma000">{{msg}}</span>
            <span v-if="msg" class="btn1 cp" v-clipboard:copy="msg" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
            </p>
        </div>
        <p class="line"></p>
        <p class="lh fs111">上传支付凭证：</p>
        <div class="shot">
            <p v-if="!data1" class="fc1 tal">示例</p>
            <div class="hh">
            <div class="shili fl mt10" v-if="!data1">
              <img :src="path" alt="">
            </div>
            <div class="imgArea mt10" :class="{fr:!data1,ma111:data1}">
              <div class="imgs">
                  <div class="ddd">
                      <div class="f-div">
                        <!-- <span class="jia"> -->
                            <span class="h"></span>
                            <span class="s"></span>
                        <!-- </span> -->
                            <img v-if="data1 != ''" :src="data1||''" >
                            <input :disabled="data1!=''" type="file" id="pay" @change="pushImg($event)" accept="image/jpeg,image/png,image/gif" alt="">
                            <span class="clear" v-if="data1 != ''" @click="delImg($event)">
                              <span class="vux-close"></span>
                            </span>
                      </div>
                  </div>
              </div>
          </div>
            </div>

            <p class="btn1 btn2 mt20 cp" @click="sub">立即提交</p>
        </div>
        <div class="list"  v-if="list">
        <p class="tal lh"> <span class="bb">充值详情</span> </p>
        <p class="d-flex tt">
            <span class="flex2">时间</span>
            <span class="flex1">方式</span>
            <span class="flex1">类别</span>
            <span class="flex1">金额</span>
            <span class="flex1">备注</span>
        </p>
        <p class="d-flex cc" v-for="(item,index) in list">
            <span class="flex2 lh">{{item.time}}</span>
            <span class="flex1 lh">{{item.type}}</span>
            <span class="flex1 lh">{{item.status}}</span>
            <span class="flex1 lh">
              <span>$</span>
              {{item.recharge}}</span>
            <span class="flex1 lh">{{item.ps}}</span>
        </p>
        </div>
    </div>
</template>
<script>
import { Loading } from "element-ui";
import $ from "jquery";
export default {
  data() {
    return {
      msg: "",
      data1: "",
      urll: "",
      list: "",
      path: "",
      bg: ""
    };
  },
  mounted() {
    let that = this;

    that.setname("shengou");
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
        that.bg = "http://" + res.data.msg.shengou;
        $(".top").css("background-image", "url(" + that.bg + ")");
      });
    that
      .$http({
        url: "/web",
        method: "get",
        params: {}
      })
      .then(function(res) {
        that.msg = res.data.msg[0].web;
        that.path = "http://ccsserve.qilinpz.com/" + res.data.msg[0].path;
      });
    that
      .$http({
        url: "/index",
        method: "get",
        params: {
          id: $.cookie("id")
        }
      })
      .then(function(res) {
        if (res.data.code != -1) {
          that.list = res.data.msg;
        } else {
          that.list = "";
        }
      });
  },
  methods: {
    onCopy(e) {
      let that = this;
      that.$message({
        message: "已成功复制我的钱包地址至剪切板！",
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
    pushImg: function(e) {
      var that = this;
      let mm = this.mmm,
        file = e.target,
        reader = new FileReader();
      reader.readAsDataURL(file.files[0]);
      if (file.files[0].size > 10 * 1024 * 1024) {
        that.$message({
          message: "请上传小于10M的截图！",
          type: "error",
          duration: 1000
        });
      } else {
        var loadingInstance = Loading.service({
          target: document.getElementsByClassName("imgs")[0],
          background: "rgba(0,0,0,0.7)"
        });
        reader.onload = function() {
          that.data1 = this.result;
          var image = new FormData();
          image.append("image", e.target.files[0]);
          that
            .$http({
              url: "/file",
              method: "post",
              data: image
            })
            .then(function(res) {
              loadingInstance.close();
              that.urll = res.data.data;
            });
        };
      }
    },
    delImg: function(e) {
      this.data1 = "";
      let dom = document.getElementById("pay");
      dom.value = "";
    },
    sub() {
      let that = this;
      if (that.data1) {
        that
          .$http({
            url: "/add",
            method: "get",
            params: {
              id: $.cookie("id"),
              path: that.urll
            }
          })
          .then(function(res) {
            if (res.data.code == 0) {
              that.$message({
                message: "上传成功，请等待审核！",
                type: "success",
                duration: 2000
              });
              that.data1 = "";
            } else {
              that.$message({
                message: "上传失败！",
                type: "error",
                duration: 1000
              });
            }
          });
      } else {
        that.$message({
          message: "上传失败！",
          type: "error",
          duration: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
.ma111 {
  float: none;
  margin: 0 auto;
}
.sg {
  width: 100%;
  min-width: 750px;
  min-height: 930px;
  overflow: hidden;
  padding-bottom: 10px;
  background: white;
}
.top {
  height: 400px;
  padding-top: 80px;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: #27292e;
}
.con {
  width: 66%;
  margin: 0 auto;
  background: white;
}
.con p:first-child {
  line-height: 60px;
}
.line {
  width: 66%;
  margin: 0 auto;
  border-bottom: 2px solid #ccc;
  min-width: 750px;
}
.ma {
  margin: 0 0 20px;
  font-size: 20px;
}
.btn1 {
  display: inline-block;
  padding: 2px 6px 2px;
  background: #d5af7b;
  border-radius: 4px;
  color: white;
  line-height: 26px;
}
.lh {
  line-height: 50px;
}
.fs111 {
  font-size: 22px;
  font-weight: 700;
}
.shot,
.list {
  font-size: 18px;
}
.shot {
  width: 520px;
  margin: 0 auto;
}
.list {
  width: 50%;
  max-width: 950px;
  min-width: 530px;
  margin: 0 auto 50px;
}
.list p:first-child {
  font-size: 20px;
  font-weight: 700;
}
.list p:nth-child(2) {
  font-size: 18px;
  line-height: 40px;
}
.imgArea img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.imgArea input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.h {
  position: absolute;
  width: 50%;
  left: 25%;
  top: 50%;
  border-bottom: 1px solid #ccc;
}
.s {
  position: absolute;
  height: 20%;
  border-left: 1px solid #ccc;
  left: 50%;
  top: 56%;
  margin-top: -25%;
}
.imgArea .clear {
  font-size: 16px;
  color: orangered;
  position: absolute;
  right: -10px;
  top: -24px;
  cursor: pointer;
}

.f-div {
  position: relative;
  border: 1px solid #ccc;
  height: 400px;
}
.ti {
  text-indent: 60px;
  margin: 10px 0 10px;
}
.bb {
  border-bottom: 1px solid #28292d;
}
.tt {
  color: white;
  background: #28292d;
  line-height: 30px;
}
.cc {
  font-size: 14px;
  border: 1px solid #28292d;
  border-top: 0;
}
.btn2 {
  width: 20%;
}
.cc .flex1:nth-child(2),
.tt .flex1:nth-child(2) {
  flex: 1.4;
}
.ma000 {
  margin: 0 10px 0;
}
.imgArea,
.shili {
  width: 250px;
}
.shili {
  border: 1px solid #ccc;
  height: 400px;
}
.shili img {
  width: 250px;
  height: 400px;
  vertical-align: top;
}
@media screen and (max-width: 500px) {
  .sg {
    width: 100%;
    min-width: 0;
    min-height: 0;
  }
  .top {
    padding-top: 1.4rem;
    height: 150px;
  }
  .con {
    width: 96%;
  }
  .line {
    min-width: 0;
    width: 96%;
    border-bottom: 1px solid #ccc;
  }
  .fs111 {
    font-size: 0.4rem;
  }
  .ma {
    font-size: 0.36rem;
  }
  .con p:first-child {
    line-height: 0.4rem;
    margin-top: 6px;
    font-size: 0.46rem;
  }
  .lh {
    line-height: 0.7rem;
  }
  .ma {
    margin-bottom: 6px;
  }
  .shot {
    font-size: 0.4rem;
    width: 90%;
  }
  .imgArea {
    margin-top: 2px;
  }
  .f-div {
    height: 200px;
  }
  .h {
    width: 18%;
    left: 41%;
  }
  .s {
    height: 30px;
    top: 86px;
    margin-top: 0;
  }
  .imgArea .clear {
    top: -24px;
  }
  .list {
    width: 96%;
    min-width: 0;
  }
  .list p:first-child {
    line-height: 0.8rem;
    font-size: 0.4rem;
    font-weight: 700;
  }
  .list p:nth-child(2) {
    line-height: 0.8rem;
    font-size: 0.38rem;
  }
  .cc {
    font-size: 0.3rem;
  }
  .tt {
    font-size: 0.34rem;
  }
  .cc span:nth-child(1),
  .tt span:nth-child(1) {
    flex: 3;
  }
  .cc .flex1:nth-child(2),
  .tt .flex1:nth-child(2) {
    flex: 1.4;
  }
  .shili,
  .imgArea {
    width: 48%;
    height: 200px;
  }
  .shili {
    margin-top: 2px;
  }
  .shili img {
    width: 100%;
    height: 100%;
  }
  .hh {
    height: 202px;
  }
  .btn2 {
    display: block !important;
    margin: 20px auto 0;
  }
  .ma000{
    display: inline-block;
    vertical-align: middle;
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
}
</style>
