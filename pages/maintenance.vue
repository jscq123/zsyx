<template>
  <el-container direction="vertical">
    <el-main class="maintenance">
      <div class="v-c">
        <div class="t-c">
          <svg
            t="1571326925131"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1282"
            width="128"
            height="128"
          >
            <path d="M128.477 191.784h769.101v64.271H128.477z" p-id="1283" fill="#013DC5" />
            <path
              d="M128.477 256.054h64.012V831.72h-64.012zM832.614 255.828h64.964v575.893h-64.964z"
              p-id="1284"
              fill="#013DC5"
            />
            <path
              d="M130.334 319.621h766.278v64.419H130.334zM192.49 639.146h649.443v64.487H192.49zM310.427 412.964L446.87 549.405l-44.649 44.649-136.44-136.442zM475.283 412.962l136.441 136.441-44.648 44.649L430.634 457.61zM631.559 412.961l136.44 136.442-44.648 44.648-136.44-136.441z"
              p-id="1285"
              fill="#013DC5"
            />
          </svg>
        </div>
        <div class="c-fff f-18 t-c">{{ $t('error.maintenance_title') }}</div>
        <div class="c-14 t-c pt-10">{{ $t('error.maintenance_sec') }}</div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {};
</script>

<style>

</style>
