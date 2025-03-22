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
    <header className="fixed inset-0 z-20 flex h-min w-full items-start justify-between p-8 text-sm mix-blend-difference">
      <NavLink to="/" onClick={() => setInfoIsOpen(false)}>
        {/* <img
          src="/img/circulo.svg"
          alt=""
          className="absolute inset-0 -z-10 -mt-8 ml-14 size-38 scale-x-175 -rotate-2 opacity-50"
        />
        <h1 className="font-[display] text-2xl uppercase transition-all hover:text-[var(--primary)]">
          Clara Bunge
        </h1> */}
        <img
          src="/img/clara1.svg"
          alt="Clara Bunge"
          className="-mt-2 -ml-2 w-60 invert"
        />
      </NavLink>
      <nav className="flex gap-2 leading-none">
        <button
          className="group cursor-pointer uppercase transition-all hover:text-[var(--primary)]"
          onClick={() => setInfoIsOpen((prev) => !prev)}
        >
          {infoIsOpen ? close[language] : "info"}
        </button>
        <LanguageButton />
      </nav>
    </header>
  );
}
