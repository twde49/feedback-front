import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Kaya from "./pages/kaya.jsx";
import Nuage from "./pages/nuage.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/malakaya" element={<Kaya />} />
        <Route path="/nuage" element={<Nuage />} />
      </Routes>
    </div>
  );
};

export default App;
