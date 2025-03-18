import { useState } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Project from "./components/Project.jsx";
import Info from "./components/Info.jsx";
import { useMainContent } from "./utils/useData.js";

function App() {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const { isLoading, error } = useMainContent();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p>＞﹏＜</p>
      </div>
    );
  }

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
