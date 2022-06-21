const cookieparser = process.server ? require('cookieparser') : undefined;
export default {
  async nuxtServerInit ({ commit }, { req }) {
    let auth = null;
    let locale = "zh";
    if ( req.headers.cookie ) {
      const parsed = cookieparser.parse(req.headers.cookie)
      auth=parsed.auth;
      locale=parsed.lang;
    }
    commit('setAuth', auth);
    commit('setLang', locale);
  }
}