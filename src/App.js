import { Navbar } from "./components/Navbar";
import { APOD } from "./pages/APOD";
import { NEO } from "./pages/NEO";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<APOD />} />
        <Route path="/neo" element={<NEO />} />
      </Routes>
    </>
  );
}

export default App;
