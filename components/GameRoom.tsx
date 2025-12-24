
import React, { useState, useEffect, useRef } from 'react';
import { Player, GameTurn } from '../types';
import { CATEGORIES, LETTERS, BOT_NAMES, AVATARS } from '../constants';
import { validateWord, getBotResponse } from '../services/geminiService';

interface GameRoomProps {
  onGameEnd: (stats: { score: number, winner: string }) => void;
  playerName: string;
}

export const GameRoom: React.FC<GameRoomProps> = ({ onGameEnd, playerName }) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 'me', username: playerName, avatar: AVATARS[0], score: 0, level: 5, isTyping: false, isReady: true },
    { id: 'bot1', username: BOT_NAMES[Math.floor(Math.random()*BOT_NAMES.length)], avatar: AVATARS[Math.floor(Math.random()*AVATARS.length)], score: 0, level: 3, isTyping: false, isReady: true }
  ]);
  const [turn, setTurn] = useState<GameTurn>({ category: 'Şehirler', letter: 'S', timer: 15, totalTime: 15 });
  const [currentInput, setCurrentInput] = useState('');
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const startNewRound = () => {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    setTurn({ category, letter, timer: 15, totalTime: 15 });
    setCurrentInput('');
    setStatusMsg('');
    setInputError(false);
    setIsChecking(false);
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    if (isGameOver) return;
    const timerId = setInterval(() => {
      setTurn(prev => {
        if (prev.timer <= 1) {
          handleRoundEnd();
          return { ...prev, timer: 0 };
        }
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isGameOver]);

  useEffect(() => {
    if (turn.timer === 11 && !isGameOver) {
      setPlayers(prev => prev.map(p => p.id === 'bot1' ? { ...p, isTyping: true } : p));
      const botResponseTime = 2000 + Math.random() * 4000;
      setTimeout(async () => {
        if (isGameOver) return;
        const word = await getBotResponse(turn.category, turn.letter, usedWords);
        if (word && !isGameOver) {
          setPlayers(prev => prev.map(p => p.id === 'bot1' ? { ...p, isTyping: false, lastWord: word, score: p.score + (word.length * 10) } : p));
          setUsedWords(prev => [...prev, word.toLowerCase()]);
        } else {
          setPlayers(prev => prev.map(p => p.id === 'bot1' ? { ...p, isTyping: false } : p));
        }
      }, botResponseTime);
    }
  }, [turn.category, turn.letter, isGameOver]);

  const handleRoundEnd = () => {
    if (!isGameOver) startNewRound();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isChecking) return;

    const word = currentInput.trim().toLowerCase();
    
    if (word.length < 2) {
      triggerError('ÇOK KISA!');
      return;
    }
    
    if (usedWords.includes(word)) {
      triggerError('ZATEN KULLANILDI!');
      return;
    }

    if (!word.startsWith(turn.letter.toLowerCase())) {
      triggerError(`'${turn.letter.toUpperCase()}' İLE BAŞLAMALI!`);
      return;
    }

    setIsChecking(true);
    setStatusMsg('KONTROL EDİLİYOR...');
    const result = await validateWord(word, turn.category, turn.letter);
    
    if (result.isValid) {
      const points = (word.length * 15) + (turn.timer * 10);
      setPlayers(prev => prev.map(p => p.id === 'me' ? { ...p, score: p.score + points, lastWord: word } : p));
      setUsedWords(prev => [...prev, word]);
      setCurrentInput('');
      setStatusMsg(`DOĞRU! +${points}`);
      setIsChecking(false);
      setTimeout(startNewRound, 800);
    } else {
      triggerError(result.reason || 'GEÇERSİZ KELİME!');
      setIsChecking(false);
    }
  };

  const triggerError = (msg: string) => {
    setStatusMsg(msg);
    setInputError(true);
    setTimeout(() => {
      setInputError(false);
      setStatusMsg('');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-4 animate-in fade-in zoom-in duration-500">
      
      {/* Dynamic Player HUD */}
      <div className="flex items-center justify-between glass-card p-3 rounded-2xl border-white/5 shadow-xl">
        <div className="flex gap-2">
          {players.map(p => (
            <div key={p.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${p.id === 'me' ? 'border-orange-500/40 bg-orange-500/5' : 'border-slate-800 bg-slate-950/40'}`}>
              <div className="relative">
                <img src={p.avatar} alt={p.username} className="w-8 h-8 rounded-lg border border-white/5" />
                {p.isTyping && (
                  <div className="absolute -top-1 -right-1 flex gap-0.5 bg-orange-500 rounded-full px-1.5 py-1 animate-bounce shadow-lg">
                    <span className="w-0.5 h-0.5 bg-white rounded-full"></span>
                    <span className="w-0.5 h-0.5 bg-white rounded-full"></span>
                  </div>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-[9px] font-black text-slate-500 truncate w-16 uppercase tracking-wider">{p.username}</p>
                <p className="text-sm font-black text-white font-orbitron leading-none">{p.score}</p>
              </div>
              <div className="sm:hidden">
                <p className="text-xs font-black text-white font-orbitron leading-none">{p.score}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
           <div className="text-right">
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Süre</p>
             <p className={`text-xl font-black font-orbitron leading-none ${turn.timer < 5 ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}>{turn.timer}s</p>
           </div>
           <button 
             onClick={() => onGameEnd({ score: players[0].score, winner: playerName })}
             className="bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/10"
           >
             AYRIL
           </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Battle Arena Card */}
        <div className="relative glass-card border-2 border-white/5 p-8 md:p-12 rounded-[3rem] flex flex-col items-center justify-center overflow-hidden min-h-[320px] shadow-2xl">
          
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-950">
            <div 
              className={`h-full transition-all duration-1000 ease-linear ${turn.timer < 5 ? 'bg-red-500 shadow-[0_0_20px_red]' : 'bg-gradient-to-r from-orange-500 to-purple-600'}`} 
              style={{ width: `${(turn.timer / turn.totalTime) * 100}%` }}
            ></div>
          </div>

          <div className="text-center z-10 relative">
            <p className="text-orange-500/60 text-[10px] font-black uppercase tracking-[0.4em] mb-4">KATEGORİ</p>
            <h1 className="text-4xl md:text-6xl font-black font-orbitron mb-10 text-white neon-text-orange tracking-tight">{turn.category}</h1>
            
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-3xl animate-pulse group-hover:bg-purple-600/40 transition-all"></div>
              <div className="flex items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-purple-500/30 bg-purple-950/20 backdrop-blur-md shadow-2xl animate-float relative z-10">
                <span className="text-7xl md:text-8xl font-black font-orbitron text-purple-500 neon-text-purple">{turn.letter}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Word History Strip */}
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 px-1 no-wrap">
          {usedWords.slice(-10).reverse().map((word, idx) => (
            <div key={idx} className="flex-shrink-0 bg-slate-900 border border-white/5 text-slate-300 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-right-4">
              {word}
            </div>
          ))}
          {usedWords.length === 0 && (
            <div className="w-full text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest py-2">Sıra Sende!</div>
          )}
        </div>

        {/* Tactical Input Area */}
        <form onSubmit={handleSubmit} className="relative group mb-10">
          <input 
            ref={inputRef}
            autoFocus
            disabled={isChecking}
            value={currentInput}
            onChange={(e) => {
              setCurrentInput(e.target.value);
              if (inputError) setInputError(false);
            }}
            placeholder="KELİMENİ SÖYLE..."
            className={`w-full bg-slate-950 border-2 rounded-[1.5rem] px-6 py-6 text-xl md:text-2xl font-black text-white placeholder-slate-800 outline-none transition-all shadow-2xl backdrop-blur-xl ${inputError ? 'border-red-500 animate-shake text-red-500' : 'border-white/5 focus:border-orange-500'} ${isChecking ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button 
            type="submit" 
            disabled={isChecking || !currentInput.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-900/40 active:scale-90 transition-all z-20"
          >
            {isChecking ? '...' : 'SAVAŞ'}
          </button>
          
          {statusMsg && (
            <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 font-black text-[10px] uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-1 ${statusMsg.includes('!') ? 'text-orange-500 neon-text-orange' : 'text-slate-500'}`}>
              {statusMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
