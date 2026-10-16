export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/terminal.css'],
  i18n: {
    defaultLocale: 'it',
    strategy: 'no_prefix',
    locales: [
      { code: 'it', language: 'it-IT', file: 'it.json', name: 'Italiano' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    detectBrowserLanguage: { useCookie: true, cookieKey: 'lang', fallbackLocale: 'en' },
  },
})