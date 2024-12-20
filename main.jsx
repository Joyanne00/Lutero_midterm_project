import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Correct path
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Make sure there is an element with id 'root' in your HTML.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
