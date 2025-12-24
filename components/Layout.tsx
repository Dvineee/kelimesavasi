
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-purple-900/10 blur-[100px] rounded-full"></div>
      </div>
      
      <main className="flex-grow flex flex-col z-10 p-4 md:p-8">
        {children}
      </main>

      <footer className="z-10 py-4 px-8 border-t border-slate-800 flex justify-between items-center text-slate-500 text-xs">
        <p>© 2024 Kelime Savaşı Online - Premium Edition</p>
        <div className="flex gap-4">
          <span className="hover:text-cyan-400 cursor-pointer">Destek</span>
          <span className="hover:text-pink-400 cursor-pointer">Kılavuz</span>
        </div>
      </footer>
    </div>
  );
};
