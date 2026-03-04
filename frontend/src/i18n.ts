import { createI18n } from 'vue-i18n';

import navbarEn from './locales/en/navbar.json';
import navbarNl from './locales/nl/navbar.json';
import contactEn from './locales/en/contact.json';
import contactNl from './locales/nl/contact.json';
import projectsEn from './locales/en/projects.json';
import projectsNl from './locales/nl/projects.json';
import pagesEn from './locales/en/pages.json';
import pagesNl from './locales/nl/pages.json';

const messages = {
    en: {
        contact: contactEn,
        navbar: navbarEn,
        projects: projectsEn,
        home: pagesEn.home,
        cv: pagesEn.cv
    },
    nl: {
        contact: contactNl,
        navbar: navbarNl,
        projects: projectsNl,
        home: pagesNl.home,
        cv: pagesNl.cv
    }
};

const i18n = createI18n({
    legacy: false,
    locale: 'nl',
    fallbackLocale: 'en',
    messages
});

export default i18n;