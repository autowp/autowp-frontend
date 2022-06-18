export const environment = {
  production: true,
  apiUrl: '/api/',
  sentry: {
    dsn: 'https://d7c8e45b178e44c0bf827c3e97d42154@sentry.pereslegin.ru/2',
    environment: 'production'
  },
  languages: [
    {
      code: 'en',
      hostname: 'en.wheelsage.org',
      name: 'English',
      flag: 'flag-icon flag-icon-gb',
      momentLocale: 'en-gb',
      locale: 'en-GB'
    },
    {
      code: 'zh',
      hostname: 'zh.wheelsage.org',
      name: '中文 (beta)',
      flag: 'flag-icon flag-icon-cn',
      momentLocale: 'zh-cn',
      locale: 'zh-CN'
    },
    {
      code: 'ru',
      hostname: 'www.autowp.ru',
      name: 'Русский',
      flag: 'flag-icon flag-icon-ru',
      momentLocale: 'ru',
      locale: 'ru'
    },
    {
      code: 'pt-br',
      hostname: 'br.wheelsage.org',
      name: 'Português brasileiro',
      flag: 'flag-icon flag-icon-br',
      momentLocale: 'pt-br',
      locale: 'pt-BR'
    },
    {
      code: 'fr',
      hostname: 'fr.wheelsage.org',
      name: 'Français (beta)',
      flag: 'flag-icon flag-icon-fr',
      momentLocale: 'fr',
      locale: 'fr'
    },
    {
      code: 'be',
      hostname: 'be.wheelsage.org',
      name: 'Беларуская',
      flag: 'flag-icon flag-icon-by',
      momentLocale: 'be',
      locale: 'be-BY'
    },
    {
      code: 'uk',
      hostname: 'uk.wheelsage.org',
      name: 'Українська (beta)',
      flag: 'flag-icon flag-icon-ua',
      momentLocale: 'uk',
      locale: 'uk'
    },
    {
      code: 'es',
      hostname: 'es.wheelsage.org',
      name: 'Español (beta)',
      flag: 'flag-icon flag-icon-es',
      momentLocale: 'es',
      locale: 'es'
    }
  ],
  keycloak: {
    url: 'https://auth.wheelsage.org/auth/',
    realm: 'autowp',
    clientId: 'frontend'
  },
  grpcHost: ''
};
