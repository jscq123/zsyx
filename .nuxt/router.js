import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _5d150ea0 = () => interopDefault(import('..\\pages\\active.vue' /* webpackChunkName: "pages_active" */))
const _6170b760 = () => interopDefault(import('..\\pages\\agreement.vue' /* webpackChunkName: "pages_agreement" */))
const _d6e82a2a = () => interopDefault(import('..\\pages\\changepass.vue' /* webpackChunkName: "pages_changepass" */))
const _08ad9a5d = () => interopDefault(import('..\\pages\\customerservice.vue' /* webpackChunkName: "pages_customerservice" */))
const _2dd3b288 = () => interopDefault(import('..\\pages\\deposit_record.vue' /* webpackChunkName: "pages_deposit_record" */))
const _dc8e380c = () => interopDefault(import('..\\pages\\depositlast.vue' /* webpackChunkName: "pages_depositlast" */))
const _fad8d144 = () => interopDefault(import('..\\pages\\forgotpass.vue' /* webpackChunkName: "pages_forgotpass" */))
const _635d6cbe = () => interopDefault(import('..\\pages\\histroy_new.vue' /* webpackChunkName: "pages_histroy_new" */))
const _790b3ffb = () => interopDefault(import('..\\pages\\kyc.vue' /* webpackChunkName: "pages_kyc" */))
const _9430b520 = () => interopDefault(import('..\\pages\\kycwait.vue' /* webpackChunkName: "pages_kycwait" */))
const _206a012f = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _0cb92559 = () => interopDefault(import('..\\pages\\maintenance.vue' /* webpackChunkName: "pages_maintenance" */))
const _07b09a44 = () => interopDefault(import('..\\pages\\member.vue' /* webpackChunkName: "pages_member" */))
const _4f2d150d = () => interopDefault(import('..\\pages\\minoption.vue' /* webpackChunkName: "pages_minoption" */))
const _ab5957d4 = () => interopDefault(import('..\\pages\\newInformation.vue' /* webpackChunkName: "pages_newInformation" */))
const _acff9ac2 = () => interopDefault(import('..\\pages\\option.vue' /* webpackChunkName: "pages_option" */))
const _248fb66a = () => interopDefault(import('..\\pages\\personal.vue' /* webpackChunkName: "pages_personal" */))
const _8895df18 = () => interopDefault(import('..\\pages\\personal_jy.vue' /* webpackChunkName: "pages_personal_jy" */))
const _25e0bf65 = () => interopDefault(import('..\\pages\\registe_oldr.vue' /* webpackChunkName: "pages_registe_oldr" */))
const _639e5566 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _289836a5 = () => interopDefault(import('..\\pages\\share.vue' /* webpackChunkName: "pages_share" */))
const _b6221352 = () => interopDefault(import('..\\pages\\tranaction_sum.vue' /* webpackChunkName: "pages_tranaction_sum" */))
const _3368231c = () => interopDefault(import('..\\pages\\withdrawnew.vue' /* webpackChunkName: "pages_withdrawnew" */))
const _56c25e18 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/active",
      component: _5d150ea0,
      name: "active"
    }, {
      path: "/agreement",
      component: _6170b760,
      name: "agreement"
    }, {
      path: "/changepass",
      component: _d6e82a2a,
      name: "changepass"
    }, {
      path: "/customerservice",
      component: _08ad9a5d,
      name: "customerservice"
    }, {
      path: "/deposit_record",
      component: _2dd3b288,
      name: "deposit_record"
    }, {
      path: "/depositlast",
      component: _dc8e380c,
      name: "depositlast"
    }, {
      path: "/forgotpass",
      component: _fad8d144,
      name: "forgotpass"
    }, {
      path: "/histroy_new",
      component: _635d6cbe,
      name: "histroy_new"
    }, {
      path: "/kyc",
      component: _790b3ffb,
      name: "kyc"
    }, {
      path: "/kycwait",
      component: _9430b520,
      name: "kycwait"
    }, {
      path: "/login",
      component: _206a012f,
      name: "login"
    }, {
      path: "/maintenance",
      component: _0cb92559,
      name: "maintenance"
    }, {
      path: "/member",
      component: _07b09a44,
      name: "member"
    }, {
      path: "/minoption",
      component: _4f2d150d,
      name: "minoption"
    }, {
      path: "/newInformation",
      component: _ab5957d4,
      name: "newInformation"
    }, {
      path: "/option",
      component: _acff9ac2,
      name: "option"
    }, {
      path: "/personal",
      component: _248fb66a,
      name: "personal"
    }, {
      path: "/personal_jy",
      component: _8895df18,
      name: "personal_jy"
    }, {
      path: "/registe_oldr",
      component: _25e0bf65,
      name: "registe_oldr"
    }, {
      path: "/register",
      component: _639e5566,
      name: "register"
    }, {
      path: "/share",
      component: _289836a5,
      name: "share"
    }, {
      path: "/tranaction_sum",
      component: _b6221352,
      name: "tranaction_sum"
    }, {
      path: "/withdrawnew",
      component: _3368231c,
      name: "withdrawnew"
    }, {
      path: "/",
      component: _56c25e18,
      name: "index"
    }],

    fallback: false
  })
}
