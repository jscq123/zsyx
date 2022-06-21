<template>
  <el-container direction="vertical">
    <el-main class="">
      <div class="title">设置</div>
      <i class="el-icon-back header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col class="box t-l">
          <div class="pt-20">
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">语言</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">
                  <span class="el-dropdown-link">
                    <span>{{ $t('links.traditional') }}</span>
                  </span>
              </el-col>
              <!-- <el-col :span="18" class="c-fff t-r pr-10">
                <el-dropdown
                  @command="handleCommand"
                  placement="bottom"
                  :tabindex="2"
                  trigger="click"
                >
                  <span class="el-dropdown-link">
                    <span v-if="$i18n.locale=='zh'">{{ $t('links.chinese') }}</span>
                    <span v-if="$i18n.locale=='en'">{{ $t('links.english') }}</span>
                    <span v-if="$i18n.locale=='tr'">{{ $t('links.traditional') }}</span>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="en">{{ $t('links.english') }}</el-dropdown-item>
                    <el-dropdown-item command="zh">{{ $t('links.chinese') }}</el-dropdown-item>
                    <el-dropdown-item command="tr">{{ $t('links.traditional') }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col> -->
            </el-row>
            <!-- <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="12">交易音效开关</el-col>
              <el-col :span="12" class="c-fff t-r pr-10">
                <el-switch v-model="soundSwitch" active-color="#01EEEA" disabled inactive-color="#999"></el-switch>
              </el-col>
            </el-row> -->
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="12">交易结算弹窗开关</el-col>
              <el-col :span="12" class="c-fff t-r pr-10">
                <el-switch @change="isOpenTradePop" v-model="tradePop" active-color="#01EEEA" inactive-color="#f60"></el-switch>
              </el-col>
            </el-row>
            <el-row class="info-input changepass-setting-btn">
              <el-col class="c-fff t-l pl-10" :span="24"><nuxt-link to="/changepass">修改密码</nuxt-link></el-col>
            </el-row>
            <el-row class="info-input" @click.native="logout()">
              <el-col class="c-fff t-l pl-10" :span="24">{{ $t('minoption.login_out_link') }}</el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="version ff-pfscr">版本号 V1.0</div>
    </el-main>
  </el-container>
</template>
<style>
.changepass-setting-btn a, .changepass-setting-btna:active, .changepass-setting-btn a:hover {
  color: #ffffff;
}
.info-input{
  height:40px;
  line-height:40px;
}
.version{
  bottom: 24px;
  font-size:13px;
  color:rgba(153,153,153,1);
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  left: 50%;
}
</style>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  async asyncData({ store, req, params, redirect }) {
    return {
      lang: store.state.locale,
      soundSwitch:false,
      tradePop:true
    };
  },
  methods: {
    close() {
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    },
    // 切换语言
    handleCommand(command) {
      localStorage.setItem("lang", command);
      this.$i18n.locale = command;
      Cookie.set("lang", command);
      this.$store.commit("setLang", command);
    },
    isOpenTradePop(){
      if(this.tradePop){
        localStorage.setItem("tradePopShows", 1);
      }else{
        localStorage.setItem("tradePopShows", 2);
      }
    },
    logout(url) {
      console.log(url);
      // return false;
      this.clearLoginInfo();
      if (url) {
        this.$router.push(url);
      } else {
        this.$router.push("/login");
      }
    },
    clearLoginInfo() {
      Cookie.remove("auth");
      Cookie.remove("jfSelected");
      this.$store.commit("setAuth", null);
      localStorage.removeItem("auth");
      localStorage.removeItem("accountName");
    },
    mounted:function(){
    }
  }
};
</script>

