import { createI18n } from 'vue-i18n';

import navbarEn from './locales/en/navbar.json';
import navbarNl from './locales/nl/navbar.json';
import contactEn from './locales/en/contact.json';
import contactNl from './locales/nl/contact.json';
import projectsEn from './locales/en/projects.json';
import projectsNl from './locales/nl/projects.json';
import homeEn from './locales/en/home.json';
import homeNl from './locales/nl/home.json';
import cvEn from './locales/en/cv.json';
import cvNl from './locales/nl/cv.json';

const messages = {
    en: {
        contact: contactEn,
        navbar: navbarEn,
        projects: projectsEn,
        home: homeEn.home,
        cv: cvEn.cv
    },
    nl: {
        contact: contactNl,
        navbar: navbarNl,
        projects: projectsNl,
        home: homeNl.home,
        cv: cvNl.cv
    }
};

// Try to restore saved locale from cookie `about_locale` so user's choice
// survives reloads. If reading cookies fails (e.g., SSR) fall back to 'nl'.
function readSavedLocale(): string | null {
    try {
        const m = document.cookie.match(/(?:^|; )about_locale=([^;]+)/)
        return m ? decodeURIComponent(m[1]) : null
    } catch (err) {
        return null
    }
}

const initialLocale = readSavedLocale() || 'nl'

const i18n = createI18n({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: 'en',
    messages
});

export default i18n;