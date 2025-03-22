import useLanguage from "../utils/useLanguage";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="text-secondary-dim cursor-pointer transition-all hover:text-white"
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
    >
      {language === "en" ? "ES" : "EN"}
    </button>
  );
}
