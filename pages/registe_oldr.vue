<template>
  <el-container direction="vertical">
    <el-main class="no-page">
      <div class="title">{{ $t('register.title') }}</div>
      <i class="el-icon-back header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col>
          <div class="box" v-if="!canNext">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('register.email')" name="email">
                <el-form ref="emailForm" :rules="rules" :model="emailForm">
                  <el-form-item prop="email">
                    <el-input v-model="emailForm.email" :placeholder="$t('register.emailInput')"></el-input>
                  </el-form-item>
                  <el-form-item prop="pass">
                    <el-input
                      type="password"
                      v-model="emailForm.pass"
                      :placeholder="$t('register.passwordInput')"
                    ></el-input>
                  </el-form-item>
                  <!-- <el-form-item prop="checkpass">
                    <el-input
                      type="password"
                      v-model="emailForm.checkpass"
                      :placeholder="$t('register.checkPasswordInput')"
                    ></el-input>
                  </el-form-item> -->
                  <el-form-item class="agreement">
                    <el-checkbox v-model="emailForm.agreement"><span>{{ $t('register.agreement') }}<nuxt-link to="/agreement">{{ $t('register.agreement-describe') }}</nuxt-link></span></el-checkbox>
                  </el-form-item>
                  <el-form-item class="form-button-box">
                    <el-button
                      type="primary"
                      @click="submitForm('emailForm')"
                    >{{ $t('register.registerNow') }}</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane :label="$t('register.phone')" name="phone">
                <el-form ref="phoneForm" :rules="rules" :model="phoneForm">
                  <el-form-item prop="phone">
                    <el-row type="flex">
                      <el-col :span="6">
                        <el-select v-model="phoneForm.areaNum" placeholder="86" class="area-select">
                          <el-option
                            v-for="item in areaOption"
                            :key="item.locale"
                            :label="item.code"
                            :value="item.code"
                          >
                            <span style="float: left">+{{ item.code }}</span>
                            <span
                              style="float: right; color: #8492a6; font-size: 13px"
                            >{{ item.en }}</span>
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="17" :offset="1">
                        <el-input
                          v-model="phoneForm.phone"
                          :placeholder="$t('register.phoneInput')"
                          class="phone-number"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item prop="pass">
                    <el-input
                      type="password"
                      v-model="phoneForm.pass"
                      :placeholder="$t('register.passwordInput')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="agreement">
                    <el-checkbox
                      v-model="phoneForm.agreement"
                      name="agreement"
                    ><span>{{ $t('register.agreement') }}<nuxt-link to="/agreement">{{ $t('register.agreement-describe') }}</nuxt-link></span></el-checkbox>
                  </el-form-item>
                  <el-form-item class="form-button-box">
                    <el-button
                      type="primary"
                      @click="submitForm('phoneForm')"
                    >{{ $t('register.registerNow') }}</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            <div class="pt-20 t-c">
              <span class="no-account">
                {{ $t('register.hasAccount') }}
                <nuxt-link type="primary" to="/login">{{ $t('register.login') }}</nuxt-link>
              </span>
            </div>
          </div>
          <div class="box" v-else>
            <i class="el-icon-back" @click="back()"></i>
            <div class="login-title">{{ $t('register.verification') }}</div>
            <div>
              {{ $t('register.verifiTips') }}
              <span v-if="activeName=='email'">
                {{ $t('register.email') }}
                <br />
                {{ emailForm.email }}
              </span>
              <span v-else>
                {{ $t('register.phone') }}
                <br />
                {{ phoneForm.areaNum}} {{ phoneForm.phone }}
              </span>
            </div>
            <el-form ref="checkForm" :rules="rules" :model="checkForm">
              <el-form-item prop="code">
                <el-input
                  v-model="checkForm.code"
                  maxlength="6"
                  :placeholder="$t('register.codeInput')"
                >
                  <span class="send-code" slot="suffix">
                    <span v-if="noSend" class="send-code-btn" @click="getCode">{{ $t('register.sendCode') }}</span>
                    <span v-else>
                      {{ $t('register.countTips') }}
                      <span>{{ count }}</span>s
                    </span>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item class="form-button-box">
                <el-button
                  type="primary"
                  @click="submitForm('checkForm')"
                >{{ $t('register.registerNow') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    var isPassword = (rule, value, callback) => {
      const reg = /^[_a-zA-Z0-9]+$/;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value)) {
          callback(new Error(this.$i18n.t("error.errorPass")));
        } else if (value.length > 20 || value.length < 8) {
          callback(new Error(this.$i18n.t("error.maxPass")));
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      let prePass="";
      if(this.activeName=="email"){
        prePass=this.emailForm.pass;
      }else{
        prePass=this.phoneForm.pass;
      }
      if (value === '') {
        callback(new Error(this.$i18n.t("error.checkEmptyPass")))
      } else if (value !== prePass) {
        callback(new Error(this.$i18n.t("error.checkErroePass")))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      const reg = /\b\d{6,16}/g;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error(this.$i18n.t("error.emptyPhone")));
        } else {
          callback();
        }
      }
    };
    var validateCode = (rule, value, callback) => {
      const reg = /\d{6}$/;
      if (!reg.test(value)) {
        callback(new Error(this.$i18n.t("error.codeError")));
      } else {
        callback();
      }
    };
    return {
      canNext: false,
      rememberUser: false,
      activeName: "email",
      emailForm: {
        email: "",
        pass: "",
        checkpass:  "",
        agreement: false
      },
      phoneForm: {
        areaNum: "86",
        phone: "",
        pass: "",
        checkpass:  "",
        agreement: false
      },
      checkForm: {
        code: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: this.$i18n.t("error.emptyEmail"),
            trigger: "blur"
          },
          { type: "email", message: this.$i18n.t("error.rightEmail"), trigger: ["blur"] }
        ],
        phone: [
          { required: true, message: this.$i18n.t("error.emptyPhone"), trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        pass: [
          { required: true, message: this.$i18n.t("error.emptyPass"), trigger: "blur" },
          { validator: isPassword, trigger: "blur" }
        ],
        checkpass: [
          { required: true, message: this.$i18n.t("error.checkEmptyPass"), trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        code: [
          { required: true, message: this.$i18n.t("error.emptyCode"), trigger: "blur" },
          { validator: validateCode, trigger: "blur" }
        ]
      },
      fullscreenLoading: true,
      areaOption: {
        en: "China",
        zh: "中国",
        locale: "CN",
        code: 86
      },
      noSend: true,
      count: "",
      timer: null
    };
  },
  mounted: function() {
    let that = this;
    localStorage.setItem("lastPage", "/register");
    let areacode = this.axios.get("/areacode.json");
    areacode.then(res => {
      if (res.status == 200) {
        that.areaOption = res.data;
      }
    });
    if(that.$route.hash=="#checkCode"){
      that.canNext=true;
      that.preActive=localStorage.getItem("preActive");
      that.emailForm.email=localStorage.getItem("preEmail");
      that.emailForm.pass=localStorage.getItem("preEmailPass");
      that.emailForm.agreement=true;
      that.phoneForm.areaNum=localStorage.getItem("preNativeCode");
      that.phoneForm.phone=localStorage.getItem("preMobile");
      that.phoneForm.pass=localStorage.getItem("prePassword");
      that.phoneForm.agreement=true;
    }else{
      that.canNext=false;
    }
  },
  methods: {
    /*提交进行判断的函数 */
    submitForm: function(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (formName != "checkForm") {
          if (valid) {
            if (!that.$refs[formName].model.agreement) {
              that.$message.error(that.$t("error.checkAgreement"));
              return false;
            }
            that.$router.push('#checkCode');
            let lastpage=localStorage.getItem("lastpage");
            localStorage.setItem("preActive",that.activeName);
            localStorage.setItem("preEmail",that.emailForm.email);
            localStorage.setItem("preEmailPass",that.emailForm.pass);
            localStorage.setItem("preNativeCode",that.phoneForm.areaNum);
            localStorage.setItem("preMobile",that.phoneForm.phone);
            localStorage.setItem("prePassword",that.phoneForm.pass);
            localStorage.setItem("lastpage",lastpage+"#checkCode");
            that.getCode();
          }
        }else{
          if (valid) {
            that.login();
          }
        }
      });
    },
    login: function() {
      let that = this;
      let loginData = "";
      let from_invite=localStorage.getItem("from_invite");
      if (that.activeName == "email") {
        loginData = this.axios.post(
          `${process.env.BASE_URL}/user-api/user/register/email`,
          {
            email: that.emailForm.email,
            password: that.emailForm.pass,
            inviteCode: from_invite || "",
            verifyCode: that.checkForm.code
          }
        );
      } else {
        loginData = this.axios.post(
          `${process.env.BASE_URL}/user-api/user/register/mobile`,
          {
            nativeCode: that.phoneForm.areaNum,
            mobile: that.phoneForm.phone,
            password: that.phoneForm.pass,
            inviteCode: "",
            verifyCode: that.checkForm.code
          }
        );
      }
      loginData.then(function(res) {
        if(res.status==200){
          localStorage.removeItem("preActive");
          localStorage.removeItem("preEmail");
          localStorage.removeItem("preEmailPass");
          localStorage.removeItem("preNativeCode");
          localStorage.removeItem("preMobile");
          localStorage.removeItem("prePassword");
          if(res.data.success){
            that.$message.success(that.$t("error.regSucess"));
            setTimeout(()=>{
              that.$router.push('/login');
            },1000);
          }else{
            that.$message.error(that.$t('systemError.'+res.data.error.code));
            return false;
          }
        }
      })
    },
    close(){
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit('setLastpage',"/minoption");
      this.$router.push('/minoption');
    },
    back(){
      localStorage.setItem("lastPage", "/register");
      this.$store.commit('setLastpage',"/register");
      this.$router.push('/register');
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCode() {
      let that = this;
      let getCodeDate = "";
      if (that.activeName == "email") {
        getCodeDate = this.axios.post(
          `${process.env.BASE_URL}/user-api/user/sendVerifyCode/email`,
          {
            verifyCodeType: 1,
            email: that.emailForm.email
          }
        );
      } else {
        getCodeDate = this.axios.post(
          `${process.env.BASE_URL}/user-api/user/sendVerifyCode/mobile`,
          {
            verifyCodeType: 1,
            nativeCode: that.phoneForm.areaNum,
            mobile: that.phoneForm.phone
          }
        );
      }
      getCodeDate.then(function(res) {
        that.canNext = true;
        that.noSend = false;
        if (res.data.success) {
          const TIME_COUNT = 60;
          that.noSend = false;
          if (!that.timer) {
            that.count = TIME_COUNT;
            that.show = false;
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= TIME_COUNT) {
                that.count--;
              } else {
                that.noSend = true;
                clearInterval(that.timer);
                that.timer = null;
              }
            }, 1000);
          }
        }else{
          that.$message.error(that.$t('systemError.'+res.data.error.code));
        }
      });
    }
  },
  watch: {
    $route() {
      let that = this;
      if(that.$route.hash=="#checkCode"){
        that.canNext=true;
      }else{
        that.canNext=false;
      }
    }
  }
};
</script>

