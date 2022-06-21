<template>
  <el-container direction="vertical">
    <el-main class="no-page">
      <div class="title">{{$t('customerservice.tit')}}</div>
      <i class="el-icon-back header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col class="t-l">
          <!-- <el-row class="bd-b">
            <el-col :span="6">
              <span class="personal-logo">
                <img src="/img/logo512.png" alt="">
              </span>
            </el-col>
            <el-col :span="18">
              <div class="pt-20 f-16">{{ userId | showUserId(userId) }}</div>
              <div class="f-13 c-gray">{{ user_name }}</div>
            </el-col>
          </el-row> -->
          <!-- <div class="pt-10">
            <el-link class="btn-orange btn">
                <i class="figure figure-lt"></i>
                <i class="figure figure-rt"></i>
                <i class="figure figure-lb"></i>
                <i class="figure figure-rb"></i>
                <span class="c-orange">{{$t('customerservice.tit')}}</span>
            </el-link>
          </div> -->
          <div class="pt-20" style="padding-top:30px">
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10 c-orange" :span="6">{{ $t("customerservice.tel") }}</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">+886 0971 634 915</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10 c-orange" :span="6">{{ $t("customerservice.email") }}</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">service@rwdg.io</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10 c-orange" :span="6">whatsapp</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">rwservice</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10 c-orange" :span="6">line</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">rwservice</el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style scoped>
.el-main{
  background-color:transparent;
}
.info-input{
  height: 40px;
  line-height:40px;
}
</style>

<script>
import { formatDate } from "../static/date.js";
const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";
export default {
    middleware: "authenticated",
    // async asyncData({ store, req, params, redirect }) {
    //   let { data } = await axios.post(
    //     `${process.env.BASE_URL}/user-api/user-info/account/detail`,
    //     {
    //       userId: "[user_id]"
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         token: store.state.auth
    //       }
    //     }
    //   );
    //   return {
    //     data:data.data,
    //     auth: store.state.auth,
    //     avatar_tx: `/tx/tx${data.data.avatar}.jpg`,
    //     user_name: data.data.email || data.data.mobile,
    //     kycState: data.data.kycState,
    //     practice:0,
    //     userId:data.data.userId
    //   };
    // },
  methods: {
    close() {
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    }
  },
  // filters:{
  //   showUserId: function(userId){
  //     return 10000000 + parseInt(userId);
  //   },
  // }
};
</script>

