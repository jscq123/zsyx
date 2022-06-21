<template>
  <el-container direction="vertical">
    <div class="avatar m-20">
      <userInfo></userInfo>
    </div>
  </el-container>
</template>

<script>
import userInfo from "../components/userInfo";
export default {
  data() {
    return {};
  },
  components: {
    userInfo
  }
};
</script>


