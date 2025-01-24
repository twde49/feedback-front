import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MovementProvider } from './context/MovementContext'; // Import MovementProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovementProvider>
        <App />
      </MovementProvider>
    </BrowserRouter>
  </React.StrictMode>
);
