(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{423:function(t,e,o){var content=o(488);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(3).default)("44611247",content,!0,{sourceMap:!1})},487:function(t,e,o){"use strict";var r=o(423);o.n(r).a},488:function(t,e,o){(t.exports=o(2)(!1)).push([t.i,".login-btn{height:40px;line-height:40px}",""])},562:function(t,e,o){"use strict";o.r(e);o(204),o(205),o(20),o(60);var r,n=o(8),c={middleware:"authenticated",asyncData:(r=Object(n.a)(regeneratorRuntime.mark((function t(e){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.store,e.req,e.params,e.redirect,t.abrupt("return",{auth:o.state.auth,lang:o.state.locale,upHeaders:{"Content-Type":"multipart/form-data",token:o.state.auth}});case 2:case"end":return t.stop()}}),t)}))),function(t){return r.apply(this,arguments)}),data:function(){return{countryOption:"china",upUrl:"".concat("https://api-gateway.dev.rwdg.io","/file-api/file/base64Upload"),rules:{legalName:[{required:!0,message:this.$i18n.t("error.unable"),trigger:"blur"}],identityNo:[{required:!0,message:this.$i18n.t("error.unable"),trigger:"blur"}]},kyc:{country:"",legalName:"",identityType:2,identityNo:"",frontImg:"",backImg:"",holdFrontImg:""},idOption:[{name:this.$i18n.t("kyc.id_card"),locale:"1",code:1},{name:this.$i18n.t("kyc.passport"),locale:"2",code:2},{name:this.$i18n.t("kyc.driver_licence"),locale:"3",code:3}]}},mounted:function(){localStorage.setItem("lastPage","/minoption"),this.$store.commit("setLastpage","/kyc");var t=this;this.axios.get("/areacode.json").then((function(e){200==e.status&&(t.countryOption=e.data)}))},methods:{close:function(){localStorage.setItem("lastPage","/minoption"),this.$store.commit("setLastpage","/minoption"),this.$router.push("/minoption")},getFiles:function(t,e){var o=e,r=e+"_"+t.uid+".jpg",n=this;this.photoCompress(t.raw,1e3,(function(t){n.kyc[o]=t,n.$axios.post(n.upUrl,{realName:r,base64Code:t},{headers:{token:n.auth}}).then((function(t){200==t.status&&(n.kyc[o]=t.data.data.fullPath)}))}))},photoCompress:function(t,e,o){var r=this,n=new FileReader;n.readAsDataURL(t),n.onload=function(){var t=this.result;r.canvasDataURL(t,e,o)}},canvasDataURL:function(path,t,e){var img=new Image;img.src=path,img.onload=function(){var o=this.width,r=this.height,n=o/r;o=t.width||o,r=t.height||o/n;var c=.7,canvas=document.createElement("canvas"),l=canvas.getContext("2d"),m=document.createAttribute("width");m.nodeValue=o;var d=document.createAttribute("height");d.nodeValue=r,canvas.setAttributeNode(m),canvas.setAttributeNode(d),l.drawImage(this,0,0,o,r),t.quality&&t.quality<=1&&t.quality>0&&(c=t.quality);var y=canvas.toDataURL("image/jpeg",c);e(y)}},onSubmit:function(){var t=this,e=this;e.$refs.kyc.validate((function(o){if(o){if(""==e.kyc.country&&(e.kyc.country="86"),""==e.kyc.frontImg)return e.$message.error(e.$t("error.frontImg")),!1;if(""==e.kyc.backImg)return e.$message.error(e.$t("error.backImg")),!1;if(""==e.kyc.holdFrontImg)return e.$message.error(e.$t("error.holdFrontImg")),!1;t.axios.post("".concat("https://api-gateway.dev.rwdg.io","/user-api/user-kyc/apply"),{userId:"[user_id]",country:e.kyc.country,legalName:e.kyc.legalName,identityType:e.kyc.identityType,identityNo:e.kyc.identityNo,frontImg:e.kyc.frontImg,backImg:e.kyc.backImg,holdFrontImg:e.kyc.holdFrontImg},{headers:{token:e.auth}}).then((function(o){o.data.success?(e.$message.success(e.$t("error.success")),localStorage.setItem("lastPage","/minoption"),t.$store.commit("setLastpage","/minoption"),e.$router.push("/minoption")):e.$message.error(e.$t("systemError."+o.data.error.code))}))}}))}},filters:{formatDate:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(time){var t=new Date(time);return formatDate(t,"yyyy-MM-dd hh:mm:ss")})),addZero:function(data){return data.toFixed(8)}}},l=(o(487),o(35)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-container",{attrs:{direction:"vertical"}},[o("el-main",{staticClass:"no-page"},[o("div",{staticClass:"title"},[t._v(t._s(t.$t("kyc.kyc_title")))]),t._v(" "),o("i",{staticClass:"el-icon-close header",on:{click:function(e){return t.close()}}}),t._v(" "),o("el-row",{staticClass:"account-bg",attrs:{type:"flex",justify:"center"}},[o("el-col",{staticClass:"box"},[o("div",[o("el-form",{ref:"kyc",staticClass:"main-form kyc-form",attrs:{enctype:"multipart/form-data",rules:t.rules,model:t.kyc}},[o("el-form-item",[o("el-select",{staticClass:"country-select",attrs:{filterable:"","default-first-option":"",placeholder:"zh"==t.lang?"中国":"China"},model:{value:t.kyc.country,callback:function(e){t.$set(t.kyc,"country",e)},expression:"kyc.country"}},t._l(t.countryOption,(function(e){return o("el-option",{key:e.locale,attrs:{label:e[t.lang],value:e.code}},[o("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[t._v(t._s(e[t.lang]))])])})),1)],1),t._v(" "),o("el-form-item",{attrs:{prop:"legalName"}},[o("el-input",{attrs:{placeholder:t.$t("kyc.legal_name")},model:{value:t.kyc.legalName,callback:function(e){t.$set(t.kyc,"legalName",e)},expression:"kyc.legalName"}})],1),t._v(" "),o("el-form-item",[o("el-select",{staticClass:"area-select",attrs:{placeholder:"cn"},model:{value:t.kyc.identityType,callback:function(e){t.$set(t.kyc,"identityType",e)},expression:"kyc.identityType"}},t._l(t.idOption,(function(e){return o("el-option",{key:e.locale,attrs:{label:e.name,value:e.code}},[o("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[t._v(t._s(e.name))])])})),1)],1),t._v(" "),o("el-form-item",{attrs:{prop:"identityNo"}},[o("el-input",{attrs:{placeholder:t.$t("kyc.id_card")},model:{value:t.kyc.identityNo,callback:function(e){t.$set(t.kyc,"identityNo",e)},expression:"kyc.identityNo"}})],1),t._v(" "),o("div",{staticClass:"c-gray"},[t._v(t._s(t.$t("kyc.id_tips")))]),t._v(" "),o("el-row",{staticClass:"pt-20",attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-upload",{staticClass:"photo-box",attrs:{action:t.upUrl,multiple:!1,"show-file-list":!1,"on-change":function(e){return t.getFiles(e,"frontImg")},"auto-upload":!1}},[t.kyc.frontImg?o("span",{staticClass:"avatar-img"},[o("img",{attrs:{src:t.kyc.frontImg}})]):o("div",[o("i",{staticClass:"el-icon-plus"}),t._v(" "),o("span",{staticClass:"bk"},[t._v(t._s(t.$t("kyc.front")))])])])],1),t._v(" "),o("el-col",{attrs:{span:12}},[o("el-upload",{staticClass:"photo-box",attrs:{action:t.upUrl,multiple:!1,"show-file-list":!1,"on-change":function(e){return t.getFiles(e,"backImg")},"auto-upload":!1}},[t.kyc.backImg?o("span",{staticClass:"avatar-img"},[o("img",{attrs:{src:t.kyc.backImg}})]):o("div",[o("i",{staticClass:"el-icon-plus"}),t._v(" "),o("span",{staticClass:"bk"},[t._v(t._s(t.$t("kyc.back")))])])])],1)],1),t._v(" "),o("div",{staticClass:"c-gray pt-20"},[o("div",[t._v(t._s(t.$t("kyc.photo-tips")))]),t._v(" "),o("div",{staticClass:"pt-10"},[t._v(t._s(t.$t("kyc.photo-tips1")))]),t._v(" "),o("div",[t._v(t._s(t.$t("kyc.photo-tips2")))]),t._v(" "),o("div",[t._v(t._s(t.$t("kyc.photo-tips3")))])]),t._v(" "),o("el-row",{staticClass:"pt-20"},[o("el-col",{attrs:{span:12}},[o("el-upload",{staticClass:"photo-box",attrs:{action:t.upUrl,multiple:!1,"show-file-list":!1,"on-change":function(e){return t.getFiles(e,"holdFrontImg")},"auto-upload":!1}},[t.kyc.holdFrontImg?o("span",{staticClass:"avatar-img"},[o("img",{attrs:{src:t.kyc.holdFrontImg}})]):o("div",[o("i",{staticClass:"el-icon-plus"}),t._v(" "),o("span",{staticClass:"bk"},[t._v(t._s(t.$t("kyc.front")))])])])],1)],1),t._v(" "),o("el-form-item",{staticClass:"mt-40"},[o("span",{staticClass:"btn btn-orange login-btn",on:{click:function(e){return t.submitForm("kyc")}}},[o("i",{staticClass:"figure figure-lt"}),t._v(" "),o("i",{staticClass:"figure figure-rt"}),t._v(" "),o("i",{staticClass:"figure figure-lb"}),t._v(" "),o("i",{staticClass:"figure figure-rb"}),t._v("\n                "+t._s(t.$t("kyc.confirm"))+"\n              ")])])],1)],1)])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);