import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Enzo from './pages/Enzo.jsx';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/enzo" element={<Enzo />} />
      </Routes>
    </div>
  );
};

export default App;
