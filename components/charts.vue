<template>
  <div class="x-bar">
    <div
      class="time-line"
      :style="{transform:timeLine,width:timewidth}"
      :class="{'is-over':isOver}"
    >
    <!-- <div
      class="time-line"
      :style="{width:timewidth}"
      :class="{'is-over':isOver}"
    > -->
      <div class="start-txt">{{ $t('minoption.start') }}</div>
      <div class="end-txt">{{ $t('minoption.finish') }}</div>
    </div>
    <div class="chart-box" :id="id" :option="option"></div>
    <div class="leastLine">
      <div class="line1" :style="{transform:translateLine}"></div>
      <div class="point" :style="{transform:translate}">
        <i></i>
      </div>
      <div class="value" :style="{transform:translateLine}">
        <countTo
          :startVal="lastValue"
          :endVal="nowValue"
          :decimals="decimals"
          :duration="500"
          separator
          :class="{'up':isUp==1,'down':isUp==2}"
          class="normal"
        ></countTo>
        <span class="dif-value" :class="{'hide':isUp==0,'up':isUp==1,'down':isUp==2}">
          <span v-show="isUp==1">+</span>
          <span v-show="isUp==2">-</span>
          {{ range | fix4 }}
        </span>
      </div>
    </div>
    <div class="deadline" v-show="!loading">
      <i class="deadline-icon">
        <svg
          t="1566495811272"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2497"
          width="100%"
          height="100%"
        >
          <path
            d="M426.666667 183.466667V128h170.666666v55.466667c149.333333 38.4 256 170.666667 256 328.533333 0 187.733333-153.6 341.333333-341.333333 341.333333s-341.333333-153.6-341.333333-341.333333c0-157.866667 106.666667-294.4 256-328.533333zM512 768c140.8 0 256-115.2 256-256s-115.2-256-256-256-256 115.2-256 256 115.2 256 256 256z m110.933333-426.666667L682.666667 401.066667 529.066667 554.666667 469.333333 494.933333 622.933333 341.333333z"
            fill="#ffffff"
            p-id="2498"
          />
        </svg>
      </i>
      <span class="deadline-text">{{ deadline }}</span>
    </div>
    <div class="hidden-others" @click="showOthers=!showOthers"><img src="/img/hiddenTx.png" /></div>
    <div class="order-list" v-show="showOthers">
      <div
        class="order-point"
        :style="{transform:item.position,display:item.isShow}"
        :class="item.class"
        v-for="item in orderList"
        :key="item.id"
      >
        <span class="order-avatar">
          <strong>
            <img :src="item.tx" />
          </strong>
        </span>
        <i class="order-value">{{item.cost}}</i>
      </div>
    </div>
    <div class="buy-line">
      <div
        class="buy-point"
        v-for="item in buyArr"
        :key="item.id"
        :class="{'up':item.status=='up','down':item.status=='down','pause':item.isNext,'show':item.show}"
      >
        <div class="line" :style="{transform:item.translate,width:item.solidWidth}"></div>
        <div class="point" :style="{transform:item.translate}">
          <i></i>
        </div>
        <div class="amount" :style="{transform:item.translate}">
          <!-- <div class="amount-bg"></div> -->
          {{ item.amount }}
        </div>
        <div class="values" :style="{transform:item.translateY}">{{ item.value | fix2 }}</div>
      </div>
    </div>
    <div class="reset_draw" v-show="needReset">
      <i class="reset-icon" @click="resetDraw()">
        <svg
          t="1568296096761"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2991"
          width="18"
          height="18"
        >
          <path
            d="M713.536 255.232l-58.624 72.192L960 355.712 868.8 64l-72.512 89.344A458.88 458.88 0 0 0 523.52 64C269.76 64 64 269.184 64 522.24c0 253.12 205.76 458.24 459.52 458.24a459.648 459.648 0 0 0 429.44-294.72 65.408 65.408 0 0 0-37.824-84.48 65.728 65.728 0 0 0-84.8 37.76A328.32 328.32 0 0 1 523.584 849.6c-181.312 0-328.32-146.56-328.32-327.36 0-180.736 147.008-327.296 328.32-327.296 69.376 0 135.232 21.504 189.952 60.288"
            p-id="2992"
            fill="#ffffff"
          />
        </svg>
      </i>
    </div>
    <div class="trade" v-show="!loading">
      <!-- <div v-show="nowSec<40"> -->
      <div>
        <div class="into-next" v-if="showBtn">
          <div class="trade-block" @click="showBtn=false">
            <i class="figure figure-lt"></i>
                <i class="figure figure-rt"></i>
                <i class="figure figure-lb"></i>
                <i class="figure figure-rb"></i>
            {{ $t('minoption.newoption') }}
          </div>
        </div>
        <el-row>
          <el-col :span="8">
            <div class="trade-block">
              <div class="now-value">{{ nowValue }}</div>
              <el-input-number
                label="$"
                type="tel"
                v-model="invertment"
                :precision="0"
                :step="step"
                :min="minInv"
                :max="maxInv"
              ></el-input-number>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="trade-block">
              <div class="block-up" @click="buy('up')">
                <i class="figure figure-lt"></i>
                <i class="figure figure-rt"></i>
                <i class="figure figure-lb"></i>
                <i class="figure figure-rb"></i>
                <strong class="up-icon"></strong>
                <span class="f-15">{{ $t('minoption.higher') }}</span>
                <!-- <div>{{upRate}}%</div> -->
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="trade-block">
              <div class="block-down" @click="buy('down')">
                <i class="figure figure-lt"></i>
                <i class="figure figure-rt"></i>
                <i class="figure figure-lb"></i>
                <i class="figure figure-rb"></i>
                <strong class="down-icon"></strong>
                <span class="f-15">{{ $t('minoption.lower') }}</span>
                <!-- <div>{{ downRate }}%</div> -->
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="wait-next" v-show="nowSec>=40" @click="nowSec=!nowSec">- {{ $t('minoption.wait_next') }} -</div> -->
    </div>
    <div class="masker" v-show="loading">
      <div class="masker-text">
        <div class="wave">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
    </div>
    <!-- <div class="buying-box" v-show="!canBuy">
      <div class="loading-pro"></div>
    </div>-->
  </div>
</template>
<script>
import HighCharts from "highcharts";
import countTo from "vue-count-to";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  components: { countTo },
  data() {
    return {
      num: 0,
      purNum: 0,
      tradePair: 1,
      isOver: false,
      showBtn: false,
      showOthers: true,
      hasShowBtn: false,
      autoplay: true,
      extreambtn: 2,
      minInv: 1,
      maxInv: 10000,
      translate: "translate(0,100px)",
      translateLine: "translateY(100px)",
      nowValue: 0,
      timeLine: "translateY(0)",
      timewidth: 0,
      isUp: 0,
      deadline: "00",
      range: 0,
      invertment: 50,
      step: 10,
      invariable: 0,
      dashedWidth: 0,
      lastValue: 0,
      solidWidth: 0,
      buyArr: [],
      nowSec: 0,
      lastSec: 0,
      hasBuy: false,
      lastTranslate: "translateY(0)",
      tradeResult: 0,
      loading: true,
      upRate: 80,
      downRate: 80,
      orderList: [],
      shash: "",
      mhash: "",
      isNewRound: false,
      roundStartTime: "",
      auth: "",
      isFirst: true,
      canBuy: true,
      nowDateTime: "",
      needReset: false,
      redraw: false,
      canSettlement: false,
      temp_account:''
    };
  },
  // 验证类型
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    },
    newdata: {
      type: Object
    },
    needRedraw: {
      type: Number
    },
    decimals: {
      type: Number
    },
    nowAccountType: {
      type: Number
    }
  },
  watch: {
    invertment() {
      if (this.invertment < 1) {
        this.step = 0.01;
      } else if (this.invertment <= 10 && this.maxInv > 10) {
        this.step = 1;
      } else if (this.invertment <= 100 && this.maxInv > 100) {
        this.step = 10;
      } else if (this.invertment <= 500 && this.maxInv > 500) {
        this.step = 50;
      } else if (this.invertment <= 1000 && this.maxInv > 1000) {
        this.step = 100;
      } else if(this.invertment >= 5000){
        this.$message.error("單次最高只能5000");//当积分达到5000，再下单5000才弹窗提示
      } else {
        this.step = 10;
      }
    },
    nowAccountType() {
      if (this.nowAccountType == 1) {
        this.invertment = 0.01;
        this.step = 0.01;
        this.minInv = 0.01;
      } else if (this.nowAccountType == 3) {
        this.invertment = 50;
        this.step = 10;
        this.minInv = 10;
      }
    },
    option() {
      if (this.option) {
        HighCharts.chart(this.id, this.option);
        this.num = this.option.series[0].data.length - 71;
        this.loading = true;
        this.isNewRound = false;
        this.redraw = true;
      }
    },
    needRedraw() {
      let that = this;
      that.loading = true;
      that.isNewRound = false;
      that.redraw = true;
      that.temp_account="";
    },
    newdata() {
      let that = this;
      that.tradePair = that.newdata.type;
      that.shash = that.newdata.shash;
      that.mhash = that.newdata.mhash;
      if (that.num == 0 || !that.newdata.id) {
        that.isNewRound = false;
        that.isFirst = true;
        return false;
      }
      if (that.chart && that.chart.series) {
        let series = that.chart.series[0];
        let datas = series.data;
        if (datas[that.num].x < that.newdata.data[0]) {
          that.num = that.num + 1;
          datas[that.num].update(that.newdata.data, false);
          let nowTime = datas[that.num].x;
          that.nowDateTime = nowTime;
          that.nowSec = new Date(nowTime).getSeconds();
          that.nowValue = that.newdata.data[1];
          that.roundStartTime = nowTime - that.nowSec * 1000;
          if (that.isFirst) {
            that.getHistorOrder();
            that.isFirst = false;
          }
          if (that.nowSec < that.lastSec) {
            that.isNewRound = false;
            that.canSettlement = true;
            that.hasShowBtn = false;
            that.redraw = true;
            that.showBtn = false;
          }
          that.lastSec = that.nowSec;
          // 重置时间轴
          if (that.redraw || !that.isNewRound) {
            that.chart.xAxis[0].setExtremes(
              that.roundStartTime - 33000,
              that.roundStartTime + 63000
            );
            that.chart.xAxis[0].update({
              max: that.roundStartTime + 63000
            });
            that.redraw = false;
            // TODO 缓存状态
            that.temp_account = ""
            
          }
          // 倒计时逻辑
          if (that.nowSec > 40) {
            that.deadline = that.$t("minoption.next_round");
            that.isOver = true;
            if (!that.hasShowBtn) {
              that.showBtn = true;
              that.hasShowBtn = true;
            }
            that.purNum = that.num + 40 - that.nowSec;
          } else {
            that.isOver = false;
            let secNum = 40 - that.nowSec;
            that.purNum = that.num + secNum;
            that.deadline = secNum;
            //伪造下单数据添加
            if (that.num > 5 && Math.floor(Math.random() * 10) >= 9) {
              // let orderAm = Math.round(Math.random() * 10); //下单金额
              // orderAm = orderAm == 0 ? "1" + orderAm : orderAm + "0";
              let newOrder = {
                id: Math.round(Math.random() * 10000000),
                // tx: "/tx/tx" + Math.round(Math.random() * 122 + 1) + ".jpg",
                tx: "/img/logo36.png",
                // cost: Math.floor(Math.random() * 100),
                cost: Math.round(Math.random() * 200 ) + 1,
                class: Math.round(Math.random() * 10) >= 5 ? "higher" : "lower",
                position: "translate(0,0)",
                time: nowTime,
                isShow: "",
                nowPrice: that.nowValue
              };
              that.orderList.push(newOrder);
              if (that.orderList.length > 100) {
                that.orderList.splice(0, 50);
              }
            }
          }
          let maxTime = datas[datas.length - 1].x + 1000;
          series.addPoint([maxTime, null], true, false);
          // 下次胜率修改
          that.upRate = that.nowAccountType == 1 ? 70 : 80;
          that.downRate = that.nowAccountType == 1 ? 70 : 80;
          setTimeout(function() {
            that.maxInv = parseFloat(localStorage.getItem("account"));
            that.isUp = 0;
          }, 500);
          let extreams = that.chart.xAxis[0].getExtremes();
          if (extreams.min < that.roundStartTime - 33000) {
            that.needReset = true;
          } else {
            that.needReset = false;
          }
          let timeX = that.chart.xAxis[0].toPixels(that.roundStartTime + 40000);
          let timeEndX = that.chart.xAxis[0].toPixels(
            that.roundStartTime + 60000
          );
          let timeWidth = timeEndX - timeX + 1;
          that.timewidth = timeWidth + "px";
          that.timeLine = "translateX(" + timeX + "px)";
          // 结算逻辑
          if (that.canSettlement && that.buyArr.length > 0) {
            let newBuyArr = [];
            let newIndex = 0;
            that.hasBuy = true;
            let userInput = 0;
            for (let i = 0; i < that.buyArr.length; i++) {
              if (that.buyArr[i].isNext) {
                that.buyArr[i].isNext = false;
                newBuyArr[newIndex] = that.buyArr[i];
                newIndex++;
              }
            }
            if (newBuyArr.length != that.buyArr.length) {
              that.$emit("settlement", that.tradeResult);
            }
            that.buyArr = newBuyArr;
          }
          that.canSettlement = false;
          that.lastValue = datas[that.num - 1].options.y;
          let lastPX = that.chart.xAxis[0].toPixels(datas[that.num].options.x);
          let lastPY = that.chart.yAxis[0].toPixels(that.nowValue);
          that.range = that.nowValue - that.lastValue;
          that.isUp = that.range > 0 ? 1 : 2;
          that.translate = "translate(" + lastPX + "px," + lastPY + "px)";
          that.translateLine = "translateY(" + lastPY + "px)";
          if (that.buyArr.length > 0) {
            for (let i = 0; i < that.buyArr.length; i++) {
              let thisIndex = that.buyArr[i].id;
              that.buyArr[i].show = true;
              let pX = that.chart.xAxis[0].toPixels(that.buyArr[i].time);
              let pY = that.chart.yAxis[0].toPixels(that.buyArr[i].value);
              that.buyArr[i].translate = "translate(" + pX + "px," + pY + "px)";
              that.buyArr[i].solidWidth = "calc(100% - " + pX + "px)";
              that.buyArr[i].translateY = "translateY(" + pY + "px)";
            }
          }
          that.isNewRound = true;
          that.loading = false;
          //更新下单数据
          if (that.orderList.length > 0) {
            for (let i = 0; i < that.orderList.length; i++) {
              let pX = that.chart.xAxis[0].toPixels(that.orderList[i].time);
              let pY = that.chart.yAxis[0].toPixels(that.orderList[i].nowPrice);
              if (pX < 0 || pY < 0) {
                that.orderList[i].isShow = "none";
              } else {
                that.orderList[i].position =
                  "translate(" + pX + "px," + pY + "px)";
              }
            }
          }
        }
      } else {
        if (that.option) {
          that.chart = HighCharts.chart(that.id, that.option);
        }
      }
    }
  },
  methods: {
    resetDraw() {
      let that = this;
      if (that.chart) {
        that.chart.xAxis[0].setExtremes(
          that.roundStartTime - 33000,
          that.roundStartTime + 63000
        );
        that.needReset = false;
      }
    },
    buy(type) {
      let that = this;
      if (that.maxInv < 1) {
        this.$message.error(that.$t("minoption.no_enouth_amount"));
        return false;
      }
      if (!that.canBuy) {
        return false;
      }
      console.log(that.temp_account,"that.temp_account:");
      console.log(that.nowAccountType,"nowAccountType:");
      // 缓存取状态值 wd
      if (that.temp_account) {
        if(that.temp_account != that.nowAccountType) {
          //提示用户
          this.$message.error("只能用同种币种");
          // that.canBuy = false;
          return false;
        }
      } else{
        // 缓存状态值
        that.temp_account = that.nowAccountType
      }
      that.canBuy = false;
      setTimeout(function() {
        that.canBuy = true;
      }, 1000);
      if (that.chart) {
        let series = that.chart.series[0];
        let datas = series.data;
        let index = that.buyArr.length;
        let accountTypeName = that.nowAccountType == 5 ? "/virtual" : "";

        let olderurl = `${
              process.env.BASE_URL
            }/order-api/options-order${accountTypeName}/create`;
        let url = `${
              process.env.BASE_URL
            }/order-api/options-order/create`;
        that.axios
          .post(
           url,
            {
              user_id: "[user_id]", //用户id
              trade_pair: that.tradePair, //交易对id (1:btc:usdt 2:eth/usdt)
              order_type: 0, //订单类型 (0:实值期权，1:虚值期权 ) 目前传0
              trade_type: type == "up" ? 0 : -1, //交易类型 （0:看涨 1:看跌）
              investment_amount: that.invertment, //下单金额 （单位usdt）
              min_hash: that.mhash,
              sec_hash: that.shash,
              symbol:that.nowAccountType,
              expected_return:
                type == "up" ? that.upRate / 100 : that.downRate / 100 //盈亏比
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: that.auth
              }
            }
          )
          .then(res => {
            if (res.data.success) {
              let resDatas = res.data.data;
              let idTime = new Date(resDatas.periods).getTime();
              let index = that.buyArr.length;
              // let thisIndex = that.buyArr[i].id;
              // let pX = that.chart.xAxis[0].toPixels(that.buyArr[i].time);
              // let pY = that.chart.yAxis[0].toPixels(that.buyArr[i].value);
              // that.buyArr[i].translate = "translate(" + pX + "px," + pY + "px)";
              // that.buyArr[i].solidWidth = "calc(100% - " + (pX + 140) + "px)";
              // that.buyArr[i].translateY = "translateY(" + pY + "px)";
              that.buyArr[index] = {
                id: that.num,
                time: datas[that.num].x,
                status: type,
                show: false,
                rate: type == "up" ? that.upRate : that.downRate,
                isNext: that.nowSec > 40 ? true : false,
                translate:
                  "translate(" +
                  datas[that.num].plotX +
                  "px," +
                  datas[that.num].plotY +
                  "px)",
                solidWidth:
                  "calc(100% - " + (datas[that.num].plotX + 90) + "px)",
                translateY: "translateY(" + datas[that.num].plotY + "px)",
                amount: that.invertment,
                value: that.nowValue
                // id: resDatas.id,
                // time: idTime + 8 * 60 * 60 * 1000,
                // status: type,
                // rate: resDatas.expected_return * 100,
                // isNext: that.nowSec > 40 ? true : false,
                // translate: "",
                // solidWidth: "",
                // translateY: "",
                // amount: resDatas.investment_amount,
                // value: resDatas.commit_index_price
              };
              that.$emit("win", that.invertment);
              that.maxInv = that.maxInv - that.invertment;
            } else {
              let errorCode = res.data.code
                ? res.data.code
                : res.data.error.code;
              if (
                errorCode == "GATEWAY_AUTH_004" ||
                errorCode == "GATEWAY_AUTH_003"
              ) {
                that.$emit("loginStatus", "logout");
                that.$message.error(that.$t("minoption.no_login"));
              } else {
                that.$message.error(that.$t("systemError." + errorCode));
              }
            }
          });
      }
    },
    getHistorOrder() {
      let that = this;
      if (that.auth) {
        let history = that.axios(
          `${process.env.BASE_URL}/history-api/history/option/v/[user_id]/${
            that.tradePair
          }/1/10`,
          {
            headers: {
              "Content-Type": "application/json",
              token: that.auth
            }
          }
        );
        history.then(function(response) {
          if (response) {
            if (response.data.success) {
              let datas = response.data.data;
              let newHistory = [];
              for (let i = 0; i < datas.length; i++) {
                if (datas[i].status == 2) {
                  let idTime = new Date(datas[i].createdAt);
                  let type = datas[i].tradeType == 0 ? "up" : "down";
                  that.buyArr.push({
                    id: Math.floor(Math.random() * 100000000),
                    time: idTime.getTime(),
                    status: type,
                    show: false,
                    rate: datas[i].odds * 100,
                    isNext: false,
                    translate: "",
                    solidWidth: 0,
                    translateY: "",
                    amount: datas[i].amount,
                    value: datas[i].commitIndexPrice
                  });
                }
              }
            }
          } else {
            that.$message.error(that.$t("error.errorNet"));
          }
        });
      }
    }
  },
  mounted() {
    let that = this;
    HighCharts.setOptions({
      global: {
        useUTC: false
      }
    });
    that.auth = localStorage.getItem("auth");
    // if (that.nowDateTime) {
    //   setInterval(function() {
    //     let localTime = new Date().getTime();
    //     if (localTime - that.nowDateTime > 200000) {
    //       that.loading = true;
    //       that.isNewRound = false;
    //       that.redraw = true;
    //       that.$emit("resetInit", "reset");
    //     }
    //   }, 10000);
    // }
  },
  filters: {
    fix8: function(data) {
      return Math.abs(data.toFixed(8));
    },
    fix4: function(data) {
      return Math.abs(data.toFixed(4));
    },
    fix2: function(data) {
      return data.toFixed(2);
    }
  }
};
</script>
