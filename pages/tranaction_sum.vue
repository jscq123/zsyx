<template>
  <div>
    <!-- 交易汇总 -->
    <div class="tc-sum-box">
      <div class="tit-con clear">
        <div class="t-s-b-left f-l">
          <p>
            <span class="lottery-tit f-12 ff-pfscr">奖池金额</span>
            <span class="i f-12 ff-pfscr">i</span>
          </p>
          <p class="ff-sbrm f-20 lottery_num">218,819</p>
        </div>
        <div class="t-s-b-right f-r">
          <p>
            <span class="lottery-list f-12 ff-pfscr">中奖名单</span>
          </p>
          <p>
            <span class="c-gray f-12 ff-sbrm">19:10:11 后开奖</span>
          </p>
        </div>
      </div>
      <div class="lotter-btn-box">
        <span class="c-gray f-14 ff-sbrm">19:10:11 抽奖</span>
      </div>
      <div class="realtime-data-box">
        <p class="c-fff f-14 ff-sbrm tit">2019-09-10 实时数据</p>
        <div class="user-num">
          <p class="c-999 f-11 ff-pfscr">用户数/在线用户数</p>
          <p class="c-fff f-16 ff-sbrm">201,948/1478,45</p>
        </div>
        <div class="user-sum-data clear">
          <div class="el-col-12">
            <p class="c-999 f-11 ff-pfscr">总交易笔数</p>
            <p class="c-fff f-16 ff-sbrm">1623,123</p>
          </div>
          <div class="el-col-12">
            <p class="c-999 f-11 ff-pfscr">胜利笔数/胜率</p>
            <p class="c-fff f-16 ff-sbrm">35,146/30.5%</p>
          </div>
        </div>
      </div>
      <div class="active-ranking">
        <div class="active-time-con clear">
          <p
            v-for="(d,index) in date"
            class="el-col-8 c-fff f-13 ff-pfscr"
            :class="{selected:num==index}"
            @click="dataTab(index)"
          >{{d}}</p>
        </div>
        <div class="active-ranking-list-box">
          <ul>
            <li class="clear" v-for="rankingInfo in rankingList">
              <div class="el-col-2 ranking-num">
                <i></i>
              </div>
              <div class="el-col-20 ranking-info">
                <p class="user-name f-15 ff-pfscr c-fff">{{ rankingInfo.name}}</p>
                <p class="ranking-info-con c-fff f-12 ff-sbrm clear">
                  <span class="el-col-11">{{ rankingInfo.odds }}赔率</span>
                  <span class="el-colo-13">获胜RWT{{rankingInfo.RWT}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.ranking-info {
  padding-left: 10px;
}
.active-ranking-list-box ul li .ranking-num i {
  display: block;
  width: 12px;
  height: 24px;
  margin-top: 7px;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
}
.active-ranking-list-box ul li:nth-child(1) .ranking-num i {
  background-image: url(/img/1@2x.png);
}
.active-ranking-list-box ul li:nth-child(2) .ranking-num i {
  background-image: url(/img/2@2x.png);
}
.active-ranking-list-box ul li:nth-child(3) .ranking-num i {
  background-image: url(/img/3@2x.png);
}
.active-ranking-list-box ul li:nth-child(4) .ranking-num i {
  background-image: url(/img/4@2x.png);
}
.active-ranking-list-box ul li:nth-child(5) .ranking-num i {
  background-image: url(/img/5@2x.png);
}
.active-ranking-list-box ul li {
  height: 34px;
  margin-bottom: 20px;
}
.active-time-con {
  margin-bottom: 16px;
}
.active-time-con p {
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(151, 151, 151, 1);
}
.active-time-con p:nth-child(1) {
  border-radius: 3px 0px 0px 3px;
}
.active-day {
  border-radius: 3px 0px 0px 3px;
  /* border: 1px solid rgba(151, 151, 151, 1); */
}

.active-week {
  /* border: 1px solid rgba(151, 151, 151, 1); */
}
.active-time-con p:nth-child(3) {
  border-radius: 0px 3px 3px 0px;
}
.active-month {
  border-radius: 0px 3px 3px 0px;
}
.active-time-con .selected {
  background-color: transparent;
}
.lottery-tit .i {
  width: 10px;
  height: 10px;
  text-align: center;
  line-height: 10px;
  border: 1px solid rgba(151, 151, 151, 1);
  border-radius: 50%;
  -webkit-border-radius: 50%;
}
.t-s-b-left .lottery-tit {
  color: rgba(246, 191, 11, 1);
}
.lottery_num {
  color: rgba(255, 195, 0, 1);
  text-shadow: 0px 0px 6px rgba(255, 174, 0, 0.5);
}
.f-l {
  float: left;
}
.tc-sum-box {
  margin: 0 29px;
}
.tc-sum-box .tit-con {
  height: 71px;
  padding: 15px;
  background: linear-gradient(
    135deg,
    rgba(255, 174, 0, 0.2) 0%,
    rgba(255, 213, 0, 0.05) 100%
  );
  box-shadow: 0px 0px 10px 0px rgba(244, 227, 1, 0.2);
  border-radius: 3px;
  border: 1px solid rgba(255, 186, 0, 1);
}
.lottery-list {
  /* color:#ddad0e; */
  color: rgba(246, 191, 11, 1);
  line-height: 17px;
}
.lotter-btn-box {
  height: 40px;
  line-height: 40px;
  margin-top: 4px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(142, 142, 142, 0.3) 0%,
    rgba(179, 179, 179, 0.1) 100%
  );
  border-radius: 3px;
  border: 1px solid rgba(153, 153, 153, 1);
}
.realtime-data-box {
  margin: 30px 0;
}
.realtime-data-box .tit {
  margin-bottom: 17px;
}
.user-sum-data {
  margin-top: 10px;
}
</style>
<script>
import axios from "axios";
export default {
  async asyncData({ store, req, params, redirect }) {
    let url = "https://api.myjson.com/bins/17gtfq";
    let resList = await axios.get(
      url,
      { day: new Date() },
      {
        headers: {
          "Content-Type": "application/json",
          token: store.state.auth
        }
      }
    );
    return {
      rankingList: resList.data.list
    };
  },

  data() {
    return {
      rankingList: "",
      date: ["日", "周", "月"],
      num:0
    };
  },
  mounted() {
    this.dataTab(0);
  },
  methods: {
    dataTab(type) {
      let baseUrl = `https://api.myjson.com/bins/`;
      let url;
      let that = this;
      that.num = type;
      switch (type) {
        case 0:
          url = baseUrl + "17gtfq";
          break;
        case 1:
          url = baseUrl + "lfs1y";
          break;
        case 2:
          url = baseUrl + "1bozty";
          break;
        default:
          url = baseUrl + "17gtfq";
          break;
      }
      axios.get(url).then(res => {
        that.rankingList = res.data.list;
      });
    }
  },
  filters: {
    fix2: function(data) {
      return data.toFixed(2);
    }
  }
};
</script>

