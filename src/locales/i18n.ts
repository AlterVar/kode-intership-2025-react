import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import ruTranslation from "./ru/translation.json";

const language = navigator.language.slice(0, 2);

i18next.use(initReactI18next).init({
	lng: language,
  fallbackLng: "ru",
  returnObjects: true,
  supportedLngs: ["en", "ru"],
  resources: {
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
