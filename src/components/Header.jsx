import { NavLink } from "react-router";
import LanguageButton from "./LanguageButton.jsx";
import useLanguage from "../utils/useLanguage.js";

export default function Header({ infoIsOpen, setInfoIsOpen }) {
  const { language } = useLanguage();
  const close = {
    en: "close",
    es: "cerrar",
  };

  return (
    <header className="fixed inset-0 z-20 flex h-min w-full items-start justify-between px-4 py-2 font-[Nimbus-Cond] uppercase mix-blend-difference">
      <NavLink to="/" onClick={() => setInfoIsOpen(false)}>
        {/* <h1 className="font-[Nimbus-Bold] text-4xl">Clara Bunge</h1> */}
        <img
          src="/img/shapes.svg"
          alt="Clara Bunge"
          className="-ml-6 w-58 rotate-12"
        />
      </NavLink>
      <nav className="flex gap-2">
        <button
          className="cursor-pointer uppercase"
          onClick={() => setInfoIsOpen((prev) => !prev)}
        >
          {infoIsOpen ? close[language] : "info"}
        </button>
        <LanguageButton />
      </nav>
    </header>
  );
}
