<template>
  <el-container direction="vertical">
    <el-main class="no-page">
      <div class="title">{{ $t('login.title') }}</div>
      <i class="el-icon-back header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col>
          <div class="box">
            <div class="wecome">
              <div class="wecome-tit">
                <span>{{ $t('login.wecome-tit') }}</span>
                <p>{{ $t('login.company') }}</p>
              </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('login.email')" name="email">
                <el-form ref="emailForm" :rules="rules" :model="emailForm">
                  <el-form-item prop="email" style="margin: 28px 0 13px;">
                    <el-input
                      type="email"
                      v-model="emailForm.email"
                      :placeholder="$t('login.emailInput')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="pass">
                    <el-input
                      :type="emailForm.passShow"
                      v-model="emailForm.pass"
                      :placeholder="$t('login.passwordInput')"
                    >
                      <i
                        slot="suffix"
                        :class="{ 'el-icon-view-open': emailForm.passShow=='text' }"
                        class="el-input__icon el-icon-view"
                        @click="(emailForm.passShow=='password')?emailForm.passShow='text':emailForm.passShow='password'"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item class="form-button-box" style="margin: 28px 0 13px;">
                    <span class="btn btn-orange login-btn" @click="submitForm('emailForm')">
                      <i class="figure figure-lt"></i>
                      <i class="figure figure-rt"></i>
                      <i class="figure figure-lb"></i>
                      <i class="figure figure-rb"></i>
                      {{ $t('login.loginNow') }}
                    </span>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <!-- <el-tab-pane :label="$t('login.phone')" name="phone">
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
                          type="tel"
                          v-model="phoneForm.phone"
                          :placeholder="$t('login.phoneInput')"
                          class="phone-number"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item prop="pass">
                    <el-input
                      :type="phoneForm.passShow"
                      v-model="phoneForm.pass"
                      :placeholder="$t('login.passwordInput')"
                    >
                      <i
                        slot="suffix"
                        :class="{ 'el-icon-view-open': phoneForm.passShow=='text' }"
                        class="el-input__icon el-icon-view"
                        @click="(phoneForm.passShow=='password')?phoneForm.passShow='text':phoneForm.passShow='password'"
                      ></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item class="form-button-box">
                    <span class="btn btn-orange login-btn" @click="submitForm('phoneForm')">
                      <i class="figure figure-lt"></i>
                      <i class="figure figure-rt"></i>
                      <i class="figure figure-lb"></i>
                      <i class="figure figure-rb"></i>
                      {{ $t('login.loginNow') }}
                    </span>
                  </el-form-item>
                </el-form>
              </el-tab-pane> -->
            </el-tabs>
            <div class="pt-20">
              <el-link
                type="primary"
                href="/forgotpass"
                class="forget-pass"
              >{{ $t('login.forgotPass') }}</el-link>
              <span class="c-gray">
                {{ $t('login.noAccount') }}
                <nuxt-link type="primary" to="/register">{{ $t('login.register') }}</nuxt-link>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="login-footer" style="display:none;">
        <span class="f-13 ff-pfscr c-gray mr-25">使用其他登录方式</span>
        <i class="facebook mr-25"></i>
        <i class="google"></i>
      </div>
    </el-main>
  </el-container>
</template>
<style>
@import "../static/css/welcome.css";
html .el-form-item{

}
html .el-form-item{
  margin-bottom:8px
}

html .el-tabs__header{
    display: none;
  }
  
  html .el-form .el-input__inner{
    height:40px;
  }
.login-footer {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  width: 200px;
}
.login-footer * {
  display: inline-block;
}
.login-footer i {
  width: 18px;
  height: 18px;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  top: 3px;
}
.login-footer i.facebook {
  background-image: url(/img/facebook_icon@2x.png);
}
.login-footer i.google {
  background-image: url(/img/google_icon@2x.png);
}
.account-bg {
  min-height: calc(100vh - 50px);
}
.wecome {
  position: inherit;
  padding: 0;
  margin-bottom: 40px;
}
.box {
  padding-top: 80px;
}
.mr-25 {
  margin-right: 25px;
}
html .el-form .el-input__inner {
  color: rgba(102, 102, 102, 1);
  background: rgba(255, 255, 255, 0.05);
}
html .el-input__icon {
  line-height: 0px !important;
}
</style>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";
export default {
  asyncData({ store, req, params, redirect }) {
    store.commit("setLastpage", "/login");
    let backurl = "/minoption";
    if (params.backurl) {
      backurl = params.backurl;
    }
    return {
      auth: store.state.auth,
      backurl: backurl
    };
  },
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
    var validatePhone = (rule, value, callback) => {
      const reg = /\b\d{6,16}/g;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error(this.$i18n.t("error.rightPhone")));
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
      rememberUser: false,
      activeName: "email",
      isLogining: false,
      emailForm: {
        email: "",
        passShow: "password",
        pass: ""
      },
      phoneForm: {
        areaNum: "86",
        phone: "",
        passShow: "password",
        pass: ""
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
        ]
      },
      fullscreenLoading: true,
      areaOption: {
        en: "China",
        zh: "中国",
        locale: "CN",
        code: 86
      }
    };
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
      that.isLogining = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let loginData = null;
          if (that.activeName == "email") {
            loginData = this.axios.post(
              `${process.env.BASE_URL}/auth/login/email`,
              {
                email: that.emailForm.email,
                password: that.emailForm.pass
              }
            );
          } else {
            loginData = this.axios.post(
              `${process.env.BASE_URL}/auth/login/mobile`,
              {
                nativeCode: that.phoneForm.areaNum,
                mobile: that.phoneForm.phone,
                password: that.phoneForm.pass
              }
            );
          }
          loginData.then(res => {
            that.isLogining = false;
            if (res.status == 200) {
              if (res.data.success) {
                const auth = res.data.data;
                this.$store.commit("setAuth", auth); // mutating to store for client rendering
                this.$store.commit(
                  "setAccount",
                  that.activeName == "email"
                    ? that.emailForm.email
                    : that.phoneForm.areaNum + "" + that.phoneForm.phone
                ); // mutating to store for client rendering
                Cookie.set("auth", auth); // saving token in cookie for server rendering
                localStorage.setItem("auth", auth);
                localStorage.setItem(
                  "accountName",
                  that.activeName == "email"
                    ? that.emailForm.email
                    : that.phoneForm.areaNum + "" + that.phoneForm.phone
                );

                localStorage.setItem("lastPage", this.backurl);
                this.$store.commit("setLastpage", this.backurl);
                that.$router.push(this.backurl);
              } else {
                that.$message.error(
                  that.$t("systemError." + res.data.error.code)
                );
              }
            } else {
              that.$message.error(that.$t("error.errorNet"));
            }
          });
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
    close() {
      this.$store.commit("setLastpage", this.backurl);
      this.$router.push(this.backurl);
    }
  }
};
</script>

