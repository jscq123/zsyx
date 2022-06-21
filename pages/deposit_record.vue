<template>
  <el-container direction="vertical" style="height:100vh">
    <el-main>
      <div class="title">{{$t("deposit_record.record")}}</div>
      <i class="el-icon-back header" @click="back()"></i>
      <div class="record-box">
        <ul>
          <li class="deposit-success">
            <el-row>
              <el-col>
                <div class="deposit-message el-col-12" :span="12">充值成功</div>
                <div class="deposit-rwt t-r el-col-12" :span="12">+5864 RWT</div>
              </el-col>
              <el-col>
                <div
                  class="deposit-time el-col-12"
                  :span="12"
                >{{deposit_time | formatMD}} {{ deposit_time | formatMS}}</div>
                <div class="deposit-tb t-r el-col-12" :span="12">金额：760 {{ $t("deposit_record.tb")}}</div>
              </el-col>
            </el-row>
          </li>
          <li class="deposit-fail">
            <el-row>
              <el-col>
                <div class="deposit-message el-col-12">充值失败</div>
                <div class="deposit-rwt t-r el-col-12" :span="12">+5864 RWT</div>
              </el-col>
              <el-col>
                <div
                  class="deposit-time el-col-12"
                  :span="12"
                >{{ deposit_time | formatMS(deposit_time) }}</div>
                <div class="deposit-tb t-r el-col-12">金额：760 {{ $t("deposit_record.tb")}}</div>
              </el-col>
            </el-row>
          </li>
        </ul>
        <!-- pageination -->
        <div class="pageination">
          <el-pagination
            small
            :pager-count="5"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<style scoped>
.deposit-message {
  height: 21px;
  font-size: 15px;
  font-family: pfscr;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 21px;
}
.deposit-rwt {
  height: 17px;
  font-size: 14px;
  font-family: pfscr;
  font-weight: normal;
  color: rgba(255, 174, 0, 1);
  line-height: 17px;
  margin-top: 4px;
}
.deposit-time {
  height: 16px;
  font-size: 13px;
  font-family: sbrm;
  font-weight: normal;
  color: rgba(153, 153, 153, 1);
  line-height: 16px;
}
.deposit-tb {
  height: 18px;
  font-size: 13px;
  font-family: pfscr;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
}
.deposit-fail .deposit-message {
  color: rgba(255, 102, 0, 1);
}
.deposit-fail .deposit-rwt {
  color: rgba(153, 153, 153, 1);
}
.deposit-fail .deposit-tb {
  color: rgba(153, 153, 153, 1);
}
.record-box {
  height: 100%;
  margin-top: 22px;
  /* background-color: #fff; */
}
.record-box ul li {
  padding: 18px 0;
  border-bottom: 1px solid #000;
}
.el-main {
  padding: 20px 20px 0;
  height: 100vh;
}
</style>
<script>
import axios from "axios";
import { formatDate } from "../static/date.js";
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
      deposit_time: "2019-11-14T02:40:31Z",
      historyType: 1,
      historyPageNum: 1,
      historyPageSize: 8,
      historyList: [],
      total:1,
      nowAccountType:""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleCurrentChange(val) {
      this.historyPageNum = val;
      this.getHistory();
    },
    // 测试分页
    getHistory() {
      let that = this;
      if (!that.auth) {
        that.logout("/login");
      }
      // if (type == 1) {
      //   this.showHistory = true;
      // }
      let history = that.axios(
        `${
          process.env.BASE_URL
        }/history-api/history/fund/r/[user_id]/3/1000/${that.historyPageNum}/${that.historyPageSize}/`,
        {
          headers: {
            "Content-Type": "application/json",
            token: that.auth
          }
        }
      );
      history.then(function(response) {
        if (response) {
          if (response.data.success) {
            let datas = response.data.data;
            that.total = response.data.page.totalElements;
            console.log(response);
            console.log(that.historyList,"--that.historyList");
          } else {
            if (response.data.error.code == "GATEWAY_AUTH_004") {
              that.logout();
            }
          }
        } else {
          that.$message.error(that.$t("error.errorNet"));
        }
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
    }
  },
  mounted(){
    this.getHistory()
  }
};
</script>

