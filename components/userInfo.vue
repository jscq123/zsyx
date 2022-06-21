<template>
  <el-row>
    <el-col :span="6">
      <span class="avatar_photo ml--32">
        <!-- <img :src="avatar_tx"> -->
        <img src="/img/logo512.png" alt="">
      </span>
    </el-col>
    <el-col :span="18" class="t-l ml--20">
      <div class="pt-5 f-14 c-fff ff-pfscr">
        平台用户
        <span class="verfied-type has-verfied verfied-type-icon">
          <img src="/img/rz.png">
        </span>
      </div>
      <div class="pt-5 c-gray ff-pfscr f-11">{{user_name}}</div>
    </el-col>
    <div class="level-con f-14 ff-pfscr">
      <i></i>
      {{$t('widthdraw.level')}}
    </div>
  </el-row>
</template>
<script>
import { formatDate } from "../static/date.js";
const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "axios";
export default {
  middleware: "authenticated",
  data() {
    return {
      avatar_tx: "",
      user_name: ""
    };
  },
  mounted() {
    this.loadUserInfo();
    this.$store.commit("setLastpage", "/withdrawnew");
    // console.log(this.result);
    this.accountName = localStorage.getItem("accountName");
    // console.log(that.data.user_name);
    // console.log(that.avatar_tx);
  },
  methods: {
    close() {
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    },
    loadUserInfo() {
      let that = this;
      let token = localStorage.getItem("auth");
      this.axios
        .post(
          `${process.env.BASE_URL}/user-api/user-info/account/detail`,
          {
            userId: "[user_id]"
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: token
            }
          }
        )
        .then(res => {
          that.avatar_tx = `/tx/tx${res.data.data.avatar}.jpg`;
          that.user_name = res.data.data.email || res.data.data.mobile;
        });
    }
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
};
</script>
<style>
.verfied-type-icon {
  background-color: transparent;
}
.verfied-type-icon {
  width: 11px;
  height: 10px;
  margin-left: -2px;
}
.bg-b {
  background-color: #262b2c;
}
.member-level-info-table {
  margin-bottom: 50px;
}
.member-level-info-table table {
  width: 100%;
  border: 0;
  font-family: pfscr;
  font-size: 12px;
  border-collapse: collapse;
}
.member-level-info-table table th {
  line-height: 30px;
  height: 30px;
}
.member-level-info-table table td {
  height: 45px;
}
.cre-con-tit {
  line-height: 38px;
}
.cre-con-info-box {
  height: 60px;
  padding: 15px 0;
}
.menu-account {
  margin: 0;
}
.avatar {
  position: relative;
}
</style>
