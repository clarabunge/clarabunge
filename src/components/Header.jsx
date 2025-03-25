import { NavLink, useLocation } from "react-router";
import LanguageButton from "./LanguageButton.jsx";
import useLanguage from "../utils/useLanguage.js";

export default function Header({ infoIsOpen, setInfoIsOpen }) {
  const { language } = useLanguage();
  const location = useLocation();
  const close = {
    en: "close",
    es: "cerrar",
  };

  return (
    <header className="fixed inset-0 z-20 flex h-min w-full items-start justify-between p-8 text-sm mix-blend-difference select-none">
      <NavLink to="/" onClick={() => setInfoIsOpen(false)}>
        <img
          src="/img/clara1.svg"
          alt="Clara Bunge"
          className="-mt-2 -ml-2 w-42 invert hover:blur-[1px]"
        />
      </NavLink>
      <nav className="flex gap-2 leading-none">
        <button
          className={`group hover:bg-text hover:text-background cursor-pointer uppercase transition-all ${
            location.pathname === "/" || location.pathname === "/info"
              ? "text-white"
              : ""
          }`}
          onClick={() => setInfoIsOpen((prev) => !prev)}
        >
          {infoIsOpen ? close[language] : "bio"}
        </button>
        <LanguageButton />
      </nav>
    </header>
  );
}
