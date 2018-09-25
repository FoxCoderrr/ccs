<template>
    <div class="bn">
        <div class="bot d-flex">
            <div class="flex1 tac gz">
                <div class="gzdiv">
                <p>pay attention to us</p>
                <p class="d-flex">
                    <span class="flex1 tal">
                        <img src="../assets/QQ.png" alt="">
                    </span>
                    <span class="flex1 tac">
                        <img src="../assets/WX.png" alt="">
                    </span>
                    <span class="flex1 tar">
                        <img src="../assets/WB.png" alt="">
                    </span>
                </p>
                </div>
            </div>
        </div>
        <p class="mt30 icp">Copyright Beijing ICP15018158 SNC Co.Ltd. All Rights Reserved</p>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.bn {
  width: 100%;
  height: 160px;
  padding-top: 40px;
  background-color: #27292e;
  color: #ddb47d;
}
.bot {
  width: 66%;
  min-width: 610px;
  margin: 0 auto;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddb47d;
}
.bn div p {
  font-size: 16px;
  line-height: 34px;
  cursor: pointer;
}
.bn div p:first-child {
  font-size: 20px;
  letter-spacing: 4px;
  margin-bottom: 6px;
}
.ml000 {
  margin-left: 10px;
}
.fs000 {
  font-size: 26px;
}
.flex1 img {
  width: 34px;
}
.gzdiv {
  display: inline-block;
}
@media screen and (max-width: 1400px) {
  .bn .fs000 {
    font-size: 18px;
  }
  .bn .flex1 p,
  .bn .flex111 p {
    font-size: 18px;
  }
  .bn .flex1 p:first-child,
  .bn .flex111 p:first-child {
    font-size: 18px;
  }
  .flex1 img {
  width: 30px;
}
}
@media screen and (max-width: 1090px) {
  .bn .fs000 {
    font-size: 16px;
  }
  .bn .flex1 p,
  .bn .flex111 p {
    font-size: 12px;
  }
  .bn .flex1 p:first-child,
  .bn .flex111 p:first-child {
    font-size: 16px;
  }
  .flex1 img {
    width: 26px;
  }
}
@media screen and (max-width: 500px) {
  .bot {
    width: 94%;
    min-width: 0;
    padding-bottom: 10px;
  }
  .bn {
    padding-top: 10px;
    height: 120px;
  }
  .bot div:nth-child(4) {
    flex: none;
    position: absolute;
    bottom: 50px;
    left: 9%;
    text-align: left;
  }
  .bot div:nth-child(5) {
    flex: none;
    position: absolute;
    bottom: 50px;
    right: 9%;
  }
  .bn .flex1 p:first-child {
    font-size: 0.36rem;
    letter-spacing: 0px;
  }
  .bn div p {
    line-height: 30px;
  }
  .mt30 {
    margin-top: 10px;
  }
  .bn .fs000 {
    font-size: 0.38rem;
  }
  .flex1 img {
    vertical-align: sub;
    width: 0.6rem;
  }
  .icp{
    font-size: 0.2rem;
  }
}
</style>

