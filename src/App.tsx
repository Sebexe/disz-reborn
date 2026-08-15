import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EstimacionPage from "./pages/EstimacionPage";
import EnsayoPage from "./pages/EnsayoPage";
import ComparacionPage from "./pages/ComparacionPage";
import ChiCuadradoPage from "./pages/ChiCuadradoPage";
import RegresionPage from "./pages/RegresionPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estimacion/*" element={<EstimacionPage />} />
          <Route path="/ensayo/*" element={<EnsayoPage />} />
          <Route path="/comparacion/*" element={<ComparacionPage />} />
          <Route path="/chi/*" element={<ChiCuadradoPage />} />
          <Route path="/regresion/*" element={<RegresionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
