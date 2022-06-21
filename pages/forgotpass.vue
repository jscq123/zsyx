<template>
  <el-container direction="vertical">
    <el-main>
      <i class="el-icon-back" @click="back()"></i>
      <div class="title">{{ $t('forgotpass.title') }}</div>
      <i class="el-icon-close header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col>
          <div class="box" v-if="!canNext">
            
            <!-- <div class="login-title-tips">{{ $t('forgotpass.titleTips') }}</div> -->
            <!-- <el-tabs class="mt-40" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('forgotpass.email')" name="email"> -->
                <el-form ref="emailForm" :rules="rules" :model="emailForm">
                  <el-form-item prop="email">
                    <el-input v-model="emailForm.email" :placeholder="$t('forgotpass.emailInput')"></el-input>
                  </el-form-item>
                  <el-form-item class="form-button-box">
                    <!-- <el-button
                      type="primary"
                      @click="submitForm('emailForm')"
                    >{{ $t('forgotpass.next') }}</el-button> -->
                    <span class="btn btn-orange login-btn" @click="submitForm('emailForm')" >
                      <i class="figure figure-lt"></i>
                      <i class="figure figure-rt"></i>
                      <i class="figure figure-lb"></i>
                      <i class="figure figure-rb"></i>
                      {{ $t('forgotpass.next') }}
                    </span>

                  </el-form-item>
                </el-form>
              <!-- </el-tab-pane> -->
              <!-- phone area -->
              <!-- <el-tab-pane :label="$t('forgotpass.phone')" name="phone">
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
                          :placeholder="$t('forgotpass.phoneInput')"
                          class="phone-number"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item class="form-button-box">
                    <span class="btn btn-orange login-btn" @click="submitForm('phoneForm')" >
                      <i class="figure figure-lt"></i>
                      <i class="figure figure-rt"></i>
                      <i class="figure figure-lb"></i>
                      <i class="figure figure-rb"></i>
                      {{ $t('forgotpass.next') }}
                    </span>
                  </el-form-item>
                </el-form>
              </el-tab-pane> -->
            </el-tabs>
          </div>
          <!-- 发送验证区域 -->
          <div class="box" v-else>
            <div class="login-title">
              <!-- <span class="back" @click="backPage()">
                <i class="el-icon-back"></i>
              </span> -->
              {{ $t('forgotpass.verification') }}
            </div>
            <div>
              {{ $t('forgotpass.verifiTips') }}&nbsp;
              <span
                v-if="activeName=='email'"
              >{{ $t('forgotpass.email') }}&nbsp;{{ emailForm.email }}</span>
              <span
                v-else
              >{{ $t('forgotpass.phone') }}&nbsp;{{ phoneForm.areaNum}} {{ phoneForm.phone }}</span>
            </div>
            <el-form ref="checkForm" :rules="rules" :model="checkForm">
              <el-form-item prop="code">
                <el-input
                  v-model="checkForm.code"
                  maxlength="6"
                  :placeholder="$t('forgotpass.codeInput')"
                >
                  <span class="send-code" slot="suffix">
                    <span
                      v-if="noSend"
                      class="send-code-btn"
                      @click="getCode"
                    >{{ $t('forgotpass.sendCode') }}</span>
                    <span v-else>
                      {{ $t('forgotpass.countTips') }}
                      <span>{{ count }}</span>s
                    </span>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input
                  :type="checkForm.passShow"
                  v-model="checkForm.pass"
                  :placeholder="$t('forgotpass.passwordInput')"
                >
                  <i
                    slot="suffix"
                    :class="{ 'el-icon-view-open': checkForm.passShow=='text' }"
                    class="el-input__icon el-icon-view"
                    @click="(checkForm.passShow=='password')?checkForm.passShow='text':checkForm.passShow='password'"
                  ></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input
                  :type="checkForm.checkPassShow"
                  v-model="checkForm.checkPass"
                  :placeholder="$t('forgotpass.checkpassword')"
                >
                  <i
                    slot="suffix"
                    :class="{ 'el-icon-view-open': checkForm.passShow=='text' }"
                    class="el-input__icon el-icon-view"
                    @click="(checkForm.checkPassShow=='password')?checkForm.checkPassShow='text':checkForm.checkPassShow='password'"
                  ></i>
                </el-input>
              </el-form-item>
              <el-form-item class="form-button-box">
                <span class="btn btn-orange login-btn" @click="submitForm('checkForm')" >
                  <i class="figure figure-lt"></i>
                  <i class="figure figure-rt"></i>
                  <i class="figure figure-lb"></i>
                  <i class="figure figure-rb"></i>
                  {{ $t('forgotpass.confirm') }}
                </span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style>
html .el-form .el-input__inner{
  height:40px;
}
.el-main{
  height:100vh;
}
.el-input__suffix{
  top:-10px;
}
.login-btn{
  line-height: 40px;
  height:40px;
}
.send-code .send-code-btn{
  color:#fff;
}
.send-code{
  margin-top:10px;
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
          callback(new Error("密码仅由英文字母，数字以及下划线组成"));
        } else if (value.length > 20 || value.length < 8) {
          callback(new Error("密码应该大于8位小于20位"));
        } else {
          if (this.checkForm.checkPass !== "") {
            this.$refs.checkForm.validateField("checkPass");
          }
          callback();
        }
      }
    };
    var validatePhone = (rule, value, callback) => {
      const reg = /\b\d{6,16}/g;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("请输入正确的电话号码"));
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
    var isPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.checkForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      canNext: false,
      rememberUser: false,
      activeName: "email",
      emailForm: {
        email: ""
      },
      phoneForm: {
        areaNum: "86",
        phone: ""
      },
      checkForm: {
        code: "",
        pass: "",
        checkPass: "",
        passShow: "password",
        checkPassShow: "password"
      },
      rules: {
        email: [
          {
            required: true,
            message: this.$i18n.t("error.unable"),
            trigger: "blur"
          },
          {
            type: "email",
            message: this.$i18n.t("error.rightEmail"),
            trigger: ["blur"]
          }
        ],
        phone: [
          {
            required: true,
            message: this.$i18n.t("error.emptyPhone"),
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        pass: [
          {
            required: true,
            message: this.$i18n.t("error.emptyPass"),
            trigger: "blur"
          },
          { validator: isPassword, trigger: "blur" }
        ],
        checkPass: [{ validator: isPassword2, trigger: "blur" }],
        code: [
          {
            required: true,
            message: this.$i18n.t("error.emptyCode"),
            trigger: "blur"
          },
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
      noSend: false,
      count: "",
      timer: null
    };
  },
  created() {
    let that = this;
    let lang = localStorage.getItem("lang");
    localStorage.setItem("lastpage", "/withdraw");
    if (lang) {
      that.$i18n.locale = lang;
    }
  },
  mounted: function() {
    let that = this;
    let areacode = this.axios.get("/areacode.json");
    areacode.then(res => {
      if (res.status == 200) {
        that.areaOption = res.data;
      }
    });
  },
  filters: {},
  methods: {
    /*提交进行判断的函数 */
    submitForm: function(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName != "checkForm") {
            that.canNext = true;
            that.noSend = true;
            that.$router.push("#checkCode");
            that.getCode();
          } else {
            let resetPass = "";
            if (that.activeName == "email") {
              resetPass = this.axios.post(
                `${process.env.BASE_URL}/user-api/user/reset/email`,
                {
                  email: that.emailForm.email,
                  password: that.checkForm.pass,
                  verifyCode: that.checkForm.code
                }
              );
            } else {
              resetPass = this.axios.post(
                `${process.env.BASE_URL}/user-api/user/reset/mobile`,
                {
                  nativeCode: that.phoneForm.areaNum,
                  mobile: that.phoneForm.phone,
                  password: that.checkForm.pass,
                  verifyCode: that.checkForm.code
                }
              );
            }
            resetPass.then(function(res) {
              if (res.data.success) {
                that.$message.success(that.$t("forgotpass.success"));
                setTimeout(() => {
                  that.$router.push("/login");
                }, 2000);
              } else {
                that.$message.error(that.$t("systemError." + res.data.error.code));
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login: function() {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    backPage() {
      this.canNext = false;
    },
    getCode() {
      let that = this;
      let getCodeDate = "";
      if (!this.noSend) {
        return false;
      }
      if (that.activeName == "email") {
        getCodeDate = this.axios.post(
          `${process.env.BASE_URL}/user-api/user/sendVerifyCode/email`,
          {
            verifyCodeType: 2,
            email: that.emailForm.email
          }
        );
      } else {
        getCodeDate = this.axios.post(
          `${process.env.BASE_URL}/user-api/user/sendVerifyCode/mobile`,
          {
            verifyCodeType: 2,
            nativeCode: that.phoneForm.areaNum,
            mobile: that.phoneForm.phone
          }
        );
      }
      getCodeDate.then(function(res) {
        if (res) {
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
        }
      });
    },
    back() {
      this.$router.back();
    },
    close() {
      localStorage.setItem("lastpage", "/minoption");
      this.$router.push("/minoption");
    }
  },
  watch: {
    $route() {
      let that = this;
      if (that.$route.hash == "#checkCode") {
        that.canNext = true;
      } else {
        that.canNext = false;
      }
    }
  }
};
</script>
