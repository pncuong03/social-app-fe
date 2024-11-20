import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Cấu hình i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/common.json",
    },
    lng: "vi", // Ngôn ngữ mặc định
    fallbackLng: "en", // Ngôn ngữ dự phòng khi không tìm thấy ngôn ngữ người dùng chọn
    interpolation: {
      escapeValue: false, // Không escape giá trị trong nội dung
    },
    detection: {
      // Không tự động lấy ngôn ngữ trong localStorage khi load page
      order: [], // Remove localStorage from here, so we control language change explicitly
      caches: [], // Don't cache language in localStorage on initial load
    },
  });

export default i18n;
