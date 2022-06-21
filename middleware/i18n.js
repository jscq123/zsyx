export default function ({ app, store, route, redirect }) {
  let lang = localStorage.getItem("lang");
  if(lang){
    app.i18n.locale = lang;
    store.commit('setLang', lang);
  }else{
    app.i18n.locale = "zh";
  }
  let auth=localStorage.getItem("auth");
  if(auth){
    store.commit("setAuth", auth);
  }
  let lastpage=store.state.lastpage;
  if(lastpage && lastpage!="/minoption" && route.fullPath=="/minoption"){
    return redirect(lastpage);
  }else{
    store.commit('setLastpage',"/minoption");
  }
}
