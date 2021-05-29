module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'قواعد',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "description", content: 'شرح قواعد الإنجليزية باللغة العربية والأمثلة.' },
      { name: "keywords", content: "قواعد, جرامر, grammer, انجليزية, شرح انجليزي, تعلم, تعلم اللإنجليزية" },
      /** Android */
      { name: "theme-color", content: "green" },
      { name: "mobile-web-app-capable", content: "yes" },
      /** IOS */
      { name: "apple-mobile-web-app-title", content: "قواعد" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      /** Windows */
      { name: "msapplication-navbutton-color", content: "green" },
      { name: "msapplication-TileColor", content: "green" },
      { name: "msapplication-TileImage", content: "/logo.png" },
      /** Pinned sites */
      { name: "application-name", content: "قواعد" },
      { name: "msapplication-tooltip", content: "قواعد, تعلم اللغة الإنجليزية بسهولة . شرح واف لكل الأساسيات وباللغة العربية. نأخذ بيدك من الصفر." },
      { name: "msapplication-starturl", content: "/" },
      /** Tap highlighting  */
      { name: "msapplication-tap-highlight", content: "no" },
      /** UC Mobile Browser */
      { name: "full-screen", content: "yes" },
      { name: "browsermode", content: "application" },

      /**  Layout mode */
      { name: "layoutmode", content: "fitscreen/standard" },
      /** imagemode - show image even in text only mode */
      { name: "imagemode", content: "force" },
      /** Orientation */
      { name: "screen-orientation", content: "portrait" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'stylesheet', href: '/css/font.css' }
    ],
    
  },
  loading: '~/components/loading.vue',
  /**
   ** Global modules
   <script data-ad-client="ca-pub-3773777285223264" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
   */

  modules: [
    'nuxt-purgecss',
    '@nuxtjs/pwa',
    '@nuxtjs/google-adsense',
    'cookie-universal-nuxt',
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
  ],
  'google-adsense': {
    id: 'ca-pub-3773777285223264'
  },
  pwa: {
    meta: {
      /* meta options */
      theme_color: "#49af4d",
      lang: "ar",
      nativeUI: true
    },
    manifest: {
      name: 'قواعد',
      lang: 'ar',
      theme_color: "#49af4d",
      background_color: "#49af4d",
      categories: ["learning", "languages", "education", "Engilsh"]
    }
  },
  router: {
    // Run the middleware/auth.js on every page
    middleware: 'auth'
  },
  axios: {
    proxy: true
  },
  styleResources: {
    sass: [
      '~/assets/css/main.sass',
    ]
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
