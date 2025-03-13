import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="fixed inset-0 z-20 flex h-min w-full items-start justify-between px-4 py-2 font-[Nimbus-Cond] uppercase mix-blend-difference">
      <NavLink to="/">
        {/* <h1 className="font-[Nimbus-Bold] text-4xl">Clara Bunge</h1> */}
        <img
          src="/img/shapes.svg"
          alt="Clara Bunge"
          className="-ml-6 w-80 rotate-12"
        />
      </NavLink>
      <nav className="flex gap-2">
        <a className="">?</a>
        <button className="text-white/50">EN</button>
      </nav>
    </header>
  );
}
