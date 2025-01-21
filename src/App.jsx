import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Enzo from './pages/Enzo.jsx';
import Workshop from './pages/Workshop.jsx';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/enzo" element={<Enzo />} />
          <Route path="/enzo/:id" element={<Workshop />} />
      </Routes>
    </div>
  );
};

export default App;
