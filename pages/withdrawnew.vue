<template>
    <div>
      <el-container direction="vertical">
        <el-main class="no-page" style="overflow: hidden !important;">
          <div class="title">资产兑换</div>
          <i class="el-icon-back header" @click="close()"></i>
          <div class="transaction-recode-txt">
            <nuxt-link to="/" >
              <span class="color-w ff-pfscr">交易记录</span>
            </nuxt-link>
          </div>
        </el-main>
        <div class="avatar m-20">
          <el-row>
            <el-col :span="6">
              <span class="avatar_photo ml--32">
                <img :src="avatar_tx" />
              </span>
            </el-col>
            <el-col :span="18" class="t-l ml--20">
              <div class="pt-5 f-14 color-w ff-pfscr">
                平台用户
                <span class="verfied-type has-verfied verfied-type-icon">
                  <img src="/img/rz.png" />
                </span>
                <!-- <span class="verfied-type has-verfied" v-if="kycState==2">
                  <img src="/img/rz.png" />
                </span>
                <nuxt-link
                  v-else
                  class="verfied-type"
                  :to="kycStateUrl"
                >{{ $t('kyc.state-'+kycState) }}</nuxt-link> -->
              </div>
              <!-- <div class="pt-5 c-gray" style="font-size:12px">{{ accountName }}</div> -->
              <div class="pt-5 c-gray ff-pfscr f-12">{{user_name}}</div>
            </el-col>
            <div class="level-con f-14 ff-pfscr">
              <i></i>
              {{$t('widthdraw.level')}}
            </div>
          </el-row>
          <div class="menu-account">
            <el-row>
              <el-col :span="8">
                <div class="c-gray f-14 ff-pfscr">RWT</div>
                <div class="ff-sbrm color-w f-20">30,000</div>
              </el-col>
              <el-col :span="8">
                <div class="c-gray f-14 ff-pfscr">
                  RWD
                  <i class="help-icon">i</i>
                </div>
                <div class="ff-sbrm color-w f-20">120,000</div>
              </el-col>
              <el-col :span="8">
                <div class="c-gray f-14 t-c ff-pfscr">USDT</div>
                <!-- <div class="f-13 t-c ff-sbrm">{{ practice | fix4 }}</div> -->
                <div class="t-c ff-sbrm color-w f-20">123,00</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="line-gray m-20"></div>
        <div class="btn-cont padding-lr-20">
            <div class="el-col el-col-12">
                <span class="btn-withdraw b-yellow btn-charts ff-pfscr t-c">
                  <i></i>
                  <!-- 兑换客服 -->
                  <span>{{ $t('widthdraw.charts') }}</span>
                </span>
            </div>
            <div class="el-col el-col-12">
                <span class="btn-withdraw b-gray btn-shop ff-pfscr t-c f-r">
                  <i></i>
                  <!-- 积分商城 -->
                  <span>{{ $t('widthdraw.shop') }}</span>
                </span>
            </div>
        </div>
        <div class="line-gray m-20"></div>
        <div class="btn-rwt-usdt padding-lr-20">
          <span class="c-gray f-14 ff-sbrm" style="margin-top:20px;display:block">RWT转USDT</span>
          <div>
              <div class="el-col el-col-12">
                <span class="btn-withdraw  b-gray btn-ipt ff-pfscr h-40">
                  <label for="amountMoney">{{ $t('widthdraw.all') }}</label>
                  <input type="text" :placeholder="$t('widthdraw.amount_money')" class="f-14" id="amountMoney"/>
                </span>
            </div>
            <div class="el-col el-col-12">
                <span class="btn-withdraw b-yellow btn-zh ff-pfscr f-r h-40">
                  <i></i> 
                  <!-- 转换 -->
                  {{ $t('widthdraw.zh') }}
                </span>
            </div>
          </div>
        </div>
        <div class="line-gray m-20"></div>
        <div class="btn-rwt-usdt padding-lr-20">
          <span class="c-gray f-14 ff-sbrm" style="margin-top:20px;display:block">{{ $t('widthdraw.USTDZZ') }}</span>
          <div class="el-col el-col-24">
            <span class="btn-withdraw  b-gray btn-ipt ff-pfscr h-40">
              <input type="text" :placeholder="$t('widthdraw.transfer_address')" class="f-14"/>
            </span>
          </div>
          <div class="f-l clear">
            <div class="el-col el-col-12" >
              <span class="btn-withdraw b-gray btn-ipt ff-pfscr h-40" >
                <label for="USDT_amountMoney">{{ $t('widthdraw.all') }}</label>
                <input type="text" :placeholder="$t('widthdraw.amount_money')" class="f-14" id="USDT_amountMoney"/>
              </span>
            </div>
            <div class="el-col el-col-12">
                <span class="btn-withdraw b-yellow btn-zz ff-pfscr f-r h-40">
                  <i></i> 
                  <!--转账-->
                  {{ $t('widthdraw.zz') }}
                </span>
            </div>
          </div>
        </div>
      </el-container>
        
    </div>
</template>
<style>
.f-l{
  float: left;
  width: 100%;
  margin-top: -20px;
}
.avatar{
  position: relative;
}
.menu-account{
  border:none;
}
.b-yellow{
  color:#FFC400;
  background:linear-gradient(135deg,rgba(255,174,0,0.3) 0%,rgba(255,213,0,0.1) 100%);
  border:1px solid rgba(255,174,0,1);
}
.b-gray{
  color:#ccc;
  background:linear-gradient(135deg,rgba(142,142,142,0.3) 0%,rgba(179,179,179,0.1) 100%);
  border:1px solid rgba(204,204,204,1);
}
.btn-charts i{
  background:url(/img/dh_icon@2x.png) no-repeat center;
}
.btn-shop i{
  background:url(/img/jf_icon@2x.png) no-repeat center;
}
.btn-zh i{
  background:url(/img/zh@2x.png) no-repeat center;
}
.btn-zz i{
  background:url(/img/zz@2x.png) no-repeat center;
}
.btn-withdraw i{
  display: inline-block;
  width:16px;
  height:16px;
  margin-right:7px;
  background-size:100%;
}
.btn-withdraw{
  height:36px;
  line-height: 36px;
  border-radius: 3px;
  width:calc(100% - 2px);
  display: inline-block;
  margin:10px 0 18px;
  display: flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:center;
  position: relative;
}
.h-40{
 height:40px;
 line-height:40px; 
}
.btn-withdraw input{
  width: 100%;
  padding-left:14px;
  line-height:40px;
  color:#fff;
  background: transparent;
  outline: none;
  border: none;
}
.btn-withdraw label{
  position: absolute;
  height:40px;
  line-height: 40px;
  color:#fff;
  right:14px;
}
.verfied-type-icon{
  background-color: transparent;
}
.verfied-type-icon{
  width: 11px;
  height: 10px;
  margin-left:-2px;
}
.color-w{
  color:#fff;
}
.ff-pfscr{
  font-family: pfscr;
}
.transaction-recode-txt{
  position: absolute;
  right: 15px;
  top: 14px;
  font-size: 14px;
}
.f-r {
  float: right;
}
.f-20{
  font-size:20px;
}
.m-20{
  margin:0 20px;
}
.padding-lr-20{
  padding:0 20px;
}
.line-gray{
  height:1px;
  background-color:#000;
}
.ws-n .f-r,.ff-sbrm,.deadline-text{
    font-family: sbrm;
  }
</style>

<script>
import { formatDate } from "../static/date.js";
const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";
export default {
    middleware: "authenticated",
    async asyncData({ store, req, params, redirect }) {
      let { data } = await axios.post(
        `${process.env.BASE_URL}/user-api/user-info/account/detail`,
        {
          userId: "[user_id]"
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: store.state.auth
          }
        }
      );
      return {
        data:data.data,
            auth: store.state.auth,
            avatar_tx: `/tx/tx${data.data.avatar}.jpg`,
            user_name: data.data.email || data.data.mobile,
            kycState: data.data.kycState,
            practice:0
      };
    },
    data(){
   
    },
    mounted(){
        this.$store.commit("setLastpage", "/withdrawnew");
        // console.log(this.result);
        let that = this;
        that.accountName = localStorage.getItem("accountName");
        // console.log(that.data.user_name);
        // console.log(that.avatar_tx);
    },
    methods:{
      close() {
        localStorage.setItem("lastPage", "/minoption");
        this.$store.commit("setLastpage", "/minoption");
        this.$router.push("/minoption");
      },
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
  
}
</script>
