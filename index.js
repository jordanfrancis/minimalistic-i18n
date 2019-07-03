function i18n(path, data) {
    const val = path
      .split('.')
      .reduce(
        (accumulator, current) => accumulator[current],
        i18n.locales[i18n.locale]
      );
  
    if (!val) {
      return path;
    }
  
    if (Array.isArray(val)) {
      return val[data - 1] || val[val.length - 1];
    }
  
    return val
      .replace(/{[^@}]+}/g, s => data[s.slice(1, -1)])
      .replace(/{@[^}]+}/g, s => {
        let n = null;
        const subpath = s.slice(2, -1).replace(/\(.*\)/, argStr => {
          n = data[argStr.slice(1, -1)];
          return '';
        });
  
        return i18n(subpath, n === null ? data : n);
      });
  }
  
  i18n.locales = {};
  i18n.addLocale = (lang, dic) => (i18n.locales[lang] = dic);
  i18n.setLocale = lang => (i18n.locale = lang);
  
  module.exports = { default: i18n, i18n };
  