import { Routes, Route, NavLink } from "react-router";
import Home from "./components/Home.jsx";
import Project from "./components/Project.jsx";

function App() {
  return (
    <>
      <header className="fixed inset-0 z-20 flex h-min w-full items-center justify-between px-4 py-2 font-[Nimbus-Bold] text-4xl uppercase">
        <NavLink to="/">
          <h1 className="">Clara Bunge</h1>
        </NavLink>
        <nav className="flex gap-2">
          <a className="">About</a>
          <button className="text-white/50">EN</button>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
