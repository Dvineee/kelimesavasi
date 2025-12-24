
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Lobby } from './components/Lobby';
import { GameRoom } from './components/GameRoom';
import { Results } from './components/Results';
import { GameState, UserProfile } from './types';
import { INITIAL_USER } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LOGIN);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [lastGameScore, setLastGameScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load persistence
  useEffect(() => {
    const savedName = localStorage.getItem('ks_username');
    const savedData = localStorage.getItem('ks_user_data');
    
    if (savedName) {
      const parsedData = savedData ? JSON.parse(savedData) : { ...INITIAL_USER, username: savedName };
      setUser(parsedData);
      setGameState(GameState.LOBBY);
    }
    
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleLogin = (username: string) => {
    const newUser = { ...INITIAL_USER, username };
    localStorage.setItem('ks_username', username);
    localStorage.setItem('ks_user_data', JSON.stringify(newUser));
    setUser(newUser);
    setGameState(GameState.LOBBY);
  };

  const startMatchmaking = (mode: 'ranked' | 'private') => {
    setGameState(GameState.MATCHMAKING);
    // Simulate matchmaking with dynamic loading messages
    setTimeout(() => {
      setGameState(GameState.PLAYING);
    }, 2000);
  };

  const handleGameEnd = (stats: { score: number, winner: string }) => {
    setLastGameScore(stats.score);
    const updatedUser: UserProfile = {
      ...user,
      totalPoints: user.totalPoints + stats.score,
      xp: user.xp + 100,
      wins: stats.winner === user.username ? user.wins + 1 : user.wins,
      gamesPlayed: user.gamesPlayed + 1,
      level: Math.floor((user.xp + 100) / 500) + 1
    };
    setUser(updatedUser);
    localStorage.setItem('ks_user_data', JSON.stringify(updatedUser));
    setGameState(GameState.RESULTS);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-4 md:pt-8 flex flex-col flex-grow relative z-10 pb-20">
        {/* Main Logo & Status */}
        <div className="text-center mb-6 md:mb-10 page-transition">
          <div className="inline-flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-black font-orbitron tracking-tighter text-white relative group cursor-default">
              <span className="text-orange-500 transition-all duration-500 group-hover:neon-text-orange">KELİME</span> SAVAŞI
              <div className="absolute -top-4 -right-8 text-[10px] bg-purple-600 text-white px-2 py-1 rounded-lg font-black tracking-normal rotate-12 shadow-xl shadow-purple-900/20">LIVE</div>
            </h1>
            <div className="flex items-center gap-3 mt-3">
               <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-orange-500"></div>
               <p className="text-slate-500 font-black tracking-[0.4em] uppercase text-[9px]">Geleceğin Kelime Oyunu</p>
               <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>
          </div>
        </div>

        {gameState === GameState.LOGIN && (
          <Login onLogin={handleLogin} />
        )}

        {gameState === GameState.LOBBY && (
          <Lobby 
            user={user} 
            onStartGame={startMatchmaking} 
            onViewProfile={() => {}} 
          />
        )}

        {gameState === GameState.MATCHMAKING && (
          <div className="flex-grow flex flex-col items-center justify-center gap-8 page-transition">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">🔎</div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-black font-orbitron text-white neon-text-orange">EŞLEŞME ARANIYOR</h2>
              <p className="text-xs text-slate-500 mt-2 uppercase tracking-[0.3em] font-bold">Lobi: Bölge-1 (Türkiye)</p>
            </div>
          </div>
        )}

        {gameState === GameState.PLAYING && (
          <GameRoom 
            playerName={user.username}
            onGameEnd={handleGameEnd}
          />
        )}

        {gameState === GameState.RESULTS && (
          <Results 
            score={lastGameScore}
            winner={user.username}
            onBackToLobby={() => setGameState(GameState.LOBBY)}
          />
        )}
      </div>
    </Layout>
  );
};

export default App;
