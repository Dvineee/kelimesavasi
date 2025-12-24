
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 min-h-[60vh]">
      <div className="w-full max-w-md relative">
        {/* Background Decor */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="glass-card p-10 rounded-[3rem] shadow-2xl border-white/10 animate-in zoom-in slide-in-from-bottom-10 duration-700 relative z-10">
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-orange-700 rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-5xl shadow-2xl shadow-orange-500/30 animate-float active-pulse">
              ⚔️
            </div>
            <h2 className="text-4xl font-black font-orbitron text-white neon-text-orange tracking-tight">KELİME SAVAŞI</h2>
            <p className="text-slate-500 mt-3 font-medium uppercase tracking-[0.2em] text-[10px]">Efsanevi Kelime Düellosu</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label className={`absolute left-6 transition-all font-black uppercase tracking-widest pointer-events-none ${isFocused || username ? '-top-6 text-[9px] text-orange-500' : 'top-5 text-sm text-slate-600'}`}>
                SAVAŞÇI ADIN
              </label>
              <input 
                type="text" 
                maxLength={15}
                required
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={!isFocused ? "LAKAP BELİRLE..." : ""}
                className="w-full bg-slate-950 border-2 border-white/5 focus:border-orange-500 rounded-2xl px-6 py-5 text-white outline-none transition-all text-xl font-black shadow-inner"
              />
            </div>

            <button 
              type="submit"
              disabled={username.trim().length < 3}
              className="w-full py-6 rounded-3xl bg-orange-600 hover:bg-orange-500 disabled:opacity-30 disabled:grayscale text-white font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-orange-900/40 transition-all active:scale-95 btn-orange"
            >
              KATIL VE SAVAŞ
            </button>
          </form>
          
          <div className="mt-10 flex items-center justify-center gap-6 opacity-30 grayscale">
              <span className="text-2xl">🌍</span>
              <span className="text-2xl">🏆</span>
              <span className="text-2xl">🔥</span>
          </div>
          
          <p className="text-center text-slate-700 text-[9px] font-bold mt-8 uppercase tracking-widest">
             Giriş yaparak kullanım şartlarını kabul etmiş sayılırsın.
          </p>
        </div>
      </div>
    </div>
  );
};
