# :airplane: Minimalistic i18n

Minimalistic internationalization JavaScript library

[![Build Status](https://travis-ci.org/jordanfrancis/minimalistic-i18n.svg?branch=master)](https://travis-ci.org/jordanfrancis/minimalistic-i18n)

## Installation

```shell
npm install minimalistic-i18n
```

## Usage

```js
import i18n from 'minimalistic-i18n';

i18n.addLocale('en', {
    foo: 'the bar',
    msg: ['message', 'messages'],
    email: {
        hey: 'Hey!',
        info: 'Hi {name}. {@email.hey} You have {number} {@msg(number)}.'
    }
});
i18n.setLocale('en');

i18n('foo'); // "the bar"
i18n('email.baz'); // "email.baz"
i18n('msg', 3); // "messages"
i18n('email.info', { name: 'James', number: 0 }); // "Hi James. Hey! You have 0 messages."
i18n('email.info', { name: 'James', number: 1 }); // "Hi James. Hey! You have 1 message."

i18n.addLocale('fr', {
    foo: 'le bar'
});
i18n.setLocale('fr');
i18n('foo'); // "le bar"

i18n.setLocale('en');
i18n('foo'); // "the bar"
```

## License

MIT
