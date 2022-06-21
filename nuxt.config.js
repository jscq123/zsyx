const pkg = require('./package')
const env = require('./env')

module.exports = {
  mode: 'spa',
  env: {
    BASE_URL:env[process.env.NODE_ENV].api_gateway,
    market:env[process.env.NODE_ENV].market
  },
  loading: '~/components/loading.vue',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'ZDX' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'full-screen', content: 'yes' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: 'browsermode', content: 'application' },
      { name: 'x5-page-mode', content: 'app' },
      { name: 'msapplication-TileImage', content: '/img/logo168.png' },
      { name: 'msapplication-TileColor', content: '#111926' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/img/logo168.png' },
      { rel: 'apple-touch-startup-image', href: '/img/startup.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/static/main-ruilan.css'
  ],
  router: {
    middleware: 'i18n'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/main.js',
    '@/plugins/i18n.js'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/pay/payflow': {
      target: 'http://payflow.mycash.asia/',
      pathRewrite: { '^/pay/payflow': '' },
      changeOrigin: true
    },
    '/api':
      {
        target: 'http://127.0.0.1:3001', // api主机
        pathRewrite: { '^/api': '/' }
      }
  },
  
  // loadingIndicator: {
  //   name: 'chasing-dots',
  //   color: '#013dc5',
  //   background: '#121926'
  // },
  /*
  ** Build configuration
  */
  build: {
    // 配置防止多次打包
    vendor: ['axios'],
    // 为 JS 和 Vue 文件设定自定义的 babel 配置。
    babel: {
      plugins: [
        [
          'component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ]
      ]
    }
  }
}
