<template>
  <el-container direction="vertical">
    <el-main>
      <i class="el-icon-back" @click="back()"></i>
      <div class="title">{{ $t('accounts.resetPassowrd') }}</div>
      <el-row type="flex" justify="center" class="account-bg">
        <el-col>
          <div class="box">
            <div class="account-form">
              <el-form ref="passForm" :rules="rules" :model="passForm">
                <el-form-item prop="oldPass">
                  <el-input
                    :type="passForm.oldPassShow"
                    v-model="passForm.oldPass"
                    :placeholder="$t('accounts.oldPass')"
                  >
                    <i
                      slot="suffix"
                      :class="{ 'el-icon-view-open': passForm.oldPassShow=='text' }"
                      class="el-input__icon el-icon-view"
                      @click="(passForm.oldPassShow=='password')?passForm.oldPassShow='text':passForm.oldPassShow='password'"
                    ></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="newPass">
                  <el-input
                    :type="passForm.newPassShow"
                    v-model="passForm.newPass"
                    :placeholder="$t('accounts.newPass')"
                  >
                    <i
                      slot="suffix"
                      :class="{ 'el-icon-view-open': passForm.newPassShow=='text' }"
                      class="el-input__icon el-icon-view"
                      @click="(passForm.newPassShow=='password')?passForm.newPassShow='text':passForm.newPassShow='password'"
                    ></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input
                    :type="passForm.checkPassShow"
                    v-model="passForm.checkPass"
                    :placeholder="$t('accounts.confirmPass')"
                  >
                    <i
                      slot="suffix"
                      :class="{ 'el-icon-view-open': passForm.checkPassShow=='text' }"
                      class="el-input__icon el-icon-view"
                      @click="(passForm.checkPassShow=='password')?passForm.checkPassShow='text':passForm.checkPassShow='password'"
                    ></i>
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-20">
                  <!-- <el-button
                    type="primary"
                    :class="{'is-login':isLogining}"
                    @click="onSubmit"
                  >确认修改</el-button>-->

                  <span class="btn btn-orange login-btn" @click="onSubmit">
                    <i class="figure figure-lt"></i>
                    <i class="figure figure-rt"></i>
                    <i class="figure figure-lb"></i>
                    <i class="figure figure-rb"></i>
                    确认修改
                  </span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style>
.el-main {
  overflow: hidden;
  height: 100vh;
}
html .el-form .el-input__inner {
  height: 40px;
}
html .el-input__icon {
  line-height: 40px !important;
}
.login-btn {
  height: 40px;
  line-height: 40px;
}
</style>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticated",
  data() {
    var newPassword = (rule, value, callback) => {
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
    var isPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isLogining: false,
      passForm: {
        oldPass: "",
        oldPassShow: "password",
        newPass: "",
        newPassShow: "password",
        checkPass: "",
        checkPassShow: "password"
      },
      rules: {
        oldPass: [
          { required: true, message: "请输入之前的密码", trigger: "blur" }
        ],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: newPassword, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: isPassword2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    stoptest: function() {
      // let that = this;
      // that.$message.success(that.$t("forgotpass.success"));
      //   setTimeout(() => {
      //     alert("1");
      //   }, 2000);

    },
  
    onSubmit: function() {
      let that = this;
      that.isLogining = true;
      if (!that.auth) {
        let auth = localStorage.getItem("auth");
        that.auth = auth;
      }
      that.$refs["passForm"].validate(valid => {
        if (valid) {
          let param = {
            oldPassword: that.passForm.oldPass,
            newPassword: that.passForm.newPass,
            userId: "[user_id]"
          };
          /*test*/
          // that.stoptest();
          // return false;
          let loginData = that.axios.post(
            `${process.env.BASE_URL}/user-api/user-info/account/resetPassword`,
            param,
            {
              headers: {
                "Content-Type": "application/json",
                token: that.auth
              }
            }
          );
          loginData.then(res => {
            that.isLogining = false;
            if (res.status == 200) {
              if (res.data.success) {
                // that.$alert("密码修改成功", "提示", {
                //   confirmButtonText: "确定",
                //   callback: action => {
                //     that.$router.push("/option");
                //   }
                // });
                 that.$message.success("密码修改成功");
                  setTimeout(() => {
                   that.$router.push("/option");
                  }, 2000);
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
          return false;
        }
      });
    },
    back() {
      this.$router.back();
    }
  }
}
</script>
