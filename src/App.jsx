import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Kaya from "./pages/kaya.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/malakaya" element={<Kaya />} />
      </Routes>
    </div>
  );
};

export default App;
