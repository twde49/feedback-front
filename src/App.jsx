import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import Kaya from "./pages/kaya.jsx";
import Nuage from "./pages/nuage.jsx";
import Audio from "./pages/Audio.jsx";
import Pierre from "./pages/Pierre.jsx";
import Enzo from './pages/Enzo.jsx';
import Workshop from './pages/Workshop.jsx';


const App = () => {
  return (
    <div className="h-full w-screen flex flex-col items-center justify-center min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/malakaya" element={<Kaya />} />
        <Route path="/nuage" element={<Nuage />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/pierre" element={<Pierre />} />
        <Route path="/enzo" element={<Enzo />} />
        <Route path="/enzo/:id" element={<Workshop />} />

      </Routes>
    </div>
  );
};

export default App;
