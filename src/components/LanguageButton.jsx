import useLanguage from "../utils/useLanguage";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="text-white/50"
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
    >
      {language === "en" ? "EN" : "ES"}
    </button>
  );
}
