import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Kaya from "./pages/kaya.jsx";
import Nuage from "./pages/nuage.jsx";
import Audio from "./pages/Audio.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/malakaya" element={<Kaya />} />
        <Route path="/nuage" element={<Nuage />} />
        <Route path="/audio" element={<Audio />} />

      </Routes>
    </div>
  );
};

export default App;
