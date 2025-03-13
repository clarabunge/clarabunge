import { Routes, Route } from "react-router";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Project from "./components/Project.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
