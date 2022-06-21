<template>
  <div>
    <el-container direction="vertical" style="height:100vh;">
      <el-main class="no-page">
        <div class="title">{{$t("depositelast.wallet")}}</div>
        <i class="el-icon-back header" @click="back()"></i>
        <div class="transaction-recode-txt">
          <nuxt-link to="/deposit_record">
            <span class="c-fff ff-pfscr">{{ $t("depositelast.record")}}</span>
          </nuxt-link>
        </div>
        <div class="avatar m-20">
          <el-row>
            <el-col :span="6">
              <span class="avatar_photo ml--32">
                <!-- <img :src="avatar_tx"> -->
                <img src="/img/logo36.png" alt>
              </span>
            </el-col>
            <el-col :span="18" class="t-l ml--20">
              <div class="pt-5 f-14 color-w ff-pfscr">
                {{ userId | showUserId(userId) }}
                <span
                  class="verfied-type has-verfied verfied-type-icon"
                >
                  <img src="/img/rz.png">
                </span>
                <!-- <span class="verfied-type has-verfied" v-if="kycState==2">
                  <img src="/img/rz.png" />
                </span>
                <nuxt-link
                  v-else
                  class="verfied-type"
                  :to="kycStateUrl"
                >{{ $t('kyc.state-'+kycState) }}</nuxt-link>-->
              </div>
              <!-- <div class="pt-5 c-gray" style="font-size:12px">{{ accountName }}</div> -->
              <div class="pt-5 c-gray ff-pfscr f-12">{{user_name}}</div>
            </el-col>
            <!-- <div class="level-con f-14 ff-pfscr">
            <i></i>
            {{$t('widthdraw.level')}}
            </div>-->
          </el-row>
          <div class="menu-account">
            <el-row>
              <el-col :span="8">
                <div class="c-gray f-14 ff-pfscr">{{ $t("depositelast.db")}}</div>
                <div class="ff-sbrm color-w f-20">{{ practice }}</div>
              </el-col>
              <el-col :span="8">
                <div class="c-gray f-14 ff-pfscr">{{ $t("depositelast.jf")}}</div>
                <div class="ff-sbrm color-w f-20">{{ virtualAccount }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- <div class="line-gray" style="margin-bottom:23px;"></div> -->
        <!-- 选中充值类别 -->
        <div class="deposit-payment-gate" v-if="dialogPaySelBox">
          <span class="close-papySel-btn el-icon-error" @click="dialogPaySelBox = false"></span>
          <p
            class="c-fff f-14 ff-pfscr"
            style="margin-bottom:20px;position: absolute;top: 30%;text-align: center;width: 100vw;"
          >选择充值类别</p>
          <ul class="deposit-payment-gate-type">
            <!-- <li @click="dialogCardVisible = true">信用卡</li>
            <li>虛擬帳號</li>
            <li @click="dialogStoreVisible = true">超商代收</li> -->
            <li v-for="(gate,tid) in deposiTypeGate" 
            :key="tid" 
            :class="{'deposit-selected':currentPayGateType == tid}" 
            @click="depositGateSel(tid)"
            >
              <p v-if="gate.type==0" @click="dialogCardVisible = true"> {{gate.name}} </p>
              <p v-if="gate.type==2" @click="dialogStoreVisible = false"> {{gate.name}} </p>
              <p v-if="gate.type==1"> {{gate.name}} </p>
            </li>
          </ul>
          <div class="deposit-btn-box" @click="depositGateSelFun()">
            <div class="btn btn-orange">
              <i class="figure figure-lt"></i>
              <i class="figure figure-rt"></i>
              <i class="figure figure-lb"></i>
              <i class="figure figure-rb"></i>
              确认充值
            </div>
          </div>
        </div>
        <div class="line-gray" style="margin-bottom:23px;"></div>
        <!--选择充值金额 -->
        <div class="deposit-list-box">
          <p class="c-gray f-14 ff-pfscr" style="margin-bottom:7px;">选择充值金额</p>
          <el-row
            class="info-input c-fff ff-sbrm"
            v-for="(deposit,index) in  depositType"
            :key="index"
            @click.native="depositSelect(index,deposit)"
            :class="{'deposit-selected':currentType == index}"
          >
            <el-col class="t-l pl-10 f-14">
              {{deposit.text}}
              <div class="deposit-tip-box" v-if="deposit.tip !== ''">
                <p class="deposit-tip-icon"></p>
                <p class="deposit-tip-tit">
                  <!-- <span class="ff-pfscr">
                    超值
                  </span>-->
                  <span class="ff-sbrm">+{{deposit.tip}}</span>
                </p>
                <!-- <p  class="deposit-tip-tit">超值+20%</p> -->
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="deposit-btn-box" @click="submit()">
          <div class="btn btn-orange">
            <i class="figure figure-lt"></i>
            <i class="figure figure-rt"></i>
            <i class="figure figure-lb"></i>
            <i class="figure figure-rb"></i>
            确认充值
          </div>
        </div>
      </el-main>
      <!-- 充值类别弹窗 -->
      <!-- card -->
      <div class="deposit-payment-gate-dialog">
        <el-dialog title="信用卡充值" :visible.sync="dialogCardVisible">
          <el-form :model="cardPay">
            <el-form-item>
              <el-radio v-model="cardPay.installment" label="0">一次付清</el-radio>
              <el-radio v-model="cardPay.installment" label="1">分 3 期</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCardVisible = false" type="primary">取 消</el-button>
            <el-button @click="dialogCardFuc()" type="success">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- store -->
      <div class="deposit-payment-gate-dialog">
        <el-dialog title="超商代收付款" :visible.sync="dialogStoreVisible">
          <el-form :model="storePay">
            <el-form-item>
              <el-radio v-model="storePay.choosePayment" label="CVS">超商代碼</el-radio>
              <el-radio v-model="storePay.choosePayment" label="BARCODE">超商條碼</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogStoreVisible = false" type="primary">取 消</el-button>
            <el-button @click="dialogStoreFuc()" type="success">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="payform" style="display:none;"></div>
    </el-container>
    <!-- <form method="post" 
    action="http://payflow.mycash.asia/VirAccountPaymentGate.php"
    style="display:none;" id="paymentUrl" 
    enctype="multipart/form-data"
    >
      <input name="HashKey" v-model="submitRechargeInfo.HashKey" />
      <input name="HashIV"  v-model="submitRechargeInfo.HashIV" />
      <input name="MerTradeID"  v-model="submitRechargeInfo.MerTradeID" />
      <input name="MerProductID" v-model="submitRechargeInfo.MerProductID"/>
      <input name="MerUserID"  v-model="submitRechargeInfo.MerUserID" />
      <input name="Amount"  v-model="submitRechargeInfo.Amount" />
      <input name="TradeDesc" v-model="submitRechargeInfo.TradeDesc" />
      <input name="ItemName"  v-model="submitRechargeInfo.ItemName" />
      <input name="UnionPay"  v-model="submitRechargeInfo.UnionPay" />
      <input name="Installment"  v-model="submitRechargeInfo.Installment" />
      <input name="ChoosePayment"  v-model="submitRechargeInfo.ChoosePayment" />
    </form> -->
  </div>
</template>
<style scoped>
.deposit-tip-box {
  right: -1px;
}
.deposit-tip-tit span {
  display: block;
}
.deposit-tip-tit span:nth-child(1) {
  font-size: 8px;
  transform: translate(2px, -4px) scale(0.7);
  -webkit-transform: translate(2px, -4px) scale(0.9);
}
.deposit-tip-tit span:nth-child(2) {
  font-size: 10px;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
  margin-top: -1px;
}
.deposit-tip-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-width: 24px;
  border-style: solid;
  border-color: #ffae00 #ffae00 transparent transparent;
}
.deposit-selected {
  border: 1px solid rgba(255, 174, 0, 1);
  color: rgba(255, 174, 0, 1);
}
.account-wrap .btn,
.btn-orange {
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 174, 0, 0.3) 0%,
    rgba(255, 213, 0, 0.1) 100%
  );
}
.el-main {
  /* overflow: hidden !important; */
  height: 100vh;
}
.deposit-btn-box {
  position: inherit;
  width: calc(100vw - 40px);
  height: 40px;
  margin-top: 30px;
}
.btn {
  height: 40px;
  line-height: 40px;
}
.info-input {
  line-height: 40px;
  height: 40px;
}
.transaction-recode-txt {
  position: absolute;
  right: 15px;
  top: 14px;
  font-size: 14px;
}
.current-accout {
  padding: 24px 0;
  margin-top: 20px;
}
.menu-account {
  margin: 0;
}
.btn-account-address i {
  background: url(/img/address@2x.png) no-repeat center;
}
.btn-z-rwt i {
  background: url(/img/zh@2x.png) no-repeat center;
}
.btn-cz i {
  background: url(/img/cz.png) no-repeat center;
}
.avatar {
  position: relative;
}
.menu-account {
  border: none;
}
.b-yellow {
  color: #ffc400;
  background: linear-gradient(
    135deg,
    rgba(255, 174, 0, 0.3) 0%,
    rgba(255, 213, 0, 0.1) 100%
  );
  border: 1px solid rgba(255, 174, 0, 1);
}
.b-gray {
  color: #ccc;
  background: linear-gradient(
    135deg,
    rgba(142, 142, 142, 0.3) 0%,
    rgba(179, 179, 179, 0.1) 100%
  );
  border: 1px solid rgba(204, 204, 204, 1);
}
.btn-withdraw i {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 7px;
  background-size: 100%;
}
.btn-withdraw {
  height: 36px;
  line-height: 36px;
  border-radius: 3px;
  width: calc(100% - 2px);
  display: inline-block;
  margin: 10px 0 18px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
.transaction-recode-txt {
  position: absolute;
  right: 15px;
  top: 14px;
  font-size: 14px;
}
.f-r {
  float: right;
}
.f-20 {
  font-size: 20px;
}
.m-20 {
  margin: 20px 0 10px;
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
.deposit-btn-box {
  z-index: 10;
}
.deposit-payment-gate .deposit-btn-box {
  position: absolute;
  left: 50%;
  bottom: 10%;
  top:auto;
  transform: translate(-50%,0);
}

</style>
<script>
import $ from 'jquery'
import axios from "axios";
const Cookie = process.client ? require("js-cookie") : undefined;
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
      data: data.data,
      auth: store.state.auth,
      avatar_tx: `/tx/tx${data.data.avatar}.jpg`,
      user_name: data.data.email || data.data.mobile,
      kycState: data.data.kycState,
      userId: data.data.userId
    };
  },
  data() {
    return {
      thiUrl:"",
      dialogPaySelBox:false,//选择充值类型
      dialogCardVisible: false,
      dialogStoreVisible: false,
      practice: 0,//RWT
      virtualAccount: 0,//RWD
      currentPayGateType:10,//web端，充值类型索引
      currentPayGateInfo:"",//web端，当前充值类型的具体信息
      currentType: 10, //当前选中金额的索引
      currentDepInfo: "", //当前选中金额的信息,
      deposiTypeGate:[
        {
          type:0,
          name:"信用卡充值",
          cardPay:{
            installment:"0",//信用卡分期，0:不分期，1:分三期
          },
        },
        {
          type:1,
          name:"虛擬帳號充值"
        },
        {
          type:2,
          name:"超商代收付款",
          storePay:{
            choosePayment:"CVS",//CVS：超商代碼、BARCODE：超商條碼
          },
        }
      ],//充值渠道集合
      cardPay:{
        installment:"0",//信用卡分期，0:不分期，1:分三期
      },//信用卡信息
      storePay:{
        choosePayment:"CVS",//CVS：超商代碼、BARCODE：超商條碼
      },//超商信息
      depositType: [
        {
          account: 10,
          text: "充值10台幣，獲得88RWT代幣",
          tip: ""
        },
        {
          account: 70,
          text: "充值70台幣，獲得488RWT代幣",
          tip: ""
        },
        {
          account: 170,
          text: "充值170台幣，获得1288RWT代幣",
          tip: "10%"
        },
        {
          account: 330,
          text: "充值330台幣，获得2488RWT代幣",
          tip: "10%"
        },
        {
          account: 760,
          text: "充值760台幣，获得5488RWT代幣",
          tip: "20%"
        },
        {
          account: 1680,
          text: "充值1680台幣，获得13888RWT代幣",
          tip: "20%"
        }
      ],//可以选择的充值金额集合
      typeName:"",//充值分类名称
      submitRechargeInfo:{
        url:"",
        HashKey: "B8RDMRMYFH5P863TPNMUDVA9B",//第三方支付HashKey
        HashIV: "3SV5QHCTAAJ5DFXY9TK6KTTJL9",//第三方支付HashIV
        MerTradeID:"",//店家交易編號,店家自行設定，不得小於 6 個字元，不得重複。
        MerProductID:"",//店家商品代號 , 店家自行設定，不得小於 4 個字元。
        MerUserID:"",//店家自行設定，限英文或數字組合，最少 2 個字元。
        Amount:0,//交易金額
        TradeDesc:"这是充值",//交易描述
        ItemName:"代币充值",
        UnionPay:0,//信用卡類別 0：一般信用卡；1：銀聯卡
        Installment:0,//信用卡分期 未傳或非 1：不分期；1：分 3 期(分期消費金額最少100 元)
        ChoosePayment:"CVS",//CVS：超商代碼、BARCODE：超商條碼。
        paymentTYPE:"TCC"
      },//准备充值信息集合
      depositResult: "", //app充值返回的实体

    };
  },
  mounted() {
    let that = this;
    if (!that.auth) {
        let accountName = localStorage.getItem("accountName");
        if(accountName){
          that.logout("/login");
        }else{
          that.logout("/register");
        }
        return false;
      }
    this.getVirtualAccount();
    this.getPractice();
  },
  methods: {
    back() {
      this.$router.back();
    },
    async getData(url) {
      let that = this;
      let { data } = await this.axios(url, {
        headers: {
          "Content-Type": "application/json",
          token: that.auth
        }
      });
      return data;
    },
    getVirtualAccount() {
      let that = this;
      let res = that.getData(
        `${process.env.BASE_URL}/wallet-api/wallet/balance/[user_id]/5`
      );
      let data = Promise.resolve(res).then(result => {
        that.virtualAccount = result.data.available;
        console.log(result.data.available, "available");
      });
    },
    getPractice() {
      let that = this;
      let res = that.getData(
        `${process.env.BASE_URL}/wallet-api/wallet/balance/[user_id]/4`
      );
      let data = Promise.resolve(res).then(result => {
        that.practice = result.data.available;
        console.log(result.data.available, "available");
      });
    },
    //选择信用卡弹窗
    dialogCardFuc(){
      var that = this;
      console.log(this.cardPay.installment);
       this.deposiTypeGate.forEach(e => {
        if(e.type == 0){
          e.cardPay.installment = that.cardPay.installment;
          that.currentPayGateInfo = e
        }
      });
      this.dialogCardVisible = false
    },
    //选择超商代收弹窗
    dialogStoreFuc(){
      console.log(this.storePay.choosePayment);
      let that = this;
      this.deposiTypeGate.forEach(e => {
        if(e.type == 2){
          e.storePay.choosePayment = that.storePay.choosePayment;
          that.currentPayGateInfo = e
        }
      });
      this.dialogStoreVisible = false
    },
    //确认付款渠道
    depositGateSel(index){
      this.currentPayGateType = index;
      let that = this;
      this.deposiTypeGate.forEach(e => {
        if(e.type == index){
          that.currentPayGateInfo = e
        }
      });
      console.log("确认付款渠道",JSON.stringify(this.currentPayGateInfo));
    },
    // 充值金额选择
    depositSelect(index, deposit) {
      this.currentType = index;
      this.currentDepInfo = deposit;
    },
    //充值账号各种编号随机生成
    createMerId(n){
        let str = "abcdefghijklmnopqrstuvwxyz0123456789";
        var result = "";
        for(var i = 0; i < n; i++) {
          result += str[parseInt(Math.random() * str.length)];
        }
        return result;

    },
    //
    depositGateSelFun(){
      var that = this;
      if(this.currentPayGateInfo == "" ||this.currentPayGateInfo == undefined){
        that.$message.error("请选择充值渠道");
      }else{
          console.log("确认付款渠道",JSON.stringify(that.currentPayGateInfo));
          that.submitRechargeInfo.MerTradeID = that.createMerId(10);
          // that.submitRechargeInfo.MerProductID = that.createMerId(10);
          //MerProductID==>tokenid的值
          that.submitRechargeInfo.MerProductID = that.auth;
          // that.submitRechargeInfo.MerUserID = that.createMerId(10); 
          //传入用户id
          that.submitRechargeInfo.MerUserID = 10000000 + parseInt(that.userId);
          console.log("that.submitRechargeInfo.MerUserID:",that.submitRechargeInfo.MerUserID);
          that.submitRechargeInfo.Amount = that.currentDepInfo.account;
          // let basePayUrl =  "http://payflow.mycash.asia/";
          let basePayUrl= `/pay/payflow/`;
          // let basePayUrl= `http://47.252.82.5/pay/payflow/`;
          switch(that.currentPayGateInfo.type){
            case 0:
            that.typeName = "CreditPaymentGate";
            that.submitRechargeInfo.UnionPay = 0;//先设置一般信用卡
            that.submitRechargeInfo.Installment = that.currentPayGateInfo.cardPay.installment
            break;
            case 1:
            that.typeName = "VirAccountPaymentGate"
            break;
            case 2:
            that.typeName = "StorePaymentGate"
            that.submitRechargeInfo.ChoosePayment =  that.currentPayGateInfo.storePay.choosePayment
            break;
          }
          that.thiUrl = basePayUrl + that.typeName +".php"

          console.log("提交充值信息集合:",JSON.stringify(that.submitRechargeInfo));

          let formData = new FormData();
          for(var key in that.submitRechargeInfo){
            formData.append(key,that.submitRechargeInfo[key]);
          }
          let result = that.axios({
              method:"post",
              url:that.thiUrl,
              headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              },
              withCredentials:true,
              data:formData
          })
          const newTab = window.open();
          result.then((res)=>{
            console.log(res.data);
            that.dialogPaySelBox = false;
            const div = document.createElement('div');
            div.innerHTML = res.data; // html code
            newTab.document.body.appendChild(div);
            let smallUri = newTab.document.querySelector("#form1").getAttribute("action");
            let newUrl = "http://payflow.mycash.asia/" + smallUri;
            newTab.document.querySelector("#form1").setAttribute("action",newUrl);
            newTab.document.body.setAttribute("style","background-color: #1D2223;");
            newTab.document.querySelector(".container").setAttribute("style","position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);");
            newTab.document.querySelector("#Title").setAttribute("style","color:#FFF;text-align: center;");
            newTab.document.querySelector("#confirmbutton").setAttribute("style","border: 1px solid rgba(255,174,0,1);color: #ffae00;width: 80vw;height: 40px;background: linear-gradient( 135deg, rgba(255, 174, 0, 0.3) 0%, rgba(255, 213, 0, 0.1) 100% );outline: none;border-radius: 3px;")
            newTab.document.querySelector("#form1").submit();
            
            
          });

          // result.then((res) =>{
          //   that.dialogPaySelBox = false;
          //   const div = $("<div></div>").html(res.data);
          //   // console.log(div.html());return false;
          //   $(".payform").html(div);
          //   let smallUri = $(".pay_content").find("#form1").attr("action");
          //   let newUrl = "http://payflow.mycash.asia/" + smallUri;
          //   $("#form1").attr("action",newUrl);
          //   $("#form1").submit();
          // })

      }
    },
    submit() {
      //调用安卓  调起google支付
      // console.log("submit");
      // console.log("充值方式：",this.currentPayGateType);
     
      // ruiying.callBackMethod()//这个ruiying是安卓端传给网页端的
      var that = this;
      if (this.currentDepInfo.account == 0 ||this.currentDepInfo.account == "" ||this.currentDepInfo.account == undefined) {
        that.$message.error("请选择充值金额");
      }else {
        console.log( "要充值的金额",that.currentDepInfo.account);
        // 安卓调取第三方支付渠道
        let canDeposit = typeof ruiying != "undefined" ? true : false;
        if (canDeposit) {
          that.depositResult = ruiying.callBackMethod(
            that.currentDepInfo.account
          );
          console.log(that.depositResult, "that.depositResult");
          return false;
        }else{
          //web在线充值123
          that.dialogPaySelBox = true;
          //that.depositGateSelFun();
        }
      }
    },
    logout(url) {
      this.clearLoginInfo();
      if (url) {
        this.$router.push(url);
      } else {
        this.$router.push("/login");0
      }
    },
    clearLoginInfo() {
      Cookie.remove("auth");
      Cookie.remove("jfSelected");
      this.$store.commit("setAuth", null);
      localStorage.removeItem("auth");
      localStorage.removeItem("accountName");
    },
  },
  filters: {
    showUserId: function(userId) {
      return 10000000 + parseInt(userId);
    }
  }
};
</script>

