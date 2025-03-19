import useLanguage from "../utils/useLanguage";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="cursor-pointer text-[var(--secondary)] transition-all hover:text-white"
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
    >
      {language === "en" ? "ES" : "EN"}
    </button>
  );
}
