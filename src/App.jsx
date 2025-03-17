import { useState } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Project from "./components/Project.jsx";
import Info from "./components/Info.jsx";

function App() {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  return (
    <>
      <Header infoIsOpen={infoIsOpen} setInfoIsOpen={setInfoIsOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
      </Routes>
      {infoIsOpen && <Info />}
    </>
  );
}

export default App;
