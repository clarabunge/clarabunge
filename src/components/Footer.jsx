import useLanguage from "../utils/useLanguage";
import { NavLink } from "react-router";

export default function Footer({ prevProject, nextProject }) {
  const { language } = useLanguage();

  return (
    <div
      className="relative h-20"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="bg-secondary fixed bottom-0 flex h-20 w-full flex-col justify-center gap-2 px-4 text-black">
        <div className="border-background flex items-center justify-between border-b text-sm">
          <NavLink
            to={`/${prevProject?.slug?.current}`}
            className="hover:bg-primary flex w-full cursor-pointer items-center gap-2 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#black"
            >
              <path d="m313-440 196 196q12 12 11.5 28T508-188q-12 11-28 11.5T452-188L188-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11t28.5 11q12 12 12 28.5T508-715L313-520h447q17 0 28.5 11.5T800-480q0 17-11.5 28.5T760-440H313Z" />
            </svg>
            <span>{language === "en" ? "PREVIOUS" : "ANTERIOR"}</span>
          </NavLink>
          <NavLink
            to="/"
            className="hover:bg-primary border-background w-full cursor-pointer border-x py-1 text-center"
          >
            {language === "en" ? "HOME" : "INICIO"}
          </NavLink>
          <NavLink
            to={`/${nextProject?.slug?.current}`}
            className="hover:bg-primary flex w-full cursor-pointer items-center justify-end gap-2 py-1"
          >
            <span>{language === "en" ? "NEXT" : "SIGUIENTE"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#black"
            >
              <path d="M647-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h447L451-716q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l264 264q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L508-188q-11 11-27.5 11T452-188q-12-12-12-28.5t12-28.5l195-195Z" />
            </svg>
          </NavLink>
        </div>

        <div className="flex w-full items-center gap-2 font-[detail] text-[0.7rem] opacity-60">
          <p>Clara Bunge &copy; {new Date().getFullYear()}</p>
          <div className="bg-background size-1 rounded-full" />
          <p>website x astrosuka + sofja</p>
        </div>
      </div>
    </div>
  );
}
