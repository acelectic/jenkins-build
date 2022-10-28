import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import th from "./th.json"
import en from "./en.json"
import Backend from "i18next-http-backend"
// import { initLangKey } from "../../components/layout/SwitchLanguageButton"
import { INIT_LANG_KEY } from "../../constants"
import { config } from "../../configs"
// import LocalStorageHelper from "../local-storage-helper"

const resources = {
  th: {
    translation: th,
  },
  en: {
    translation: en,
  },
}

const baseUrl = config.BACKOFFICE_SERVICE_API_URL
const initLang = localStorage.getItem(INIT_LANG_KEY) || "th"

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: initLang,
    supportedLngs: ["en", "th"],
    fallbackLng: "th",
    react: {
      useSuspense: false,
      wait: true,
    },
    backend: {
      loadPath: `${baseUrl}/api/v1/translates/error-{{lng}}.json`,
    },
    resources,
    // debug: true,
  })
i18next.reloadResources()

export default i18next
