<template>
  <el-container direction="vertical">
    <el-main class="no-page">
      <div class="title">个人资料</div>
      <i class="el-icon-back header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col class="box t-c">
          <span class="personal-logo" @click="showSelect=true">
            <img :src="avatar_tx" />
          </span>
          <div class="pt-10">{{ user_name }}</div>
          <div class="pt-20">
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">昵称</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">取个昵称吧</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">实名认证</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">
                <span :class="{'c-orange':kycState!=2}">{{ $t('kyc.state-'+kycState) }}</span>
              </el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">性别</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">男</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">出生年月</el-col>
              <el-col :span="18" class="c-fff t-r pr-10 ff-sbrm">1990.03</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">地区</el-col>
              <el-col :span="18" class="c-fff t-r pr-10">中国台湾</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">邮箱</el-col>
              <el-col :span="18" class="c-fff t-r pr-10 ff-sbrm">{{ email }}</el-col>
            </el-row>
            <el-row class="info-input">
              <el-col class="c-gray t-l pl-10" :span="6">手机</el-col>
              <el-col :span="18" class="c-fff t-r pr-10 ff-sbrm">{{ mobile }}</el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="select-avatar-wrap" v-show="showSelect">
        <div class="hiddenSelect" @click="showSelect=false"></div>
        <div class="select-avatar-box">
          <div class="select-title">请选择头像</div>
          <el-row class="select-content">
            <el-col :span="6" v-for="count in 123" :key="count">
              <span
                class="select-list"
                :class="{hasSelect:nowSelect==count}"
                @click="selectAvatar(count)"
              >
                <img :src="'/tx/tx'+count+'.jpg'" />
                <i class="el-icon-s-flag"></i>
              </span>
            </el-col>
          </el-row>
          <div class="submitBt">
            <el-link class="btn-orange btn" @click="changeUserAvatar()">
              <i class="figure figure-lt"></i>
              <i class="figure figure-rt"></i>
              <i class="figure figure-lb"></i>
              <i class="figure figure-rb"></i>
              <span class="c-orange">确认选择</span>
            </el-link>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<style>
.info-input{
  line-height: 40px;
  height:40px;
}
.el-main{
    overflow:hidden !important;
    height:100vh;
}
</style>

<script>
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
      auth: store.state.auth,
      avatar_tx: `/tx/tx${data.data.avatar}.jpg`,
      user_name: data.data.email || data.data.mobile,
      kycState: data.data.kycState,
      email: data.data.email || "未填写",
      mobile: data.data.mobile || "未填写",
      showSelect: false,
      nowSelect: null
    };
  },
  methods: {
    close() {
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    },
    selectAvatar(count) {
      this.nowSelect = count;
    },
    changeUserAvatar() {
      let that = this;
      let postId = that.axios.post(
        `${process.env.BASE_URL}/user-api/user-info/account/setAvatar`,
        {
          userId: "[user_id]",
          avatar: that.nowSelect
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: that.auth
          }
        }
      );
      postId.then(res => {
        if (res.status == 200) {
          console.log(res.data);
          if (res.data.success) {
            that.$message.success('头像修改成功');
            that.avatar_tx=`/tx/tx${that.nowSelect}.jpg`;
            localStorage.setItem("avatar", that.nowSelect);
            that.showSelect=false;
          } else {
            that.$message.error(that.$t("systemError." + res.data.error.code));
          }
        } else {
          that.$message.error(that.$t("error.errorNet"));
        }
      });
    }
  }
};
</script>

