import { createI18n } from 'vue-i18n';

import navbarEn from './locales/en/navbar.json';
import navbarNl from './locales/nl/navbar.json';
import contactEn from './locales/en/contact.json';
import contactNl from './locales/nl/contact.json';

const messages = {
    en: {
        contact: contactEn,
        navbar: navbarEn
    },
    nl: {
        contact: contactNl,
        navbar: navbarNl
    }
};

const i18n = createI18n({
    legacy: false,
    locale: 'nl',
    fallbackLocale: 'en',
    messages
});

export default i18n;