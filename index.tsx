
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('Kelime Savaşı başlatılıyor...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root elemanı bulunamadı!");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
