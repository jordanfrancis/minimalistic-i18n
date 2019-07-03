const { i18n } = require('.');
const assert = require('assert');

describe('i18n', () => {
    describe('#setLocale()', () => {
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
        it('should output value for locale dictionary key', () => {
            i18n.addLocale('fr', {
                hello: 'Bonjour {name}'
            });

            i18n.setLocale('fr');

            assert.equal(
                i18n('hello', { name: 'Peter Parker' }),
                'Bonjour Peter Parker'
            );
        });
    });
});
