const onesky = require('@brainly/onesky-utils');

const fs = require('fs');

const args = process.argv.slice(2);
if (args.length <= 0) {
  throw new Error('No API secret provided');
}
const apiSecret = args[0];

const languages = ['en', 'zh', 'ru', 'pt-br', 'fr', 'be', 'uk', 'es'];

const path = __dirname + '/src/languages/';

languages.map(language => {
  console.log('Download ' + language);
  onesky
    .getFile({
      language: language,
      secret: apiSecret,
      apiKey: '2a1C12oZU5VIK409AJd0xUfVntGyhLWa',
      projectId: '129670',
      fileName: 'frontend.json'
    })
    .then(content => {
      const parsed = JSON.parse(content);

      content = JSON.stringify(parsed, null, '  ');

      console.log('Downloaded ' + language);
      fs.writeFile(path + language + '.json', content, err => {
        if (err) {
          return console.log(err);
        }

        console.log('The file ' + language + '.json was saved!');
      });
    })
    .catch(error => {
      console.log(error);
    });
});
