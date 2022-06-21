<template>
  <el-container direction="vertical">
    <el-main class="no-page">
      <i class="el-icon-close header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col class="box">
          <div class="t-c f-18">
            <div class="pt-40"><i class="el-icon-time f-48"></i></div>
            <div class="pt-20">{{ $t('kyc.information_submitted') }}</div>
            <div>{{ $t('kyc.wait-tips') }}</div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  methods:{
    close() {
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    },
  }
};
</script>

