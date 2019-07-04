const { i18n } = require('.');
const assert = require('assert');

describe('i18n', () => {
    describe('#addLocale()', () => {
        it('should add a locale along with its corresponding data', () => {
            const dic = {
                foo: 'bar'
            };

            i18n.addLocale('en', dic);
            assert.deepEqual(i18n.locales, { en: dic });
        });

        it('should add multiple locales along with their corresponding data', () => {
            const enDic = {
                hello: 'Hello'
            };

            const frDic = {
                hello: 'Bonjour'
            };

            i18n.addLocale('en', enDic);
            i18n.addLocale('fr', frDic);

            assert.deepEqual(i18n.locales, { en: enDic, fr: frDic });
        });
    });

    describe('#setLocale()', () => {
        it('should set the locale when passed', () => {
            i18n.setLocale('en');
            assert.equal(i18n.locale, 'en');
        });
    });

    describe('#i18n()', () => {
        it('should return translation when passed valid path of dictionary', () => {
            i18n.addLocale('en', {
                hello: 'Hi there!'
            });

            i18n.setLocale('en');

            assert.equal(i18n('hello'), 'Hi there!');
        });

        it('should return translation within another translation', () => {
            i18n.addLocale('en', {
                hello: 'Hi there!',
                welcome: 'It\'s nice to see you again',
                combined_message: '{@hello} {@welcome}'
            });

            i18n.setLocale('en');

            assert.equal(
                i18n('combined_message', { name: 'William Wallace' }),
                'Hi there! It\'s nice to see you again'
            );
        });

        it('should return path when passed invalid path of dictionary', () => {
            i18n.addLocale('en', {
                hello: 'Hi there!'
            });

            i18n.setLocale('en');

            const path = 'notfound';
            assert.equal(i18n(path), path);
        });

        it('should return path when passed invalid *nested* path of dictionary', () => {
            i18n.addLocale('en', {
                hello: 'Hi there!'
            });

            i18n.setLocale('en');

            const path = 'invalid.path';

            // TypeError exception is caught
            assert.equal(i18n(path), path);
        });

        it('should return dynamic greeting when passed a name', () => {
            i18n.addLocale('fr', {
                hello: 'Bonjour {name}'
            });

            i18n.setLocale('fr');

            assert.equal(
                i18n('hello', { name: 'Peter Parker' }),
                'Bonjour Peter Parker'
            );
        });

        it('should return plural when passed integer greater than 1', () => {
            i18n.addLocale('en', {
                plural: {
                    msg: ['message', 'messages']
                }
            });

            i18n.setLocale('en');

            assert.equal(i18n('plural.msg', 2), 'messages');
        });
    });
});
