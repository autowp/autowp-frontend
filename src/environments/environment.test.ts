export const environment = {
  production: true,
  apiUrl: '/api/',
  sentry: {
    dsn: 'https://46d741dc8152438a90a3c96c89f6279e@sentry.pereslegin.ru/3',
    environment: 'testing'
  },
  languages: [
    {
      code: 'en',
      ngxTranslateCode: 'en',
      hostname: 'en.localhost',
      name: 'English',
      flag: 'flag-icon flag-icon-gb',
      momentLocale: 'en-gb',
      locale: 'en-GB'
    },
    {
      code: 'zh',
      ngxTranslateCode: 'zh',
      hostname: 'zh.localhost',
      name: '中文 (beta)',
      flag: 'flag-icon flag-icon-cn',
      momentLocale: 'zh-cn',
      locale: 'zh-CN'
    },
    {
      code: 'ru',
      ngxTranslateCode: 'ru',
      hostname: 'ru.localhost',
      name: 'Русский',
      flag: 'flag-icon flag-icon-ru',
      momentLocale: 'ru',
      locale: 'ru'
    },
    {
      code: 'pt-br',
      ngxTranslateCode: 'br',
      hostname: 'br.localhost',
      name: 'Português brasileiro',
      flag: 'flag-icon flag-icon-br',
      momentLocale: 'pt-br',
      locale: 'pt-BR'
    },
    {
      code: 'fr',
      ngxTranslateCode: 'fr',
      hostname: 'fr.localhost',
      name: 'Français (beta)',
      flag: 'flag-icon flag-icon-fr',
      momentLocale: 'fr',
      locale: 'fr'
    },
    {
      code: 'be',
      ngxTranslateCode: 'be',
      hostname: 'be.localhost',
      name: 'Беларуская',
      flag: 'flag-icon flag-icon-by',
      momentLocale: 'be',
      locale: 'be-BY'
    },
    {
      code: 'uk',
      ngxTranslateCode: 'uk',
      hostname: 'uk.localhost',
      name: 'Українська (beta)',
      flag: 'flag-icon flag-icon-ua',
      momentLocale: 'uk',
      locale: 'uk'
    }
  ]
};
