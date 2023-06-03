// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: '/api/',
  sentry: {
    dsn: 'https://2903288a1e6441b88469dea7358c913a@sentry.pereslegin.ru/3',
    environment: 'testing',
  },
  languages: [
    {
      code: 'en',
      hostname: 'en.localhost',
      name: 'English',
      flag: 'flag-icon flag-icon-gb',
      locale: 'en-GB',
    },
    {
      code: 'zh',
      hostname: 'zh.localhost',
      name: '中文',
      flag: 'flag-icon flag-icon-cn',
      locale: 'zh-CN',
    },
    {
      code: 'ru',
      hostname: 'ru.localhost',
      name: 'Русский',
      flag: 'flag-icon flag-icon-ru',
      locale: 'ru',
    },
    {
      code: 'pt-br',
      hostname: 'br.localhost',
      name: 'Português brasileiro',
      flag: 'flag-icon flag-icon-br',
      locale: 'pt-BR',
    },
    {
      code: 'fr',
      hostname: 'fr.localhost',
      name: 'Français',
      flag: 'flag-icon flag-icon-fr',
      locale: 'fr',
    },
    {
      code: 'be',
      hostname: 'be.localhost',
      name: 'Беларуская',
      flag: 'flag-icon flag-icon-by',
      locale: 'be-BY',
    },
    {
      code: 'uk',
      hostname: 'uk.localhost',
      name: 'Українська',
      flag: 'flag-icon flag-icon-ua',
      locale: 'uk',
    },
    {
      code: 'es',
      hostname: 'es.localhost',
      name: 'Español',
      flag: 'flag-icon flag-icon-es',
      locale: 'es',
    },
    {
      code: 'it',
      hostname: 'it.localhost',
      name: 'Italiano',
      flag: 'flag-icon flag-icon-it',
      locale: 'it',
    },
  ],
  keycloak: {
    url: 'http://localhost:8081/auth/',
    realm: 'autowp',
    clientId: 'frontend',
  },
  grpcHost: '',
};
