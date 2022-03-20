export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'POS Admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700'},
     // { rel: 'stylesheet', href: '/css/nucleo-icons.css'},
     //{ rel: 'stylesheet', href: '/css/nucleo-svg.css'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Round'},
      //{ id: 'pagestyle', rel: 'stylesheet', href: '/css/material-dashboard.css?v=3.0.1'}
    ],
    script: [
      { src: 'https://kit.fontawesome.com/42d5adcbca.js' },
      { src: '/js/core/popper.min.js'},
      { src: '/js/core/bootstrap.min.js'},
      { src: '/js/plugins/perfect-scrollbar.min.js'},
      { src: '/js/plugins/smooth-scrollbar.min.js'},
    ],
    bodyAttrs: {
      class: 'g-sidenav-show  bg-gray-200'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/static/css/nucleo-icons.css',
    '@/static/css/nucleo-svg.css',
    '@/static/css/material-dashboard.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
   '~/plugins/firebase.js',
   '~/plugins/axios.js',
   '~/plugins/function.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    baseURL: process.env.BASE_URL,
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGE_SENDER_ID: process.env.FB_MESSAGE_SENDER_ID,
    FB_APP_ID: process.env.FB_APP_ID
  },
  axios: {
    baseURL: process.env.BASE_URL
  }
}
