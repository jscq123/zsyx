export default {
  setLang(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  setAuth(state, auth) {
    state.auth = auth
  },
  setAccount(state,account){
    state.account = account
  },
  setAccountNo(state,accountNo){
    state.accountNo = accountNo
  },
  setLastpage(state,lastpage){
    state.lastpage = lastpage;
  }
}