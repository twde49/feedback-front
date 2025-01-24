import { Routes, Route } from 'react-router-dom';
import './index.css';
import Nuage from "./pages/nuage.jsx";
import Audio from "./pages/Audio.jsx";
import ListWorkshop from './pages/ListWorkshop.jsx';
import Workshop from './pages/Workshop.jsx';
import Api from "./pages/api.jsx";
import Camera from "./pages/camDetection.jsx";


const App = () => {
  return (
        <Routes>
          <Route path="/" element={<Nuage />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/api" element={<Api />} />
          <Route path="/workshops" element={<ListWorkshop />} />
          <Route path="/workshops/:id" element={<Workshop />} />
        </Routes>
  );
};

export default App;
