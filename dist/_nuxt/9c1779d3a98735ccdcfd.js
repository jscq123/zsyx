(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{549:function(t,e,n){"use strict";n.r(e);n(60);var r,c=n(8),o=n(61),d=n.n(o),h={middleware:"authenticated",asyncData:(r=Object(c.a)(regeneratorRuntime.mark((function t(e){var n,r,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store,e.req,e.params,e.redirect,t.next=3,d.a.post("".concat("https://api-gateway.dev.rwdg.io","/user-api/user-info/account/detail"),{userId:"[user_id]"},{headers:{"Content-Type":"application/json",token:n.state.auth}});case 3:return r=t.sent,data=r.data,t.abrupt("return",{data:data.data,auth:n.state.auth,avatar_tx:"/tx/tx".concat(data.data.avatar,".jpg"),user_name:data.data.email||data.data.mobile,kycState:data.data.kycState,practice:0});case 6:case"end":return t.stop()}}),t)}))),function(t){return r.apply(this,arguments)}),mounted:function(){}},l=n(35),component=Object(l.a)(h,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v(this._s(this.data))]),this._v(" "),e("p",[this._v(this._s(this.auth))])])}),[],!1,null,null,null);e.default=component.exports}}]);