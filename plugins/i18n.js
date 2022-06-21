import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale:store.state.locale,
    messages: {
      'en': require('~/lang/en.json'),
      'zh': require('~/lang/zh.json'),
      'tr': require('~/lang/tr.json'),
      'jp': require('~/lang/jp.json')
    }
  })
}
