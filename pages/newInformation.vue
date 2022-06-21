<template>
  <el-container direction="vertical">
    <el-main class>
      <div class="title">{{$t('newInformation.tit')}}</div>
      <i class="el-icon-back header" @click="close()"></i>
      <div class="information-box">
        <p class="information-tit ff-13">最新资讯内容更新于</p>
        <p class="information-time ff-sbrm ff-12">2019年11月20日</p>
        <div class="information-txt">
          <p class="information-txt-tit c-orange f-16 ff-pfscr">{{$t('newInformation.tip')}}</p>
          <!-- {{$t('newInformation.txt')}} -->
          <div class="ff-pfscr f-14 c-fff">
            <p>瑞盈數字貨幣指數交易遊戲是利用BitCoin/USDT（比特幣對USDT數字貨幣的指數）交易指數的漲跌趨勢，用戶通過專業的金融財務知識和對於數字貨幣的認知，預測在未來60秒內的交易週期內的交易指數上漲或者下跌的指數交易遊戲。</p>
            <p>遊戲平台的交易指數數據來源透明公開，通過接入全球最大的三個數字貨幣交易所（火幣交易所www.huobi.io、幣安交易所www.binance.com、OKEX交易所www.okex.com）BitCoin/USDT的交易每秒交易數據進行加權平均獲得的數據來源。</p>
            <p>
              用戶通過平台內的RWT代幣、RWD積分進行數字貨幣指數趨勢漲跌預測的遊戲。
              RWT代幣為遊戲平台的主要數字籌碼，通過線上的充值通道充值新台幣的方式獲得RWT代幣。通過RWT代幣進行遊戲，平台用戶撮合配對的方式進行互相交易遊戲，針對預測的結果獎勵RWT代幣（預測勝利）和RWD積分（預測失敗）。RWT代幣在平台上通過客服可以兌換有價值的實體或虛擬獎品。
            </p>
            <p>
              RWD積分也是遊戲平台上交易遊戲使用的數字籌碼，主要通過用戶的每日簽到登錄等方式獲取。通過RWD積分進行遊戲，讓用戶可以盡快的熟悉交易遊戲的規則，更快的投入交易遊戲中獲得更大的價值獎勵。
              本交易遊戲為讓用戶熟悉數字貨幣的交易的遊戲內容，禁止從事賭博交易
            </p>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<style scoped>
.information-box {
  margin-top: 55px;
}
.information-time,
.information-tit {
  color: rgba(153, 153, 153, 1);
}
.el-main {
  height: 100vh;
  overflow: scroll;
}
.information-txt {
  margin-top: 25px;
}
.information-tit {
  margin-bottom: 9px;
}
.information-txt-tit{
    margin-bottom: 13px;
}
</style>
<script>
export default {
    methods: {
        close() {
        localStorage.setItem("lastPage", "/minoption");
        this.$store.commit("setLastpage", "/minoption");
        this.$router.push("/minoption");
        }
    }
}
</script>


