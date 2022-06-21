<template>
  <div v-if="loading">
    <div class="wecome">
      <img src="/img/logo144.png" alt class="logo-center">
      <div class="wecome-tit">
        <!-- <span>欢迎使用</span> -->
        <!-- <p>瑞盈指数游戏</p> -->
        <p>{{ $t('login.company') }}</p>
        <div class="loading">Loading...</div>
      </div>
    </div>
  </div>
  <!-- <div class="loading-page" v-if="loading">
    <p>Loading...</p>
    <img src="/img/logo512.png" alt>
  </div>-->
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  },
  mounted() {
    // this.$nuxt.$loading.start();
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  }
};
</script>

<style scoped>
.logo-center {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.centerv {
  position: relative;
  top: 50%;
}
.wecome {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: none;
  background: linear-gradient(
    135deg,
    rgba(72, 70, 64, 1) 0%,
    rgba(30, 27, 26, 1) 100%
  );

  z-index: 9999;
}
.wecome-tit span {
  display: block;
  margin-top: 140px;
  font-size: 24px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  line-height: 33px;
  /* -webkit-text-stroke: 1px rgba(151, 151, 151, 1);
  text-stroke: 1px rgba(151, 151, 151, 1); */
}
.wecome-tit p {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 161, 0, 1);
  line-height: 50px;
  /* text-shadow: 0px 0px 20px rgba(255, 189, 0, 0.3);
  -webkit-text-stroke: 1px rgba(151, 151, 151, 1);
  text-stroke: 1px rgba(151, 151, 151, 1); */
}
.wecome-tit {
  position: absolute;
  width: 100%;
  bottom: 1%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  text-align: center;
}
.wecome-tit span {
  margin-top: 0;
}
.loading {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  /* margin-left: 200px; */
  margin-top: 5px;
  color: rgba(255, 161, 0, 1);
}
</style>