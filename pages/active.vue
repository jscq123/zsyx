<template>
  <el-container direction="vertical">
    <i class="el-icon-close header" @click="close()"></i>
    <div class="active-layout" :class="{bg_en:lang=='en'}">
      <div class="end-time">{{ $t('active.end_time')}}</div>
      <div class="pt-10">
        <div id="countdown">
          <div id="tiles">
            <span>{{ days | addZero }}</span>
            <span>{{ hours | addZero }}</span>
            <span>{{ mins | addZero }}</span>
            <span>{{ secs | addZero }}</span>
          </div>
          <div class="labels">
            <li>Days</li>
            <li>Hours</li>
            <li>Mins</li>
            <li>Secs</li>
          </div>
        </div>
      </div>
      <div class="mt-40">
        <span class="yellow-btn" @click="close()">{{ $t('active.into_minoption')}}</span>
      </div>
      <div class="rank-line">{{ $t('active.my_rank')}}</div>
      <div v-if="auth">
        <div class="pt-20 f-14">{{ $t('active.ranking')}}</div>
        <div class="f-48">{{ myRank }}</div>
        <div class="f-14">{{ $t('active.my_total_amount')}} {{ myTotalAmount }}</div>
      </div>
      <div class="pt-20" v-else>
        <nuxt-link :to="{name:'login',params:{backurl:'/active'}}">{{ $t('minoption.no_login')}}</nuxt-link>
      </div>
      <div class="rank-line">{{ $t('active.all_rank')}}</div>
      <div class="rank-list">
        <el-row class="pt-5">
          <el-col :span="4" class="t-l">{{ $t('active.ranking')}}</el-col>
          <el-col :span="10" class="t-l">{{ $t('active.user_name')}}</el-col>
          <el-col :span="10" class="t-r">{{ $t('active.total_amount')}}</el-col>
        </el-row>
        <el-row class="rank-list-row" v-for="item in rankList" :key="item.userId">
          <el-col :span="4" class="t-l">{{ item.ranking }}</el-col>
          <el-col :span="10" class="t-l">{{ item.registerInfo }}</el-col>
          <el-col :span="10" class="t-r">{{ item.total | fix2 }}</el-col>
        </el-row>
      </div>
      <div class="rank-line">{{ $t('active.active_rule')}}</div>
      <div class="t-l inner-content" v-if="lang!='en'">
        <div class="pt-5">1.领取1000 USDT模拟金,每个账户每天限领2次。</div>
        <div class="pt-5">2.参与一分钟期权模拟盘下注,赢得模拟金。</div>
        <div class="pt-5">3.模拟账户历史最高金额参与大赛排行并分享收益,排行奖励如下:</div>
        <div class="rank-list">
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">名次</el-col>
            <el-col :span="18" class="t-l">奖金</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">第1名</el-col>
            <el-col :span="18" class="t-l">1000 USDT</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">第2名</el-col>
            <el-col :span="18" class="t-l">600 USDT</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">第3名</el-col>
            <el-col :span="18" class="t-l">300 USDT</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">第4名-50名</el-col>
            <el-col :span="18" class="t-l">瓜分 200 USDT</el-col>
          </el-row>
        </div>
        <div class="pt-5">注：所有奖励USDT 于2个工作日内 充值到实盘账户上,可提现。</div>
        <div class="pt-5 fb">未进入排行榜用户邀请分享奖励：（分享截图发给ZDX宝贝）</div>
        <div class="pt-5">1. 特别奖：邀请好友参与交易赛获得前三名，奖励邀请人100 USDT 。</div>
        <div class="pt-5">2.收益截图分享百人以上币圈微信群，奖励2 USDT ,每人限领一次。</div>
        <div class="pt-5">3.收益截图发朋友圈，奖励2 USDT ,每人限领一次。</div>
        <div class="pt-5">4.联系方式：</div>
        <div class="pt-5">· ZDX宝贝微信：微信号（zdxbaby001）</div>
        <div class="pt-5">· 本次活动最终解释权归m.zdx.com所有。</div>
        <div class="pt-5">· 智多星zdx.com团队</div>
      </div>
      <div class="t-l inner-content" v-else>
        <div class="pt-5">1.Get 1000 USDT simulation gold, each account is limited to 2 times a day.</div>
        <div
          class="pt-5"
        >2.Trade one-minute option simulation board, simulate the highest amount of account history to participate in the contest ranking and share the profits,</div>
        <div class="pt-5">3.The ranking awards are as follows:</div>
        <div class="rank-list">
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">Rank</el-col>
            <el-col :span="18" class="t-l">Bonuses</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">No.1</el-col>
            <el-col :span="18" class="t-l">1000 USDT</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">No.2</el-col>
            <el-col :span="18" class="t-l">600 USDT</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">No.3</el-col>
            <el-col :span="18" class="t-l">300 USDT</el-col>
          </el-row>
          <el-row class="pt-5">
            <el-col :span="6" class="t-l">No.4- No.50</el-col>
            <el-col :span="18" class="t-l">split 200 USDT</el-col>
          </el-row>
        </div>
        <div
          class="pt-5"
        >Note: all rewards USDT can be remitted to the firm offer account within 2 working days and can be withdrawn</div>
        <div
          class="pt-5 fb"
        >Users who did not enter the leaderboard invite sharing rewards :(share screenshots to ZDX baby)</div>
        <div
          class="pt-5"
        >1. Special award: invite friends to participate in the trading competition to win the first three, reward inviter 100 USDT.</div>
        <div
          class="pt-5"
        >2.Share more than 100 people WeChat group of coin circle, reward 2 USDT, each person is limited to one time.</div>
        <div
          class="pt-5"
        >3.Send screenshot of earnings to friends circle, reward 2 USDT, each person is limited to one time.</div>
        <div class="pt-5">4.Contact information:</div>
        <div class="pt-5">· ZDX baby WeChat: WeChat ID (zdxbaby001)</div>
        <div class="pt-5">· m.zdx.com reserves the right to interpret the activity.</div>
        <div class="pt-5">· The zdx.com team</div>
      </div>
    </div>
  </el-container>
</template>
<script>
export default {
  async asyncData({ store, req, params, redirect }) {
    return {
      auth: store.state.auth,
      lang: store.state.locale
    };
  },
  data() {
    return {
      myRank: "",
      myTotalAmount: "",
      rankList: "",
      days: "--",
      hours: "--",
      mins: "--",
      secs: "--"
    };
  },
  mounted() {
    localStorage.setItem("active_showed", 1);
    let that = this;
    if (that.auth) {
      let getMyRankList = that.$axios.post(
        `${process.env.BASE_URL}/verify-api/acy/virtual/contest/rank/user`,
        {
          userId: "[user_id]",
          symbol: 3
        },
        {
          headers: {
            token: that.auth
          }
        }
      );
      getMyRankList.then(res => {
        if (res.status == 200 && res.data.success) {
          that.myRank = res.data.data.ranking;
          that.myTotalAmount = res.data.data.total;
        } else {
          that.$message.error(that.$t("error.errorNet"));
        }
      });
    }
    let getRankList = that.$axios.post(
      `${process.env.BASE_URL}/verify-api/acy/virtual/contest/rank/tops`,
      {
        userId: "[user_id]",
        symbol: 3,
        tops: 10
      }
    );
    getRankList.then(res => {
      if (res.status == 200 && res.data.success) {
        that.rankList = res.data.data;
      } else {
        that.$message.error(that.$t("error.errorNet"));
      }
    });
    let getConfig = that.$axios.get(
      `${process.env.BASE_URL}/verify-api/acy/virtual/contest/config`
    );
    getConfig.then(res => {
      if (res.status == 200 && res.data.success) {
        console.log(res.data.data.endDateStr);
        that.countTime(res.data.data.endDateStr);
      } else {
        console.log(res.data);
      }
    });
  },
  methods: {
    close() {
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    },
    countTime(endTime) {
      let that = this;
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var endDate = new Date(endTime);
      var end = endDate.getTime();
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.days = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        this.hours = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.mins = Math.floor((leftTime / 1000 / 60) % 60);
        this.secs = Math.floor((leftTime / 1000) % 60);
      }
      let countdown = setInterval(() => {
        that.countTime(endTime);
      }, 1000);
    }
  },
  filters: {
    fix2: function(data) {
      return Number(data).toFixed(2);
    },
    fix4: function(data) {
      return Number(data).toFixed(4);
    },
    addZero: function(data) {
      if (Number(data) < 10) {
        return "0" + data;
      } else {
        return data;
      }
    }
  }
};
</script>
