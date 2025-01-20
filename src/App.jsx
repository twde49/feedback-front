import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Pierre from "./pages/Pierre.jsx";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/pierre" element={<Pierre />} />
      </Routes>
    </div>
  );
};

export default App;
