'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function(defaultLocale = 'en') {

    i18n.configure({
        directory: path.join(__dirname, '..', 'locales'),
        defaultLocale: defaultLocale,
        queryParameter: 'lang',
        cookie: 'nodeappi-lang',
        syncFiles: true, // Crea los literales en todos los idiomas
        objectNotation: true, // Hace falta activarlo para usar la anotación por punto
        register: global // hace que i18n sea objeto global de node, por loque no hace falta importarlo ni llamar a los métodos con i18n
    });
    i18n.setLocale(defaultLocale); 

    return i18n;

}