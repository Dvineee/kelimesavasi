
import React from 'react';

interface ResultsProps {
  score: number;
  winner: string;
  onBackToLobby: () => void;
}

export const Results: React.FC<ResultsProps> = ({ score, winner, onBackToLobby }) => {
  return (
    <div className="max-w-md mx-auto w-full flex flex-col items-center text-center gap-6 py-8 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-orange-500 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl shadow-orange-500/20 mb-2 rotate-3 animate-float">🏆</div>
      <div>
        <h1 className="text-4xl font-black font-orbitron text-white neon-text-orange leading-tight">MAÇ BİTTİ</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Savaşın galibi belli oldu</p>
      </div>

      <div className="w-full glass-card border border-slate-800 p-6 rounded-[2rem] flex flex-col gap-5 shadow-2xl">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Kazanan</span>
          <span className="text-lg font-black text-orange-400 font-orbitron">{winner}</span>
        </div>
        <div className="h-px bg-slate-800 w-full opacity-50"></div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Skorun</span>
          <span className="text-3xl font-black text-white font-orbitron">{score}</span>
        </div>
        <div className="h-px bg-slate-800 w-full opacity-50"></div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Gelişim</span>
          <span className="text-sm font-black text-purple-400 font-orbitron">+120 XP</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-orange-900/30 active:scale-95"
        >
          TEKRAR OYNA
        </button>
        <button 
          onClick={onBackToLobby}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-black py-4 rounded-2xl transition-all border border-slate-700"
        >
          LOBİYE DÖN
        </button>
      </div>
    </div>
  );
};
