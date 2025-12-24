
import { UserProfile } from './types';

export const INITIAL_USER: UserProfile = {
  username: 'Savaşçı_01',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  level: 5,
  xp: 450,
  wins: 12,
  gamesPlayed: 28,
  totalPoints: 12400,
  league: 'Gümüş'
};

export const CATEGORIES = [
  "Hayvanlar", "Şehirler", "Meyveler", "Meslekler", "Eşyalar", 
  "Ünlüler", "Filmler", "Müzik Enstrümanları", "Teknoloji", "Spor Dalları"
];

export const LETTERS = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split("");

export const BOT_NAMES = [
  "KelimeCan", "HızlıYazan", "SözlükCanavarı", "GamerTürk", 
  "AlfabeKralı", "ZekaKüpü", "HarfAvcısı", "Deyimci"
];

export const AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack"
];
