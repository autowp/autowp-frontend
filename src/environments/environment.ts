// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: '/api/',
  sentry: {
    dsn: 'https://ad1e4834fdfd4dafa9acd46c5b0ae616@sentry.pereslegin.ru/2',
    environment: 'testing'
  },
  languages: [
    {
      code: 'en',
      hostname: 'en.localhost',
      name: 'English',
      flag: 'flag-icon flag-icon-gb',
      momentLocale: 'en-gb',
      locale: 'en-GB'
    },
    {
      code: 'zh',
      hostname: 'zh.localhost',
      name: '中文 (beta)',
      flag: 'flag-icon flag-icon-cn',
      momentLocale: 'zh-cn',
      locale: 'zh-CN'
    },
    {
      code: 'ru',
      hostname: 'ru.localhost',
      name: 'Русский',
      flag: 'flag-icon flag-icon-ru',
      momentLocale: 'ru',
      locale: 'ru'
    },
    {
      code: 'pt-br',
      hostname: 'br.localhost',
      name: 'Português brasileiro',
      flag: 'flag-icon flag-icon-br',
      momentLocale: 'pt-br',
      locale: 'pt-BR'
    },
    {
      code: 'fr',
      hostname: 'fr.localhost',
      name: 'Français (beta)',
      flag: 'flag-icon flag-icon-fr',
      momentLocale: 'fr',
      locale: 'fr'
    },
    {
      code: 'be',
      hostname: 'be.localhost',
      name: 'Беларуская',
      flag: 'flag-icon flag-icon-by',
      momentLocale: 'be',
      locale: 'be-BY'
    },
    {
      code: 'uk',
      hostname: 'uk.localhost',
      name: 'Українська (beta)',
      flag: 'flag-icon flag-icon-ua',
      momentLocale: 'uk',
      locale: 'uk'
    },
    {
      code: 'es',
      hostname: 'es.localhost',
      name: 'Español (beta)',
      flag: 'flag-icon flag-icon-es',
      momentLocale: 'es',
      locale: 'es'
    }
  ],
  keycloak: {
    url: 'http://localhost:8081/auth/',
    realm: 'autowp',
    clientId: 'frontend'
  },
  grpcHost: ''
};
