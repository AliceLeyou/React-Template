import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguagDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import enSample1 from 'locales/en/sample_ns.json';
import deSample1 from 'locales/de/sample_ns.json';
import enSample2 from 'locales/en/sample_ns2.json';
import deSample2 from 'locales/de/sample_ns2.json';

export const defaultNS = 'common';
export const resources = {
  en: { common: enSample1, auth: enSample2 },
  de: { common: deSample1, auth: deSample2 },
};

i18n
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(`./${language}/${namespace}.json`)
        .then((resources) => {
          callback(null, resources);
        })
        .catch((error) => {
          callback(error, null);
        });
    })
  )
  .use(LanguagDetector)
  .use(initReactI18next)
  .init({ fallbackLng: 'en', ns: ['common'], defaultNS, resources });
