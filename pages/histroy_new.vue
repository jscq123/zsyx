<template>
  <div>
    <div class="history-box-con">
      <component :is="currentView"></component>
    </div>
    <div class="history-foot">
      <div
        class="el-col-12 c-fff"
        v-for="(t,index) in tabs"
        :class="{selected:active==index}"
        @click="toggletab(index,t.view)"
      >{{t.type}}</div>
      <!-- <div class="el-col-12">个人交易</div> -->
    </div>
  </div>
</template>
<style>
.history-foot div{
    text-align: center;
}
.history-foot .selected {
  color: blueviolet;
}
</style>

<script>
import personJy from "~/pages/personal_jy.vue";
import tranactionSum from "~/pages/tranaction_sum.vue";
export default {
  components: {
    personJy,
    tranactionSum
  },
  data() {
    return {
      tabs: [
        {
          type: "交易汇总",
          view: "tranactionSum"
        },
        {
          type: "个人交易",
          view: "personJy"
        }
      ],
      currentView: "tranactionSum",
      active: 0
    };
  },
  methods: {
    toggletab(i, v) {
      this.currentView = v;
      this.active = i;
    }
  }
};
</script>
