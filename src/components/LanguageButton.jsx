import useLanguage from "../utils/useLanguage";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="cursor-pointer text-white/50"
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
    >
      {language === "en" ? "ES" : "EN"}
    </button>
  );
}
