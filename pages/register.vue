<template>
  <el-container direction="vertical">
    <el-main class="no-page">
      <div class="title">{{ $t('register.title') }}</div>
      <i class="el-icon-back header" @click="back()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col>
          <div class="box">
            <el-form ref="emailForm" :rules="rules" :model="emailForm">
              <!-- email -->
              <el-form-item prop="email">
                <el-input v-model="emailForm.email" :placeholder="$t('register.emailInput')"></el-input>
              </el-form-item>
              <!-- vertifycode -->
              <el-form-item prop="code">
                <el-input
                  v-model="emailForm.code"
                  maxlength="6"
                  :placeholder="$t('forgotpass.codeInput')"
                >
                  <span class="send-code" slot="suffix" >
                    <span
                      v-if="noSend"
                      class="send-code-btn"
                      style="color:#fff;"
                      @click="getCode"
                    >{{ $t('forgotpass.sendCode') }}</span>
                    <!-- <span v-if="noSend" class="send-code-btn" @click="getCode">发送验证码</span> -->
                    <span v-else>
                      <!-- {{ $t('forgotpass.countTips') }} -->
                      {{ $t('forgotpass.countTips') }}
                      <span>{{count}}</span>s
                    </span>
                  </span>
                </el-input>
              </el-form-item>
              <!-- password -->
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="emailForm.pass"
                  :placeholder="$t('register.passwordInput')"
                ></el-input>
              </el-form-item>
              <!-- checkpass -->
              <el-form-item prop="checkpass">
                <el-input
                  type="password"
                  v-model="emailForm.checkpass"
                  :placeholder="$t('register.checkPasswordInput')"
                ></el-input>
              </el-form-item>
              <!-- agreement -->
              <el-form-item class="agreement">
                <!-- <el-checkbox v-model="emailForm.agreement"><span>{{ $t('register.agreement') }}<nuxt-link
                to="/agreement">{{ $t('register.agreement-describe') }}</nuxt-link></span></el-checkbox>-->

                <el-checkbox v-model="emailForm.agreement">
                  <span>
                    {{ $t('register.agreement') }}
                    <nuxt-link to="/agreement">{{ $t('register.agreement-describe') }}</nuxt-link>
                  </span>
                </el-checkbox>
              </el-form-item>
              <el-form-item class="form-button-box">
                <span class="btn btn-orange register-btn" @click="submitForm('emailForm')">
                  <i class="figure figure-lt"></i>
                  <i class="figure figure-rt"></i>
                  <i class="figure figure-lb"></i>
                  <i class="figure figure-rb"></i>
                  {{ $t('register.registerNow') }}
                </span>
              </el-form-item>
            </el-form>
          </div>
          <div class="pt-20 t-c">
            <span class="no-account">
              {{ $t('register.hasAccount') }}
              <nuxt-link type="primary" to="/login">{{ $t('register.login') }}</nuxt-link>
            </span>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style>
html .el-form .el-input__inner {
  height: 40px;
}
.btn {
  height: 40px;
  line-height: 40px;
}
</style>

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
      let prePass = "";
      if (this.activeName == "email") {
        prePass = this.emailForm.pass;
      } else {
        prePass = this.phoneForm.pass;
      }
      if (value === "") {
        callback(new Error(this.$i18n.t("error.checkEmptyPass")));
      } else if (value !== prePass) {
        callback(new Error(this.$i18n.t("error.checkErroePass")));
      } else {
        callback();
      }
    };
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
      activeName: "email",
      areaOption: {
        en: "China",
        zh: "中国",
        locale: "CN",
        code: 86
      },
      count: "",
      timer: null,
      noSend: true,
      emailForm: {
        email: "",
        pass: "",
        checkpass: "",
        code: "",
        agreement: false
      },
      rules: {
        email: [
          {
            required: true,
            message: this.$i18n.t("error.emptyEmail"),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$i18n.t("error.rightEmail"),
            trigger: ["blur"]
          }
        ],
        pass: [
          {
            required: true,
            message: this.$i18n.t("error.emptyPass"),
            trigger: "blur"
          },
          { validator: isPassword, trigger: "blur" }
        ],
        checkpass: [
          {
            required: true,
            message: this.$i18n.t("error.checkEmptyPass"),
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ],
        code: [
          {
            required: true,
            message: this.$i18n.t("error.emptyCode"),
            trigger: "blur"
          },
          { validator: validateCode, trigger: "blur" }
        ]
      }
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
  },
  methods: {
    getCode() {
      let that = this;
      let getCodeDate = "";
      if (that.activeName == "email") {
        let url = `${process.env.BASE_URL}/user-api/user/sendVerifyCode/email`;
        getCodeDate = that.axios.post(url, {
          verifyCodeType: 1,
          email: that.emailForm.email
        });
      }
      getCodeDate.then(res => {
        if (res.data.success) {
          const TIME_COUNT = 60;
          that.noSend = false;
          if (!that.timer) {
            that.count = TIME_COUNT;
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
        } else {
          that.$message.error(that.$t("systemError." + res.data.error.code));
        }
      });
    },
    submitForm: function(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (formName == "emailForm") {
          if (valid) {
            if (!that.$refs[formName].model.agreement) {
              that.$message.error(that.$t("error.checkAgreement"));
              return false;
            }
            // that.getCode();
            that.register();
          }
        }
      });
    },
    register: function() {
      let that = this;
      let registerData = "";
      if (that.activeName == "email") {
        let url = `${process.env.BASE_URL}/user-api/user/register/email`;
        registerData = that.axios.post(url, {
          email: that.emailForm.email,
          password: that.emailForm.pass,
          verifyCode: that.emailForm.code
        });
      }
      registerData.then(function(res) {
        if (res.status == 200) {
          if (res.data.success) {
            that.$message.success(that.$t("error.regSucess"));
            setTimeout(() => {
              that.$router.push("/login");
            }, 3000);
          } else {
            that.$message.error("systemError." + res.data.error.message);
            return false;
          }
        }
      });
    },
    back() {
      this.$router.back();
    }
  }
};
</script>
