
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const startApp = () => {
  console.log('Kelime Savaşı başlatılıyor...');
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Kritik Hata: 'root' id'li div bulunamadı!");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Render Hatası:", err);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
