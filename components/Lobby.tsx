
import React, { useState, useEffect } from 'react';
import { UserProfile, GameRoomData } from '../types';

interface LobbyProps {
  user: UserProfile;
  onStartGame: (mode: 'ranked' | 'private') => void;
  onViewProfile: () => void;
}

const INITIAL_ROOMS: GameRoomData[] = [
  { id: '1', name: 'Zeka Meydanı', playerCount: 4, maxPlayers: 8, isPrivate: false, owner: 'Eren_06' },
  { id: '2', name: 'Hızlı Parmaklar', playerCount: 2, maxPlayers: 4, isPrivate: false, owner: 'Selinay_TR' },
  { id: '3', name: 'Özel Düello', playerCount: 1, maxPlayers: 2, isPrivate: true, owner: 'Kerem_X' },
  { id: '4', name: 'Word Master Pro', playerCount: 6, maxPlayers: 10, isPrivate: false, owner: 'KelimeKralı' },
];

export const Lobby: React.FC<LobbyProps> = ({ user, onStartGame, onViewProfile }) => {
  const [rooms, setRooms] = useState<GameRoomData[]>(INITIAL_ROOMS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [activeTab, setActiveTab] = useState<'rooms' | 'leaderboard'>('rooms');

  // Simulation: Occasionally update player counts to feel "live"
  useEffect(() => {
    const interval = setInterval(() => {
      setRooms(prev => prev.map(room => {
        if (Math.random() > 0.7 && room.playerCount < room.maxPlayers) {
          return { ...room, playerCount: room.playerCount + 1 };
        }
        if (Math.random() > 0.8 && room.playerCount > 1) {
          return { ...room, playerCount: room.playerCount - 1 };
        }
        return room;
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fix: Defined handleCreateRoom to handle the room creation form submission
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      setShowCreateModal(false);
      onStartGame('private');
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-10">
      
      {/* Mobile-Friendly Profile & Stats Header */}
      <div className="glass-card rounded-[2rem] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl border-white/5">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group cursor-pointer" onClick={onViewProfile}>
            <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img src={user.avatar} alt="Profile" className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 border-orange-500 relative z-10 transition-transform group-hover:scale-105" />
            <div className="absolute -bottom-1 -right-1 bg-purple-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-white z-20 shadow-xl">LVL {user.level}</div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-black font-orbitron text-white tracking-tight">{user.username}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">{user.league}</span>
              <span className="text-slate-700">•</span>
              <span className="text-xs font-medium text-slate-400">{user.totalPoints.toLocaleString()} Puan</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar py-1">
          <div className="flex-shrink-0 bg-slate-900/50 border border-white/5 px-4 py-2 rounded-xl text-center min-w-[80px]">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Maç</p>
            <p className="text-sm font-black text-white">{user.gamesPlayed}</p>
          </div>
          <div className="flex-shrink-0 bg-slate-900/50 border border-white/5 px-4 py-2 rounded-xl text-center min-w-[80px]">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Galibiyet</p>
            <p className="text-sm font-black text-orange-500">{user.wins}</p>
          </div>
          <button className="flex-shrink-0 px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black shadow-lg shadow-orange-900/20 transition-all ml-auto md:ml-2">MAĞAZA</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content: Tabs for Rooms or Leaderboard */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button 
              onClick={() => onStartGame('ranked')}
              className="group relative h-32 md:h-40 rounded-[2rem] bg-gradient-to-br from-orange-600/30 to-slate-900/50 border border-white/10 p-6 flex flex-col justify-end transition-all hover:scale-[1.02] active:scale-95 overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-30 transition-opacity">⚡</div>
              <h3 className="text-xl md:text-2xl font-black font-orbitron text-white relative z-10 group-hover:neon-text-orange transition-all">RANKED</h3>
              <p className="text-[10px] md:text-xs text-slate-400 relative z-10 font-medium">Hemen bir savaşa katıl.</p>
            </button>

            <button 
              onClick={() => setShowCreateModal(true)}
              className="group relative h-32 md:h-40 rounded-[2rem] bg-gradient-to-br from-purple-600/30 to-slate-900/50 border border-white/10 p-6 flex flex-col justify-end transition-all hover:scale-[1.02] active:scale-95 overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-30 transition-opacity">🏠</div>
              <h3 className="text-xl md:text-2xl font-black font-orbitron text-white relative z-10 group-hover:neon-text-purple transition-all">ODA KUR</h3>
              <p className="text-[10px] md:text-xs text-slate-400 relative z-10 font-medium">Kendi kurallarını koy.</p>
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 p-1 bg-slate-900/50 border border-white/5 rounded-2xl w-full max-w-xs mx-auto md:mx-0">
            <button 
              onClick={() => setActiveTab('rooms')}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${activeTab === 'rooms' ? 'bg-slate-800 text-orange-500 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              ODALAR
            </button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-slate-800 text-orange-500 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              LİDERLİK
            </button>
          </div>

          {/* Rooms List */}
          {activeTab === 'rooms' ? (
            <div className="glass-card rounded-[2.5rem] p-4 md:p-8 min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">AKTİF SAVAŞLAR</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  <span className="text-[10px] text-slate-500 font-bold">CANLI</span>
                </div>
              </div>

              <div className="space-y-3">
                {rooms.map((room, idx) => (
                  <div 
                    key={room.id} 
                    className="group flex items-center justify-between p-4 md:p-5 bg-slate-900/30 rounded-3xl border border-white/5 hover:border-orange-500/20 hover:bg-slate-900/60 transition-all animate-slide-right"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                        {room.isPrivate ? '🔒' : '🎮'}
                      </div>
                      <div>
                        <p className="font-black text-white text-sm md:text-base group-hover:text-orange-400 transition-colors">{room.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">
                          {room.owner} <span className="mx-1 text-slate-800">•</span> {room.playerCount}/{room.maxPlayers} OYUNCU
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onStartGame('ranked')}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:btn-orange text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl group-hover:translate-x-1"
                    >
                      KATIL
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-[2.5rem] p-8 min-h-[400px] flex flex-col items-center justify-center">
               <div className="text-4xl mb-4">🏆</div>
               <h3 className="text-xl font-black font-orbitron text-white mb-2">LİDERLİK TABLOSU</h3>
               <p className="text-xs text-slate-500 text-center max-w-xs">Bu sezonun en iyileri burada listelenir. Sıralamada yer almak için daha fazla maç kazan!</p>
               <div className="mt-8 w-full space-y-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-900/20 rounded-2xl border border-white/5">
                        <span className="text-sm font-black text-slate-500">#{i}</span>
                        <span className="text-sm font-bold text-white">Savaşçı_{i*13}</span>
                        <span className="text-xs font-black text-orange-500">{5000 - i*500} XP</span>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* Sidebar: Social & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Live Activity Feed */}
          <div className="glass-card rounded-[2.5rem] p-6 border-white/5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">CANLI AKIŞ</h4>
            <div className="space-y-4 h-64 overflow-y-auto no-scrollbar relative">
              {[
                { user: 'Caner_TR', action: 'Gümüş Ligine yükseldi!', time: 'Az önce', icon: '⭐' },
                { user: 'Melo_X', action: '5 maçlık seri yakaladı!', time: '2dk önce', icon: '🔥' },
                { user: 'Admin', action: 'Yeni kelime paketi eklendi.', time: '10dk önce', icon: '📦' },
                { user: 'Sözlükçü', action: 'Hızlı Savaş kazandı.', time: '15dk önce', icon: '⚔️' }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-[11px] animate-in slide-in-from-right-2 duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shadow-inner">{item.icon}</div>
                  <div>
                    <p className="text-white font-bold"><span className="text-orange-400">{item.user}</span> {item.action}</p>
                    <p className="text-[9px] text-slate-600 uppercase font-bold mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Quick Chat Simulation */}
          <div className="bg-gradient-to-br from-orange-600/10 to-purple-600/10 border border-orange-500/20 p-6 rounded-[2rem] group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_green]"></span>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">GLOBAL SOHBET</h4>
            </div>
            <div className="space-y-3 mb-4">
              <p className="text-[10px] text-slate-400"><span className="font-black text-orange-500">Mert:</span> Kim düello ister?</p>
              <p className="text-[10px] text-slate-400"><span className="font-black text-purple-500">Ece:</span> Yeni güncelleme çok iyi.</p>
            </div>
            <input 
              type="text" 
              placeholder="Mesaj yaz..." 
              className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-2 text-[10px] text-white placeholder-slate-600 outline-none focus:border-orange-500 transition-all"
            />
          </div>

          <div className="flex-grow flex flex-col justify-end">
            <p className="text-[10px] text-slate-600 font-bold text-center uppercase tracking-widest">Versiyon 1.4.2 Premium</p>
          </div>
        </div>
      </div>

      {/* Improved Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md glass-card p-8 rounded-[3rem] shadow-2xl border-white/10 animate-in zoom-in duration-400 relative">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <h2 className="text-3xl font-black font-orbitron text-white mb-2 neon-text-orange tracking-tight">ODA KUR</h2>
            <p className="text-sm text-slate-400 mb-8 font-medium">Savaş alanını sen belirle, rakiplerini davet et.</p>
            
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Oda İsmi</label>
                <input 
                  autoFocus
                  required
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Efsanevi Savaş"
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-orange-500 transition-all text-lg font-bold"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Oyuncu</label>
                  <select className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-all font-bold">
                    <option>2 Oyuncu</option>
                    <option>4 Oyuncu</option>
                    <option>8 Oyuncu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Tip</label>
                  <select className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-all font-bold">
                    <option>Genel</option>
                    <option>Gizli</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 rounded-[1.5rem] bg-orange-600 hover:bg-orange-500 text-white font-black uppercase text-sm tracking-[0.2em] shadow-2xl shadow-orange-900/40 transition-all active:scale-95"
              >
                SAVAŞI BAŞLAT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
