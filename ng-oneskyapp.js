const onesky = require('@brainly/onesky-utils');

const fs = require('fs');

const args = process.argv.slice(2);
if (args.length <= 0) {
  throw new Error('No API secret provided');
}
const apiSecret = args[0];

const locales = ['be-BY', 'fr', 'pt-BR', 'ru', 'uk', 'zh-CN'];

const path = __dirname + '/src/locale/';

locales.map(locale => {
  console.log('Download ' + locale);
  onesky
    .getFile({
      language: locale,
      secret: apiSecret,
      apiKey: '2a1C12oZU5VIK409AJd0xUfVntGyhLWa',
      projectId: '129670',
      fileName: 'messages.xlf'
    })
    .then(content => {
      console.log(content);
      const filename = 'messages.' + locale + '.xlf';
      console.log('Downloaded ' + filename);
      fs.writeFile(path + filename, content, err => {
        if (err) {
          return console.log(err);
        }

        console.log('The file messages.' + filename + ' was saved!');
      });
    })
    .catch(error => {
      console.log(error);
    });
});
