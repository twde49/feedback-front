import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import Kaya from "./pages/kaya.jsx";
import Nuage from "./pages/nuage.jsx";
import Audio from "./pages/Audio.jsx";
import Pierre from "./pages/Pierre.jsx";
import Enzo from './pages/ListWorkshop.jsx';
import Workshop from './pages/Workshop.jsx';
import Api from "./pages/api.jsx";


const App = () => {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camera" element={<Camera />} />

          <Route path="/malakaya" element={<Kaya />} />
          <Route path="/nuage" element={<Nuage />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/pierre" element={<Pierre />} />
          <Route path="/api" element={<Api />} />

            <Route path="/enzo" element={<Enzo />} />
            <Route path="/enzo/:id" element={<Workshop />} />



        </Routes>

  );
};

export default App;
