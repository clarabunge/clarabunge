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
    <header className="pointer-events-none fixed inset-0 z-20 flex h-min w-full items-start justify-between p-4 text-sm mix-blend-difference select-none md:p-8">
      <div className="pointer-events-auto">
        <NavLink to="/" onClick={() => setInfoIsOpen(false)}>
          <img
            src="/img/clara1.svg"
            alt="Clara Bunge"
            className="-mt-2 -ml-2 w-42 invert hover:blur-[1px]"
          />
        </NavLink>
      </div>
      <nav className="pointer-events-auto flex gap-2 leading-none">
        <svg
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28.33 25.96"
          className="size-3"
          fill="var(--color-primary)"
        >
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M11.21.07c7.79-1.23,24.32,13.24,13.61,21.74C4.99,37.54-12.02,3.74,11.21.07Z" />
          </g>
        </svg>
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
