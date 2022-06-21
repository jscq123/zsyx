<template>
  <div>
    <el-container direction="vertical">
      <el-main class="no-page" style="overflow: hidden !important;">
        <div class="title">会员</div>
        <i class="el-icon-back header" @click="close()"></i>
      </el-main>
      <div class="avatar m-20">
        <user-info></user-info>
        <div class="line-gray" style="margin:10px 0;"></div>
        <div class="current-rank-equity-con">
          <p class="cre-con-tit c-fff f-15 t-l ff-pfscr">{{$t('member.current_rank_equity')}}</p>
          <div class="cre-con-info clear">
            <div class="el-col-6 cre-con-info-box">
              <p class="cre-con-info-num c-yellow ff-sbrm f-15">5,000</p>
              <p
                class="cre-con-info-txt c-999 ff-pfscr f-11 t-l"
              >{{$t('member.single_transaction_ceiling')}}</p>
            </div>
            <div class="el-col-6 cre-con-info-box">
              <p class="cre-con-info-num c-yellow ff-sbrm f-15">3</p>
              <p
                class="cre-con-info-txt c-999 ff-pfscr f-11"
              >{{$t('member.number_of_authority_transactions')}}</p>
            </div>
            <div class="el-col-6 cre-con-info-box">
              <p class="cre-con-info-num c-yellow ff-sbrm f-15">200</p>
              <p class="cre-con-info-txt c-999 ff-pfscr f-11">{{$t('member.daily_RWD_rewards')}}</p>
            </div>
            <div class="el-col-6 cre-con-info-box">
              <p class="cre-con-info-num c-yellow ff-sbrm f-15">0.5%</p>
              <p class="cre-con-info-txt c-999 ff-pfscr f-11">{{$t('member.extra_winning_odds')}}</p>
            </div>
            <div class="el-col-6 cre-con-info-box">
              <p class="cre-con-info-num c-yellow ff-sbrm f-15">{{$t('member.real_time_analysis')}}</p>
              <p class="cre-con-info-txt c-999 ff-pfscr f-11">{{$t('member.authority_analysis')}}</p>
            </div>
            <div class="el-col-6 cre-con-info-box">
              <p class="cre-con-info-num c-yellow ff-sbrm f-15">{{$t('member.lottery_prize')}}</p>
              <p class="cre-con-info-txt c-999 ff-pfscr f-11">{{$t('member.luck_draw')}}</p>
            </div>
            <div class="el-col-6 cre-con-info-box">
              <p class="cre-con-info-num c-yellow ff-sbrm f-15">{{$t('member.fast')}}</p>
              <p class="cre-con-info-txt c-999 ff-pfscr f-11">{{$t('member.exchange_channel')}}</p>
            </div>
          </div>
        </div>
        <div class="line-gray" style="margin:20px 0 10px;"></div>
        <div class="menber-level-info">
          <p class="cre-con-tit c-fff f-15 t-l ff-pfscr">{{$t('member.member_level_desc')}}</p>
          <!-- table -->
          <div class="member-level-info-table">
            <table>
              <th></th>
              <th class="t-c c-999 bg-b">基础</th>
              <th class="t-c c-fff">白银</th>
              <tr>
                <td class="t-l c-999">获得条件要求</td>
                <td class="t-c c-fff bg-b">注册用户</td>
                <td class="t-c c-fff">
                  筹码6k RWT
                  <br>交易累计80k RWT
                </td>
              </tr>
              <tr>
                <td class="t-l c-999">单笔交易金额</td>
                <td class="t-c c-fff bg-b">1k RWT</td>
                <td class="t-c c-fff">5k RWT</td>
              </tr>
              <tr>
                <td class="t-l c-999">单局交易次数</td>
                <td class="t-c c-fff bg-b">1次</td>
                <td class="t-c c-fff">3次</td>
              </tr>
              <tr>
                <td class="t-l c-999">
                  每日登录
                  <br>RWD奖励
                </td>
                <td class="t-c c-fff bg-b">50 RWD</td>
                <td class="t-c c-fff">200 RWD</td>
              </tr>
              <tr>
                <td class="t-l c-999">单局实时分析</td>
                <td class="t-c c-fff bg-b"></td>
                <td class="t-c c-fff">有</td>
              </tr>
              <tr>
                <td class="t-l c-999">参与彩池抽奖</td>
                <td class="t-c c-fff bg-b"></td>
                <td class="t-c c-fff">有</td>
              </tr>
              <tr>
                <td class="t-l c-999">额外的增加胜利赔率</td>
                <td class="t-c c-fff bg-b"></td>
                <td class="t-c c-fff">0.5%</td>
              </tr>
              <tr>
                <td class="t-l c-999">快速兑换通道</td>
                <td class="t-c c-fff bg-b"></td>
                <td class="t-c c-fff"></td>
              </tr>
              <tr>
                <td class="t-l c-999">专职客服</td>
                <td class="t-c c-fff bg-b"></td>
                <td class="t-c c-fff"></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>
<style>
.bg-b {
  background-color: #262b2c;
}
.member-level-info-table {
  margin-bottom: 50px;
}
.member-level-info-table table {
  width: 100%;
  border: 0;
  font-family: pfscr;
  font-size: 12px;
  border-collapse: collapse;
}
.member-level-info-table table th {
  line-height: 30px;
  height: 30px;
}
.member-level-info-table table td {
  height: 45px;
}
.cre-con-tit {
  line-height: 38px;
}
.cre-con-info-box {
  height: 60px;
  padding: 15px 0;
}
.menu-account {
  margin: 0;
}
.avatar {
  position: relative;
}

.menu-account {
  border: none;
}
.h-40 {
  height: 40px;
  line-height: 40px;
}
.verfied-type-icon {
  background-color: transparent;
}
.verfied-type-icon {
  width: 11px;
  height: 10px;
  margin-left: -2px;
}
.color-w {
  color: #fff;
}
.ff-pfscr {
  font-family: pfscr;
}
.f-r {
  float: right;
}
.f-20 {
  font-size: 20px;
}
.m-20 {
  margin: 0 20px;
}
.padding-lr-20 {
  padding: 0 20px;
}
.line-gray {
  height: 1px;
  background-color: #000;
}
.ws-n .f-r,
.ff-sbrm,
.deadline-text {
  font-family: sbrm;
}
</style>

<script>
import { formatDate } from "../static/date.js";
import userInfo from "../components/userInfo";
const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";
export default {
  data() {
    return {};
  },
  components: {
    userInfo
  },
  mounted() {
    this.$store.commit("setLastpage", "/withdrawnew");
    // console.log(this.result);
    let that = this;
    that.accountName = localStorage.getItem("accountName");
    // console.log(that.data.user_name);
    // console.log(that.avatar_tx);
  },
  methods: {
    close() {
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    }
  },
  filters: {
    formatMS(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm:ss");
    },
    formatMD(time) {
      var date = new Date(time);
      return formatDate(date, "MM-dd");
    },
    addZero: function(data) {
      return Number(data).toFixed(8);
    },
    fix2: function(data) {
      return Number(data).toFixed(2);
    },
    fix4: function(data) {
      return Number(data).toFixed(4);
    }
  }
};
</script>
