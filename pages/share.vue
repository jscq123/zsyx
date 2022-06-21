<template>
  <el-container direction="vertical">
    <div id="captureId" class="capture" v-show="firstFlag">
      <div class="share-icon"><img src="/img/share.jpg" /></div>
      <div class="f-15">{{ $t("share.earning") }}（USDT）</div>
      <div class="c-green f-48"><span v-if="earning>0">+</span>{{ earning | fix2 }}</div>
      <el-row class="settlement-info">
        <el-col>
          <div>{{ $t("share.settlement") }}</div>
          <div class="pt-10 f-16">{{ settlement | fix4 }}</div>
        </el-col>
      </el-row>
      <!-- <div class="share-bottom">
        <div><img src="/img/sharebtm.jpg" /></div>
        <div class="qrcode-txt">{{ $t("share.share_tips") }}</div>
        <div class="qrcode-box-share">
          <span v-html="qrcodeObj"></span>
        </div>
      </div> -->
    </div>
    <img :src="dataURL" alt="" v-show="!firstFlag">
    <!-- <div class="save-img">{{ $t("share.share_save") }}</div> -->
    <i class="el-icon-close header" @click="close()"></i>
  </el-container>
</template>
<script>
import Qrcodesvg from "qrcodesvg";
import html2canvas from 'html2canvas';
export default {
  middleware: "authenticated",
  async asyncData({ store, req, params, redirect }) {
    let inviteCode=params.inviteCode;
    let shareUrl=(inviteCode)?"https://m.zdx.com?shareCode="+inviteCode:"https://m.zdx.com";
    return {
      auth: store.state.auth,
      lang: store.state.locale,
      earning:params.earning||0,
      settlement:params.settlement || 0,
      shareUrl:shareUrl
    };
  },
  data() {
    return { 
      dataURL: "", 
      firstFlag: true,
      qrcodeObj:"",
    };
  },
  mounted(){
    let that = this;
    let qrcode = new Qrcodesvg(that.shareUrl, 70);
    let clientHeight = `${document.documentElement.clientHeight}`;
    let clientWidth = `${document.documentElement.clientWidth}`;
    this.qrcodeObj = qrcode.generate();
    setTimeout(function(){
      html2canvas(document.querySelector('#captureId'),{
            dpi: window.devicePixelRatio * 2,
            scale: 2,
            width: clientWidth,
            heigth: clientHeight,
            useCORS: true // 【重要】开启跨域配置
        }).then(canvas => {
          let imgUrl = canvas.toDataURL('image/png');
          console.log(imgUrl);
          that.dataURL = imgUrl;
          that.firstFlag = false;
      })
    },1500);
  },
  methods: {
    close() {
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    },
  },
  filters: {
    fix2: function(data) {
      return Number(data).toFixed(2);
    },
    fix4: function(data) {
      return Number(data).toFixed(4);
    }
  }
};
</script>

