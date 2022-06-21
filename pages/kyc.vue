<template>
  <el-container direction="vertical">
    <el-main class="no-page">
      <div class="title">{{ $t('kyc.kyc_title') }}</div>
      <i class="el-icon-close header" @click="close()"></i>
      <el-row type="flex" class="account-bg" justify="center">
        <el-col class="box">
          <!-- <div class="mt-40"> -->
            <div> 
            <el-form
              class="main-form kyc-form"
              enctype="multipart/form-data"
              ref="kyc"
              :rules="rules"
              :model="kyc"
            >
              <el-form-item>
                <el-select
                  v-model="kyc.country"
                  filterable
                  default-first-option
                  :placeholder="(lang=='zh')?'中国':'China'"
                  class="country-select"
                >
                  <el-option
                    v-for="item in countryOption"
                    :key="item.locale"
                    :label="item[lang]"
                    :value="item.code"
                  >
                    <span style="color: #8492a6; font-size: 13px">{{ item[lang] }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="legalName">
                <el-input v-model="kyc.legalName" :placeholder="$t('kyc.legal_name')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="kyc.identityType" placeholder="cn" class="area-select">
                  <el-option
                    v-for="item in idOption"
                    :key="item.locale"
                    :label="item.name"
                    :value="item.code"
                  >
                    <span style="color: #8492a6; font-size: 13px">{{ item.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="identityNo">
                <el-input v-model="kyc.identityNo" :placeholder="$t('kyc.id_card')"></el-input>
              </el-form-item>
              <div class="c-gray">{{ $t('kyc.id_tips') }}</div>
              <el-row class="pt-20" :gutter="20">
                <el-col :span="12">
                  <el-upload
                    class="photo-box"
                    :action="upUrl"
                    :multiple="false"
                    :show-file-list="false"
                    :on-change="function(file){return getFiles(file,'frontImg')}"
                    :auto-upload="false"
                  >
                    <span v-if="kyc.frontImg" class="avatar-img">
                      <img :src="kyc.frontImg">
                    </span>
                    <div v-else>
                      <i class="el-icon-plus"></i>
                      <span class="bk">{{ $t('kyc.front') }}</span>
                    </div>
                  </el-upload>
                </el-col>
                <el-col :span="12">
                  <el-upload
                    class="photo-box"
                    :action="upUrl"
                    :multiple="false"
                    :show-file-list="false"
                    :on-change="function(file){return getFiles(file,'backImg')}"
                    :auto-upload="false"
                  >
                    <span v-if="kyc.backImg" class="avatar-img">
                      <img :src="kyc.backImg">
                    </span>
                    <div v-else>
                      <i class="el-icon-plus"></i>
                      <span class="bk">{{ $t('kyc.back') }}</span>
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
              <div class="c-gray pt-20">
                <div>{{ $t('kyc.photo-tips') }}</div>
                <div class="pt-10">{{ $t('kyc.photo-tips1') }}</div>
                <div>{{ $t('kyc.photo-tips2') }}</div>
                <div>{{ $t('kyc.photo-tips3') }}</div>
              </div>
              <el-row class="pt-20">
                <el-col :span="12">
                  <el-upload
                    class="photo-box"
                    :action="upUrl"
                    :multiple="false"
                    :show-file-list="false"
                    :on-change="function(file){return getFiles(file,'holdFrontImg')}"
                    :auto-upload="false"
                  >
                    <span v-if="kyc.holdFrontImg" class="avatar-img">
                      <img :src="kyc.holdFrontImg">
                    </span>
                    <div v-else>
                      <i class="el-icon-plus"></i>
                      <span class="bk">{{ $t('kyc.front') }}</span>
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
              <el-form-item class="mt-40">
                <!-- <el-button type="primary" @click="onSubmit('kyc')">{{ $t('kyc.confirm') }}</el-button> -->
                <span class="btn btn-orange login-btn" @click="submitForm('kyc')">
                  <i class="figure figure-lt"></i>
                  <i class="figure figure-rt"></i>
                  <i class="figure figure-lb"></i>
                  <i class="figure figure-rb"></i>
                  {{ $t('kyc.confirm') }}
                </span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style>
  .login-btn {
    height: 40px;
    line-height: 40px;
}

</style>

<script>
export default {
  middleware: "authenticated",
  async asyncData({ store, req, params, redirect }) {
    return {
      auth: store.state.auth,
      lang: store.state.locale,
      upHeaders: {
        "Content-Type": "multipart/form-data",
        token: store.state.auth
      }
    };
  },
  data() {
    return {
      countryOption: "china",
      upUrl: `${process.env.BASE_URL}/file-api/file/base64Upload`,
      rules: {
        legalName: [
          {
            required: true,
            message: this.$i18n.t("error.unable"),
            trigger: "blur"
          }
        ],
        identityNo: [
          {
            required: true,
            message: this.$i18n.t("error.unable"),
            trigger: "blur"
          }
        ]
      },
      kyc: {
        country: "",
        legalName: "",
        identityType: 2,
        identityNo: "",
        frontImg: "",
        backImg: "",
        holdFrontImg: ""
      },
      idOption: [
        {
          name: this.$i18n.t("kyc.id_card"),
          locale: "1",
          code: 1
        },
        {
          name: this.$i18n.t("kyc.passport"),
          locale: "2",
          code: 2
        },
        {
          name: this.$i18n.t("kyc.driver_licence"),
          locale: "3",
          code: 3
        }
      ]
    };
  },
  mounted() {
    localStorage.setItem("lastPage", "/minoption");
    this.$store.commit("setLastpage", "/kyc");
    let that = this;
    let areacode = this.axios.get("/areacode.json");
    areacode.then(res => {
      if (res.status == 200) {
        that.countryOption = res.data;
      }
    });
  },
  methods: {
    close() {
      localStorage.setItem("lastPage", "/minoption");
      this.$store.commit("setLastpage", "/minoption");
      this.$router.push("/minoption");
    },
    getFiles(file, name) {
      let kycName = name;
      const fileName = name + "_" + file.uid + ".jpg";
      let that = this;
      this.photoCompress(file.raw, 1000, function(urls) {
        that.kyc[kycName] = urls;
        let upData = that.$axios.post(
          that.upUrl,
          {
            realName: fileName,
            base64Code: urls
          },
          {
            headers: {
              token: that.auth
            }
          }
        );
        upData.then(res => {
          if (res.status == 200) {
            that.kyc[kycName] = res.data.data.fullPath;
          }
        });
      });
      // this.kyc.frontImg=file.raw;
    },
    photoCompress(file, w, objDiv) {
      let that = this;
      var ready = new FileReader();
      ready.readAsDataURL(file);
      ready.onload = function() {
        var re = this.result;
        that.canvasDataURL(re, w, objDiv);
      };
    },
    canvasDataURL(path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.7; // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL("image/jpeg", quality);
        // 回调函数返回base64的值
        callback(base64);
      };
    },
    onSubmit() {
      let that = this;
      that.$refs["kyc"].validate(valid => {
        if (valid) {
          if (that.kyc.country == "") {
            that.kyc.country = "86";
          }
          if (that.kyc.frontImg == "") {
            that.$message.error(that.$t("error.frontImg"));
            return false;
          }
          if (that.kyc.backImg == "") {
            that.$message.error(that.$t("error.backImg"));
            return false;
          }
          if (that.kyc.holdFrontImg == "") {
            that.$message.error(that.$t("error.holdFrontImg"));
            return false;
          }
          let kycSub = this.axios.post(
            `${process.env.BASE_URL}/user-api/user-kyc/apply`,
            {
              userId: "[user_id]",
              country: that.kyc.country,
              legalName: that.kyc.legalName,
              identityType: that.kyc.identityType,
              identityNo: that.kyc.identityNo,
              frontImg: that.kyc.frontImg,
              backImg: that.kyc.backImg,
              holdFrontImg: that.kyc.holdFrontImg
            },
            {
              headers: {
                token: that.auth
              }
            }
          );
          kycSub.then(res => {
            if (res.data.success) {
              that.$message.success(that.$t("error.success"));
              localStorage.setItem("lastPage", "/minoption");
              this.$store.commit("setLastpage", "/minoption");
              that.$router.push("/minoption");
            } else {
              that.$message.error(
                that.$t("systemError." + res.data.error.code)
              );
            }
          });
        }
      });
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    addZero: function(data) {
      return data.toFixed(8);
    }
  }
};
</script>

