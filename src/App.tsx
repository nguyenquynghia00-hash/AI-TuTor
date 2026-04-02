import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Bot, User, Menu, X, Moon, Sun, 
  BookOpen, Calculator, Languages, Zap, FlaskConical, Dna,
  Landmark, Globe, Monitor, Cpu, Settings, LayoutDashboard, Users, Gamepad2,
  Sparkles, History, ChevronRight, ArrowLeft, Lightbulb, Trophy, ArrowDown, LogOut, Edit3,
  Timer, Brain, Puzzle, Calculator as CalcIcon, CheckCircle2, XCircle, Flame, Play, RotateCcw, Lock
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';
import { auth } from './firebase';
import { 
  signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile
} from 'firebase/auth';
import { GENERALS, GeneralRank, General } from './data/generals';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

type UserProfile = {
  uid: string;
  displayName: string;
  username: string;
  avatar: string;
  bio: string;
  favoriteSubject: string;
};

type Subject = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  desc: string;
};

type Game = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  tag: string;
  buttonColor: string;
  floatingIcon: string;
  bgTint: string;
};

type GameQuestion = {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
  type?: 'multiple' | 'text' | 'match';
  pairs?: { left: string; right: string }[];
};

type GameHistory = {
  id: string;
  gameId: string;
  score: number;
  date: string;
  subject: string;
};

type UserCard = {
  id: string;
  generalId: string;
  rank: GeneralRank;
  dateAcquired: string;
};

const RANK_RATES = {
  'C': 0.40,
  'B': 0.25,
  'A': 0.15,
  'S': 0.10,
  'S+': 0.07,
  'SSS': 0.03
};

const RANK_COLORS: Record<GeneralRank, string> = {
  'C': 'from-slate-400 to-slate-500 border-slate-400 text-slate-700',
  'B': 'from-green-400 to-green-600 border-green-400 text-green-800',
  'A': 'from-blue-400 to-blue-600 border-blue-400 text-blue-800',
  'S': 'from-purple-400 to-purple-600 border-purple-400 text-purple-800 shadow-[0_0_15px_rgba(168,85,247,0.5)]',
  'S+': 'from-pink-400 to-rose-600 border-pink-400 text-pink-900 shadow-[0_0_20px_rgba(236,72,153,0.6)]',
  'SSS': 'from-yellow-300 via-amber-500 to-orange-600 border-yellow-400 text-yellow-900 shadow-[0_0_30px_rgba(245,158,11,0.8)]'
};

const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Toán học', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20', border: 'border-blue-200 dark:border-blue-500/30', desc: 'Giải bài từng bước, hiển thị công thức' },
  { id: 'literature', name: 'Ngữ văn', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20', border: 'border-purple-200 dark:border-purple-500/30', desc: 'Gợi ý dàn ý, phân tích tác phẩm' },
  { id: 'english', name: 'Tiếng Anh', icon: Languages, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/20', border: 'border-green-200 dark:border-green-500/30', desc: 'Sửa ngữ pháp, luyện hội thoại' },
  { id: 'physics', name: 'Vật lý', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20', border: 'border-orange-200 dark:border-orange-500/30', desc: 'Giải bài tập, giải thích hiện tượng' },
  { id: 'chemistry', name: 'Hóa học', icon: FlaskConical, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-500/20', border: 'border-red-200 dark:border-red-500/30', desc: 'Cân bằng phương trình, giải bài tập' },
  { id: 'biology', name: 'Sinh học', icon: Dna, color: 'text-lime-500', bg: 'bg-lime-100 dark:bg-lime-500/20', border: 'border-lime-200 dark:border-lime-500/30', desc: 'Giải thích cơ chế sinh học, di truyền' },
  { id: 'history', name: 'Lịch sử', icon: Landmark, color: 'text-amber-700 dark:text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20', border: 'border-amber-200 dark:border-amber-500/30', desc: 'Tóm tắt sự kiện, timeline dễ hiểu' },
  { id: 'geography', name: 'Địa lý', icon: Globe, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-500/20', border: 'border-yellow-200 dark:border-yellow-500/30', desc: 'Phân tích biểu đồ, giải thích hiện tượng' },
  { id: 'it', name: 'Tin học', icon: Monitor, color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-500/20', border: 'border-cyan-200 dark:border-cyan-500/30', desc: 'Giải thích code, debug cơ bản' },
  { id: 'technology', name: 'Công nghệ', icon: Cpu, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/20', border: 'border-indigo-200 dark:border-indigo-500/30', desc: 'Ứng dụng công nghệ, mạch điện' },
  { id: 'civic', name: 'GDCD', icon: Users, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-500/20', border: 'border-teal-200 dark:border-teal-500/30', desc: 'Tình huống pháp luật, đạo đức' },
];

const GAMES: Game[] = [
  { 
    id: 'quiz', 
    name: 'Ai là triệu phú', 
    description: 'Vượt qua các câu hỏi hóc búa để chinh phục đỉnh cao trí tuệ và nhận phần thưởng lớn.', 
    icon: Brain, color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-500/20',
    tag: '🔥 Hot', buttonColor: 'from-orange-500 to-orange-600', floatingIcon: '🏆', bgTint: 'bg-orange-50/50 dark:bg-orange-900/10'
  },
  { 
    id: 'race', 
    name: 'Vượt chướng ngại vật', 
    description: 'Nhanh mắt nhanh tay giải mã các từ khóa để về đích sớm nhất trong cuộc đua này.', 
    icon: Timer, color: 'text-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-500/20',
    tag: '⚡ Hấp dẫn', buttonColor: 'from-cyan-400 to-cyan-500', floatingIcon: '🏃', bgTint: 'bg-cyan-50/50 dark:bg-cyan-900/10'
  },
  { 
    id: 'match', 
    name: 'Lật thẻ bí ẩn', 
    description: 'Thử thách trí nhớ siêu phàm bằng cách tìm ra các cặp thẻ bài giống nhau ẩn giấu.', 
    icon: Puzzle, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-500/20',
    tag: '🎯 Trí nhớ', buttonColor: 'from-green-500 to-green-600', floatingIcon: '🃏', bgTint: 'bg-green-50/50 dark:bg-green-900/10'
  },
  { 
    id: 'guess', 
    name: 'Rung chuông vàng', 
    description: 'Sàn đấu tri thức dành cho những bạn nhỏ tự tin nhất. Ai sẽ là người cuối cùng?', 
    icon: Lightbulb, color: 'text-pink-500', bgColor: 'bg-pink-100 dark:bg-pink-500/20',
    tag: '🔔 Kịch tính', buttonColor: 'from-pink-500 to-rose-500', floatingIcon: '🔔', bgTint: 'bg-pink-50/50 dark:bg-pink-900/10'
  },
  { 
    id: 'math', 
    name: 'Hái hoa dân chủ', 
    description: 'Chọn cho mình một bông hoa may mắn và trả lời câu hỏi để nhận những món quà bất ngờ.', 
    icon: CalcIcon, color: 'text-fuchsia-500', bgColor: 'bg-fuchsia-100 dark:bg-fuchsia-500/20',
    tag: '🌈 Vui nhộn', buttonColor: 'from-fuchsia-500 to-pink-500', floatingIcon: '🌸', bgTint: 'bg-fuchsia-50/50 dark:bg-fuchsia-900/10'
  },
  { 
    id: 'crossword', 
    name: 'Ô chữ thần kỳ', 
    description: 'Khám phá các hàng ngang bí mật để tìm ra từ khóa trung tâm của trò chơi.', 
    icon: Edit3, color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-500/20',
    tag: '🧩 Khám phá', buttonColor: 'from-indigo-500 to-purple-500', floatingIcon: '🔤', bgTint: 'bg-indigo-50/50 dark:bg-indigo-900/10'
  },
];

const getSystemInstruction = (subjectId: string | null) => {
  let base = `Bạn là một chuyên gia giáo dục và gia sư AI thông minh tại "AI Learning Hub", hỗ trợ học sinh Việt Nam (đặc biệt là cấp THCS).
Nhiệm vụ của bạn là giải đáp thắc mắc, hướng dẫn học tập một cách dễ hiểu, cá nhân hóa theo trình độ học sinh.
Luôn trình bày rõ ràng, sử dụng Markdown, chia nhỏ các bước, và dùng icon phù hợp.

QUY TẮC QUAN TRỌNG VỀ TOÁN HỌC & CÔNG THỨC:
- KHÔNG sử dụng ký hiệu LaTeX ($$, \, ^, _,...) hoặc viết công thức dạng code.
- LUÔN viết toán bằng ký hiệu thông thường dễ hiểu như sách giáo khoa Việt Nam.
- Nhân: dùng dấu "×" (không dùng *).
- Chia: dùng dấu "÷" (không dùng /).
- Bình phương: viết "²" (ví dụ: x²).
- Căn bậc hai: viết "√" (ví dụ: √x).
- Delta: viết "Δ".
- Mỗi bước giải phải xuống dòng rõ ràng.`;

  let method = '';
  if (!subjectId || subjectId === 'general') {
    method = `\n\nKhi học sinh hỏi, hãy tự động nhận diện môn học và áp dụng phương pháp phù hợp nhất. Nếu là câu hỏi giao tiếp thông thường, hãy trả lời thân thiện.`;
  } else {
    switch (subjectId) {
      case 'math':
      case 'physics':
      case 'chemistry':
        method = `\n\nMôn học hiện tại: ${subjectId === 'math' ? 'Toán học' : subjectId === 'physics' ? 'Vật lý' : 'Hóa học'}.
Phương pháp:
- Giải bài tập từng bước chi tiết, dễ hiểu cho học sinh THCS.
- Hiển thị công thức bằng ký hiệu thông thường (x², √, ×, ÷, Δ). Tuyệt đối không dùng LaTeX.
- Giải thích lý do cho từng bước biến đổi.
- Không chỉ đưa đáp án cuối cùng.`;
        break;
      case 'literature':
        method = `\n\nMôn học hiện tại: Ngữ văn.
Phương pháp:
- Gợi ý dàn ý chi tiết (Mở bài, Thân bài, Kết bài).
- Phân tích tác phẩm, nhân vật, nghệ thuật sâu sắc.
- Cung cấp dẫn chứng cụ thể từ văn bản.
- Khuyến khích tư duy sáng tạo và cảm thụ văn học.`;
        break;
      case 'english':
        method = `\n\nMôn học hiện tại: Tiếng Anh.
Phương pháp:
- Sửa lỗi ngữ pháp chi tiết và giải thích lý do.
- Hỗ trợ luyện hội thoại (đóng vai nếu cần).
- Cung cấp từ vựng liên quan, phiên âm và ví dụ.
- Dịch thuật chính xác ngữ cảnh.`;
        break;
      case 'history':
      case 'geography':
        method = `\n\nMôn học hiện tại: ${subjectId === 'history' ? 'Lịch sử' : 'Địa lý'}.
Phương pháp:
- Tóm tắt sự kiện, hiện tượng một cách ngắn gọn, dễ hiểu.
- Cung cấp timeline (mốc thời gian) rõ ràng.
- Giải thích nguyên nhân, diễn biến, kết quả/hệ quả.
- Liên hệ thực tế nếu có thể.`;
        break;
      case 'it':
        method = `\n\nMôn học hiện tại: Tin học.
Phương pháp:
- Giải thích code từng dòng dễ hiểu.
- Hỗ trợ debug cơ bản, chỉ ra lỗi sai và cách khắc phục.
- Cung cấp ví dụ code minh họa (sử dụng markdown code block).
- Hướng dẫn tư duy thuật toán.`;
        break;
      default:
        method = `\n\nBạn đang hỗ trợ môn học này. Hãy áp dụng phương pháp sư phạm tốt nhất để hướng dẫn học sinh.`;
    }
  }

  const interactiveAddon = `\n\nNÂNG CẤP TRẢI NGHIỆM HỌC TẬP (BẮT BUỘC CÓ Ở CUỐI CÂU TRẢ LỜI):
Sau khi giải quyết xong vấn đề của học sinh, bạn PHẢI thêm 3 phần sau (định dạng rõ ràng):
1. 💡 **Lời khuyên học tập**: 1 câu nhận xét hoặc lời khuyên ngắn gọn cá nhân hóa để học tốt hơn phần kiến thức này.
2. 🔄 **Khám phá thêm**: Gợi ý 1-2 câu hỏi liên quan mà học sinh có thể hỏi tiếp.
3. 🎯 **Mini Quiz**: Đưa ra 1 câu hỏi trắc nghiệm hoặc bài tập nhỏ tương tự để kiểm tra nhanh. BẮT BUỘC định dạng chính xác như sau (để hệ thống hiển thị giao diện):
:::quiz
{"question": "Nội dung câu hỏi", "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"]}
:::`;

  return base + method + interactiveAddon;
};

const TypingIndicator = () => (
  <div className="flex space-x-1.5 items-center p-4 glass-panel rounded-2xl rounded-tl-none w-16 h-12">
    <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
    <motion.div className="w-2 h-2 bg-purple-500 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
    <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
  </div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'games' | 'collection'>('dashboard');
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [gameScores, setGameScores] = useState<Record<string, number>>({});
  const [chats, setChats] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [learningStats, setLearningStats] = useState<Record<string, number>>({});
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  // Gamification State
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [cards, setCards] = useState<UserCard[]>([]);
  const [showCardReveal, setShowCardReveal] = useState<{ general: General, rank: GeneralRank } | null>(null);
  const [selectedCard, setSelectedCard] = useState<{ general: General, rank: GeneralRank } | null>(null);
  
  // Auth & Profile State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    uid: '',
    displayName: '',
    username: '',
    avatar: 'https://ui-avatars.com/api/?name=User&background=random',
    bio: '',
    favoriteSubject: 'general'
  });
  const [editForm, setEditForm] = useState<UserProfile>({
    uid: '',
    displayName: '',
    username: '',
    avatar: 'https://ui-avatars.com/api/?name=User&background=random',
    bio: '',
    favoriteSubject: 'general'
  });
  
  const [editError, setEditError] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aiRef = useRef<any>(null);

  useEffect(() => {
    aiRef.current = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      if (currentUser) {
        showToast(`Chào mừng trở lại, ${currentUser.displayName?.split(' ')[0] || 'bạn'}!`, 'success');
      }
    });
    return () => unsubscribe();
  }, []);

  // Load user data from localStorage
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`ai_learning_hub_data_${user.uid}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setChats(parsed.chats || {});
          setLearningStats(parsed.stats || {});
          setGameHistory(parsed.gameHistory || []);
          setGameScores(parsed.gameScores || {});
          setLastLoginDate(parsed.lastLoginDate || null);
          setStreak(parsed.streak || 0);
          setCards(parsed.cards || []);
          
          if (parsed.profile) {
            setUserProfile(parsed.profile);
          } else {
            const initialProfile = {
              uid: user.uid,
              displayName: user.displayName || 'Người dùng',
              username: user.email?.split('@')[0] || 'user' + Math.floor(Math.random() * 1000),
              avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`,
              bio: 'Học sinh tại AI Learning Hub',
              favoriteSubject: 'general'
            };
            setUserProfile(initialProfile);
          }
        } catch (e) {
          console.error("Failed to parse saved data", e);
        }
      } else {
        setChats({});
        setLearningStats({});
        setLastLoginDate(null);
        setStreak(0);
        setCards([]);
        const initialProfile = {
          uid: user.uid,
          displayName: user.displayName || 'Người dùng',
          username: user.email?.split('@')[0] || 'user' + Math.floor(Math.random() * 1000),
          avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`,
          bio: 'Học sinh tại AI Learning Hub',
          favoriteSubject: 'general'
        };
        setUserProfile(initialProfile);
      }
    }
  }, [user]);

  // Save user data to localStorage
  useEffect(() => {
    if (user && isAuthReady) {
      localStorage.setItem(`ai_learning_hub_data_${user.uid}`, JSON.stringify({
        chats,
        stats: learningStats,
        profile: userProfile,
        gameHistory,
        gameScores,
        lastLoginDate,
        streak,
        cards
      }));
    }
  }, [chats, learningStats, userProfile, gameHistory, gameScores, lastLoginDate, streak, cards, user, isAuthReady]);

  const handleCheckIn = () => {
    const today = new Date().toISOString().split('T')[0];
    if (lastLoginDate === today) {
        showToast('Bạn đã điểm danh hôm nay rồi!', 'error');
        return;
    }

    let newStreak = streak;
    if (lastLoginDate) {
      const lastDate = new Date(lastLoginDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    setStreak(newStreak);
    setLastLoginDate(today);

    // Determine rank
    let rank: GeneralRank = 'C';
    if (newStreak % 30 === 0) {
      rank = 'SSS';
    } else if (newStreak % 7 === 0) {
      // S or above
      const rand = Math.random();
      if (rand < 0.5) rank = 'S';
      else if (rand < 0.8) rank = 'S+';
      else rank = 'SSS';
    } else if (newStreak % 3 === 0) {
      // A or above
      const rand = Math.random();
      if (rand < 0.6) rank = 'A';
      else if (rand < 0.85) rank = 'S';
      else if (rand < 0.95) rank = 'S+';
      else rank = 'SSS';
    } else {
      // Normal pull
      const rand = Math.random();
      let cumulative = 0;
      for (const [r, rate] of Object.entries(RANK_RATES)) {
        cumulative += rate;
        if (rand <= cumulative) {
          rank = r as GeneralRank;
          break;
        }
      }
    }

    const randomGeneral = GENERALS[Math.floor(Math.random() * GENERALS.length)];
    
    const newCard: UserCard = {
      id: Date.now().toString(),
      generalId: randomGeneral.id,
      rank,
      dateAcquired: new Date().toISOString()
    };

    setCards(prev => [...prev, newCard]);
    setShowCardReveal({ general: randomGeneral, rank });
    
    if (rank === 'SSS') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ef4444', '#8b5cf6']
      });
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    } else if (rank === 'S+' || rank === 'S') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6']
      });
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');

    if (!editForm.displayName.trim()) {
      setEditError('Tên không được để trống');
      return;
    }

    if (!editForm.username.trim()) {
      setEditError('Username không được để trống');
      return;
    }

    // Mock username uniqueness check (in a real app this would be a DB check)
    // For demo, we check if it's different from current and not "admin"
    if (editForm.username.toLowerCase() === 'admin' && userProfile.username.toLowerCase() !== 'admin') {
      setEditError('Tên đã tồn tại');
      return;
    }

    if (editForm.displayName.length > 50) {
      setEditError('Tên quá dài (tối đa 50 ký tự)');
      return;
    }

    if (editForm.bio.length > 160) {
      setEditError('Mô tả quá dài (tối đa 160 ký tự)');
      return;
    }

    setUserProfile(editForm);
    
    // Sync with Firebase if possible
    if (user) {
      updateProfile(user, { 
        displayName: editForm.displayName,
        photoURL: editForm.avatar
      }).catch(console.error);
    }

    setShowEditProfile(false);
    showToast('Cập nhật thành công!', 'success');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!name || !email || !password) {
      setAuthError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setUser({ ...userCredential.user, displayName: name } as FirebaseUser);
      showToast('Đăng ký thành công!', 'success');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') setAuthError('Email đã được sử dụng');
      else if (error.code === 'auth/weak-password') setAuthError('Mật khẩu quá yếu (ít nhất 6 ký tự)');
      else if (error.code === 'auth/operation-not-allowed') setAuthError('Đăng nhập bằng Email chưa được bật trong Firebase Console. Vui lòng bật nó trong phần Authentication > Sign-in method.');
      else setAuthError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email || !password) {
      setAuthError('Vui lòng nhập email và mật khẩu');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('Đăng nhập thành công!', 'success');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/invalid-credential') setAuthError('Email hoặc mật khẩu không đúng');
      else if (error.code === 'auth/operation-not-allowed') setAuthError('Đăng nhập bằng Email chưa được bật trong Firebase Console. Vui lòng bật nó trong phần Authentication > Sign-in method.');
      else setAuthError('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Toast is handled by onAuthStateChanged
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.code === 'auth/operation-not-allowed') {
        setAuthError('Đăng nhập bằng Google chưa được bật trong Firebase Console. Vui lòng bật nó trong phần Authentication > Sign-in method.');
      } else {
        setAuthError('Đăng nhập Google thất bại.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setChats({});
      setLearningStats({});
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToBottom = (force = false) => {
    if (!isScrolledUp || force) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeMessages = currentSubject ? (chats[currentSubject] || []) : (chats['general'] || []);

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages, isTyping]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 150;
    setIsScrolledUp(isUp);

    // Fast scroll blur effect
    const container = scrollContainerRef.current;
    container.classList.add('scrolling-fast');
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      container.classList.remove('scrolling-fast');
    }, 150);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delayMs = 1500): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      if (retries > 0 && (error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED') || error?.message?.includes('quota'))) {
        await delay(delayMs);
        return retryWithBackoff(fn, retries - 1, delayMs * 2);
      }
      throw error;
    }
  }

  const handleQuizAnswer = (question: string, selectedOption: string) => {
    const text = `Đối với câu hỏi: "${question}", mình chọn đáp án: "${selectedOption}". Hãy chấm điểm và giải thích chi tiết nhé.`;
    handleSend(text);
  };

  const renderMessageContent = (content: string) => {
    const quizRegex = /:::quiz\s*({[\s\S]*?})\s*:::/;
    const match = content.match(quizRegex);
    
    if (match) {
      const textBefore = content.substring(0, match.index);
      const textAfter = content.substring(match.index! + match[0].length);
      let quizData = null;
      try {
        quizData = JSON.parse(match[1]);
      } catch (e) {
        console.error("Failed to parse quiz JSON", e);
      }
      
      return (
        <>
          <Markdown remarkPlugins={[remarkGfm]}>{textBefore}</Markdown>
          {quizData && (
            <div className="my-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-blue-500/30 shadow-sm">
              <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                <Trophy size={18} /> Mini Quiz
              </h4>
              <p className="font-medium mb-4 text-slate-800 dark:text-slate-100">{quizData.question}</p>
              <div className="space-y-2">
                {quizData.options.map((opt: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => handleQuizAnswer(quizData.question, opt)}
                    className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors text-sm font-medium"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Markdown remarkPlugins={[remarkGfm]}>{textAfter}</Markdown>
        </>
      );
    }
    
    return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    let targetSubject = currentSubject;
    let isUnknown = false;
    
    setInputValue('');
    setIsTyping(true);

    if (currentSubject === null) {
      try {
        const detectResponse = await retryWithBackoff(() => aiRef.current.models.generateContent({
          model: 'gemini-3.1-flash-preview',
          contents: `Phân tích câu hỏi sau và xác định môn học.
          Các môn hợp lệ: math, literature, english, physics, chemistry, biology, history, geography, it, technology, civic.
          Nếu là câu chào hỏi, trò chuyện thông thường, trả về "general".
          Nếu là câu hỏi học tập nhưng không rõ thuộc môn nào, trả về "unknown".
          Câu hỏi: "${text}"`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING, description: "ID của môn học, 'general' hoặc 'unknown'" }
              }
            }
          }
        }));
        
        const res = JSON.parse((detectResponse as any).text);
        const detected = res.subject;
        
        if (detected === 'unknown') {
          isUnknown = true;
          targetSubject = null;
        } else if (detected !== 'general' && SUBJECTS.find(s => s.id === detected)) {
          targetSubject = detected;
          setCurrentSubject(detected); // Auto-switch tab
        } else {
          targetSubject = null;
        }
      } catch (e: any) {
        console.error("Detection failed", e);
        if (e?.message?.includes('429') || e?.message?.includes('RESOURCE_EXHAUSTED') || e?.message?.includes('quota')) {
          setIsTyping(false);
          setChats(prev => ({
            ...prev,
            ['general']: [...(prev['general'] || []), 
              { id: Date.now().toString(), role: 'user', content: text },
              { id: (Date.now() + 1).toString(), role: 'ai', content: 'Hệ thống đang quá tải do có quá nhiều yêu cầu (vượt quá giới hạn API). Vui lòng đợi một lát rồi thử lại nhé!' }
            ]
          }));
          return;
        }
        targetSubject = null;
      }
    }

    const chatId = targetSubject || 'general';
    
    // Update stats if it's a specific subject
    if (targetSubject && !isUnknown) {
      setLearningStats(prev => ({
        ...prev,
        [targetSubject!]: (prev[targetSubject!] || 0) + 1
      }));
    }

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    
    setChats(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newUserMsg]
    }));

    const aiMsgId = (Date.now() + 1).toString();

    if (isUnknown) {
      setIsTyping(false);
      setChats(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), { 
          id: aiMsgId, 
          role: 'ai', 
          content: '🤔 Mình chưa rõ câu hỏi của bạn thuộc môn học nào. Bạn có thể nói rõ hơn được không? (Ví dụ: Giải giúp mình bài Toán này, hoặc Câu tiếng Anh này nghĩa là gì...)' 
        }]
      }));
      return;
    }
    
    try {
      const chatSession = aiRef.current.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: {
          systemInstruction: getSystemInstruction(targetSubject),
          temperature: 0.7,
        }
      });

      const history = chats[chatId] || [];
      let prompt = text;
      if (history.length > 0) {
        prompt = `Lịch sử trò chuyện:\n${history.map(m => `${m.role === 'user' ? 'Học sinh' : 'AI'}: ${m.content}`).join('\n')}\n\nHọc sinh: ${text}`;
      }

      const responseStream = await retryWithBackoff(() => chatSession.sendMessageStream({ message: prompt }));
      
      let fullText = '';
      let isFirstChunk = true;

      for await (const chunk of (responseStream as any)) {
        if (isFirstChunk) {
          setIsTyping(false);
          setChats(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), { id: aiMsgId, role: 'ai', content: '' }]
          }));
          isFirstChunk = false;
        }
        
        fullText += chunk.text;
        setChats(prev => ({
          ...prev,
          [chatId]: prev[chatId].map(m => m.id === aiMsgId ? { ...m, content: fullText } : m)
        }));
      }
    } catch (error: any) {
      console.error(error);
      setIsTyping(false);
      
      let errorMessage = 'Xin lỗi, đã có lỗi xảy ra khi kết nối với máy chủ. Bạn thử lại nhé!';
      if (error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED') || error?.message?.includes('quota')) {
        errorMessage = 'Hệ thống đang quá tải do có quá nhiều yêu cầu (vượt quá giới hạn API). Vui lòng đợi một lát rồi thử lại nhé!';
      }

      setChats(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), { 
          id: aiMsgId, 
          role: 'ai', 
          content: errorMessage 
        }]
      }));
    }
  };

  const handleSubjectClick = (id: string | null) => {
    setCurrentSubject(id);
    setCurrentView('chat');
    setSidebarOpen(false);
  };

  const generateGameQuestions = async (gameId: string, subjectId: string | null) => {
    const subjectName = SUBJECTS.find(s => s.id === subjectId)?.name || 'kiến thức tổng hợp';
    let prompt = '';
    let schema: any = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          answer: { type: Type.STRING },
          explanation: { type: Type.STRING },
        },
        required: ['id', 'question', 'answer', 'explanation']
      }
    };

    if (gameId === 'quiz' || gameId === 'race') {
      prompt = `Tạo 5 câu hỏi trắc nghiệm về ${subjectName} cho học sinh THCS. Mỗi câu có 4 đáp án.`;
      schema.items.properties.options = { type: Type.ARRAY, items: { type: Type.STRING } };
      schema.items.required.push('options');
    } else if (gameId === 'match') {
      prompt = `Tạo 5 cặp ghép đôi về ${subjectName} (ví dụ: công thức - tên, từ vựng - nghĩa).`;
      schema.items.properties.pairs = { 
        type: Type.ARRAY, 
        items: { 
          type: Type.OBJECT, 
          properties: { 
            left: { type: Type.STRING }, 
            right: { type: Type.STRING } 
          } 
        } 
      };
      schema.items.required.push('pairs');
    } else if (gameId === 'guess') {
      prompt = `Tạo 5 câu đố về ${subjectName}. AI đưa gợi ý, người chơi đoán 1 từ hoặc cụm từ ngắn.`;
    } else if (gameId === 'math') {
      prompt = `Tạo 10 phép tính toán học nhanh (cộng, trừ, nhân, chia) mức độ THCS.`;
      schema.items.properties.options = { type: Type.ARRAY, items: { type: Type.STRING } };
      schema.items.required.push('options');
    }

    try {
      const response = await aiRef.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: schema
        }
      });
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to generate questions", e);
      return [];
    }
  };

  const GameSession = ({ gameId, onExit }: { gameId: string, onExit: () => void }) => {
    const [questions, setQuestions] = useState<GameQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'loading' | 'playing' | 'finished'>('loading');
    const [timeLeft, setTimeLeft] = useState(gameId === 'race' ? 30 : 0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [combo, setCombo] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [shuffledRights, setShuffledRights] = useState<any[]>([]);

    useEffect(() => {
      if (questions[currentIndex]?.pairs) {
        setShuffledRights([...questions[currentIndex].pairs].sort(() => Math.random() - 0.5));
      }
    }, [currentIndex, questions]);

    const handleMatch = (left: string, right: string) => {
      const currentQ = questions[currentIndex];
      const pair = currentQ.pairs?.find(p => p.left === left && p.right === right);
      
      if (pair) {
        setMatchedPairs([...matchedPairs, left]);
        setScore(score + 5);
        if (matchedPairs.length + 1 === currentQ.pairs?.length) {
          setFeedback('correct');
          setCombo(combo + 1);
          setTimeout(() => {
            setFeedback(null);
            setMatchedPairs([]);
            setSelectedLeft(null);
            if (currentIndex < questions.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              handleFinish();
            }
          }, 1000);
        }
      } else {
        setFeedback('wrong');
        setCombo(0);
        setTimeout(() => setFeedback(null), 1000);
      }
    };

    useEffect(() => {
      const load = async () => {
        const q = await generateGameQuestions(gameId, currentSubject);
        if (q.length > 0) {
          setQuestions(q);
          setGameState('playing');
        } else {
          onExit();
          showToast('Không thể tải câu hỏi, vui lòng thử lại sau.', 'error');
        }
      };
      load();
    }, []);

    useEffect(() => {
      if (gameState === 'playing' && gameId === 'race' && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (gameState === 'playing' && gameId === 'race' && timeLeft === 0) {
        handleFinish();
      }
    }, [timeLeft, gameState]);

    const handleAnswer = (answer: string) => {
      if (feedback) return;

      const currentQ = questions[currentIndex];
      const isCorrect = answer.toLowerCase().trim() === currentQ.answer.toLowerCase().trim();

      if (isCorrect) {
        setFeedback('correct');
        const points = gameId === 'race' ? Math.max(5, 10 + Math.floor(timeLeft / 2)) : 10;
        setScore(score + points);
        setCombo(combo + 1);
        setTimeout(() => {
          setFeedback(null);
          setSelectedOption(null);
          setUserAnswer('');
          if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            handleFinish();
          }
        }, 1000);
      } else {
        setFeedback('wrong');
        setCombo(0);
        setShowExplanation(true);
      }
    };

    const handleFinish = () => {
      setGameState('finished');
      const newHistory: GameHistory = {
        id: Date.now().toString(),
        gameId,
        score,
        date: new Date().toISOString(),
        subject: currentSubject || 'general'
      };
      setGameHistory(prev => [newHistory, ...prev]);
      if (score > (gameScores[gameId] || 0)) {
        setGameScores(prev => ({ ...prev, [gameId]: score }));
      }
    };

    if (gameState === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">AI đang chuẩn bị câu hỏi cho bạn...</p>
        </div>
      );
    }

    if (gameState === 'finished') {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto mt-12 glass-panel p-8 rounded-3xl text-center border border-white/40 dark:border-slate-700/50 shadow-2xl"
        >
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Hoàn thành!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Bạn đã xuất sắc vượt qua thử thách này.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">Điểm số</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score} XP</span>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20">
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest block mb-1">Combo cao nhất</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{combo}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setGameState('loading');
                setCurrentIndex(0);
                setScore(0);
                setTimeLeft(gameId === 'race' ? 30 : 0);
                setCombo(0);
                const reload = async () => {
                  const q = await generateGameQuestions(gameId, currentSubject);
                  setQuestions(q);
                  setGameState('playing');
                };
                reload();
              }}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Chơi lại
            </button>
            <button
              onClick={onExit}
              className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Thoát
            </button>
          </div>
        </motion.div>
      );
    }

    const currentQ = questions[currentIndex];

    return (
      <div className="max-w-3xl mx-auto mt-4 md:mt-8 p-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onExit} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-4">
            {gameId === 'race' && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${timeLeft < 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                <Timer size={18} />
                {timeLeft}s
              </div>
            )}
            <div className="px-4 py-2 rounded-full bg-blue-600 text-white font-bold shadow-md">
              {score} XP
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>Câu hỏi {currentIndex + 1}/{questions.length}</span>
            {combo > 1 && <span className="text-orange-500 flex items-center gap-1"><Flame size={14} /> Combo x{combo}</span>}
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`glass-panel p-8 rounded-3xl border-2 transition-all duration-300 ${
              feedback === 'correct' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 
              feedback === 'wrong' ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-shake' : 
              'border-white/40 dark:border-slate-700/50'
            }`}
          >
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-8 leading-relaxed">
              {currentQ.question}
            </h3>

            {currentQ.options ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => {
                      setSelectedOption(opt);
                      handleAnswer(opt);
                    }}
                    className={`p-4 rounded-2xl text-left font-medium transition-all border-2 flex items-center justify-between group ${
                      selectedOption === opt ? (
                        feedback === 'correct' ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                        feedback === 'wrong' ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                        'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                      ) : (
                        feedback === 'wrong' && opt === currentQ.answer ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50 text-slate-700 dark:text-slate-300'
                      )
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedOption === opt && feedback === 'correct' && <CheckCircle2 size={20} />}
                    {selectedOption === opt && feedback === 'wrong' && <XCircle size={20} />}
                  </button>
                ))}
              </div>
            ) : currentQ.pairs ? (
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  {currentQ.pairs.map((p, i) => (
                    <button
                      key={`left-${i}`}
                      disabled={matchedPairs.includes(p.left)}
                      onClick={() => setSelectedLeft(p.left)}
                      className={`w-full p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        matchedPairs.includes(p.left) ? 'bg-green-50 border-green-200 text-green-400 dark:bg-green-500/5 dark:border-green-500/20' :
                        selectedLeft === p.left ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600' :
                        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                      }`}
                    >
                      {p.left}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {shuffledRights.map((p, i) => (
                    <button
                      key={`right-${i}`}
                      disabled={!selectedLeft || matchedPairs.some(mp => currentQ.pairs?.find(pair => pair.left === mp)?.right === p.right)}
                      onClick={() => handleMatch(selectedLeft!, p.right)}
                      className={`w-full p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        matchedPairs.some(mp => currentQ.pairs?.find(pair => pair.left === mp)?.right === p.right) ? 'bg-green-50 border-green-200 text-green-400 dark:bg-green-500/5 dark:border-green-500/20' :
                        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                      }`}
                    >
                      {p.right}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnswer(userAnswer)}
                  placeholder="Nhập câu trả lời của bạn..."
                  disabled={!!feedback}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 transition-all text-lg"
                />
                <button
                  onClick={() => handleAnswer(userAnswer)}
                  disabled={!!feedback || !userAnswer.trim()}
                  className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  Gửi câu trả lời
                </button>
              </div>
            )}

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-2 text-blue-500 font-bold text-sm mb-2 uppercase tracking-wider">
                    <Lightbulb size={16} />
                    Giải thích từ AI
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <button
                    onClick={() => {
                      setShowExplanation(false);
                      setFeedback(null);
                      setSelectedOption(null);
                      setUserAnswer('');
                      if (currentIndex < questions.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      } else {
                        handleFinish();
                      }
                    }}
                    className="mt-4 px-6 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all"
                  >
                    Tiếp tục
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  const GamesView = () => {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto relative">
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-sm rotate-12 opacity-50"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-300 rounded-full opacity-50"></div>
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-50"></div>
        <div className="absolute top-32 right-1/3 w-4 h-4 bg-green-300 rounded-sm -rotate-12 opacity-50"></div>

        <div className="mb-12 text-center relative z-10">
          <div className="flex justify-center gap-2 mb-4 text-2xl">
            <span>📚</span>
            <span>🎯</span>
            <span>🧠</span>
            <span>⭐</span>
            <span>🏆</span>
            <span>🎨</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-teal-500">HỌC </span>
            <span className="text-blue-500">VUI </span>
            <span className="text-pink-500">MỖI </span>
            <span className="text-orange-500">NGÀY</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Khám phá thế giới kiến thức qua những trò chơi vui nhộn và đầy thử thách 🌟
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {GAMES.map((game) => {
            return (
              <motion.div
                key={game.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative p-6 rounded-3xl border border-white/60 dark:border-slate-700/50 flex flex-col h-full group shadow-xl ${game.bgTint} backdrop-blur-sm`}
              >
                {/* Floating Icon */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center text-2xl border border-white/50 dark:border-slate-700/50 transform rotate-12 group-hover:rotate-0 transition-transform">
                  {game.floatingIcon}
                </div>

                {/* Tag */}
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm border border-white/50 dark:border-slate-700/50 w-max mb-4">
                  {game.tag}
                </div>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{game.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-1 leading-relaxed">{game.description}</p>
                
                <button
                  onClick={() => setCurrentGame(game.id)}
                  className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${game.buttonColor} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2`}
                >
                  <Play size={20} className="fill-current" />
                  Chơi ngay
                </button>
              </motion.div>
            );
          })}
        </div>

        {gameHistory.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3 justify-center">
              <History size={24} className="text-slate-400" />
              Lịch sử chơi
            </h3>
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/40 dark:border-slate-700/50 shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trò chơi</th>
                    <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Môn học</th>
                    <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Điểm</th>
                    <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {gameHistory.slice(0, 10).map((h) => (
                    <tr key={h.id} className="hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{GAMES.find(g => g.id === h.gameId)?.name}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{SUBJECTS.find(s => s.id === h.subject)?.name || 'Tổng hợp'}</td>
                      <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">+{h.score} XP</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{new Date(h.date).toLocaleDateString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-800 dark:text-slate-100 font-sans relative overflow-hidden">
        {/* Background Video */}
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover opacity-50 dark:opacity-30 blur-[1px]"
          >
            <source src="https://cdn.pixabay.com/video/2022/09/04/130141-746356499_large.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-950/80 backdrop-blur-[1px]" />
        </div>
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg font-medium ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          key={authMode}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-8 md:p-10 rounded-3xl max-w-md w-full mx-4 flex flex-col shadow-2xl border border-white/40 dark:border-slate-700/50 z-10"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {authMode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              {authMode === 'login' ? 'Chào mừng trở lại AI Learning Hub' : 'Bắt đầu hành trình học tập thông minh'}
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-xl text-sm text-center">
              {authError}
            </div>
          )}

          <form onSubmit={authMode === 'login' ? handleEmailLogin : handleEmailRegister} className="flex flex-col gap-4 mb-6">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Họ và tên</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Nhập tên của bạn"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mật khẩu</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-xl text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-md"
            >
              {authMode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
            <div className="relative bg-slate-50 dark:bg-slate-900 px-4 text-sm text-slate-500">Hoặc</div>
          </div>

          <button 
            onClick={handleLogin} 
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3.5 rounded-xl text-base font-medium transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Tiếp tục với Google
          </button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
            {authMode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <button 
              onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); }}
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {authMode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex text-slate-800 dark:text-slate-100 font-sans overflow-hidden relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-50 dark:opacity-30 blur-[1px]"
        >
          <source src="https://cdn.pixabay.com/video/2022/09/04/130141-746356499_large.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-950/80 backdrop-blur-[1px]" />
      </div>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full shadow-lg font-medium ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && user && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowProfile(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-panel p-8 rounded-3xl max-w-sm w-full shadow-2xl border border-white/40 dark:border-slate-700/50 flex flex-col items-center text-center"
            >
              <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
              
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div className="relative w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                  <img 
                    src={userProfile.avatar || `https://ui-avatars.com/api/?name=${userProfile.displayName || 'User'}&background=random`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div 
                    className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() => {
                      setEditForm(userProfile);
                      setEditError('');
                      setShowEditProfile(true);
                      setShowProfile(false);
                    }}
                  >
                    <Edit3 size={24} className="text-white mb-1" />
                    <span className="text-[10px] text-white font-bold uppercase">Chỉnh sửa</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-800 z-10">
                  <Sparkles size={16} />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{userProfile.displayName}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">@{userProfile.username}</p>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 italic">
                "{userProfile.bio || 'Chưa có mô tả bản thân'}"
              </p>

              <div className="w-full flex flex-wrap justify-center gap-2 mb-6">
                <div className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  Môn yêu thích: {SUBJECTS.find(s => s.id === userProfile.favoriteSubject)?.name || 'Tổng hợp'}
                </div>
              </div>
              
              <div className="w-full grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <div className="text-2xl font-bold text-blue-500">{Object.keys(chats).filter(k => k !== 'general' && chats[k].length > 0).length}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Môn đã học</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <div className="text-2xl font-bold text-purple-500">{Object.values(chats).reduce((acc, curr) => acc + curr.length, 0)}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tin nhắn</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50 col-span-2">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-2">
                    <Trophy size={20} />
                    {Object.values(gameScores).reduce((acc, curr) => acc + curr, 0)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tổng điểm Game (XP)</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50 col-span-2">
                  <div className="text-2xl font-bold text-red-500 flex items-center justify-center gap-2">
                    <Flame size={20} />
                    {streak} ngày
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chuỗi điểm danh</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setEditForm(userProfile);
                  setEditError('');
                  setShowEditProfile(true);
                  setShowProfile(false);
                }}
                className="w-full py-3 mb-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Edit3 size={18} />
                Chỉnh sửa thông tin
              </button>
              
              <button 
                onClick={() => {
                  setShowProfile(false);
                  handleLogout();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setShowEditProfile(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-panel p-6 md:p-8 rounded-3xl max-w-md w-full shadow-2xl border border-white/40 dark:border-slate-700/50 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Chỉnh sửa hồ sơ</h2>
                <button onClick={() => setShowEditProfile(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {editError && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-xl text-xs text-center font-medium">
                  {editError}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <img 
                      src={editForm.avatar || `https://ui-avatars.com/api/?name=${editForm.displayName || 'User'}&background=random`} 
                      alt="Preview" 
                      className="relative w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-xl object-cover transition-transform group-hover:scale-105"
                    />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="flex flex-col items-center text-white">
                        <Edit3 size={20} />
                        <span className="text-[10px] font-bold mt-1 uppercase">Thay đổi</span>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-wider">Ảnh đại diện</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 ml-1">Tên hiển thị</label>
                    <input 
                      type="text" 
                      value={editForm.displayName}
                      onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                      maxLength={50}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                      placeholder="Tên của bạn"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 ml-1">Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">@</span>
                      <input 
                        type="text" 
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value.replace(/\s+/g, '').toLowerCase() })}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 ml-1">Mô tả bản thân</label>
                  <textarea 
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none"
                    placeholder="Giới thiệu ngắn về bản thân..."
                  />
                  <div className="text-[10px] text-right text-slate-400 mt-1">{editForm.bio.length}/160</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 ml-1">Môn học yêu thích</label>
                  <select 
                    value={editForm.favoriteSubject}
                    onChange={(e) => setEditForm({ ...editForm, favoriteSubject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm appearance-none"
                  >
                    <option value="general">Tổng hợp</option>
                    {SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowEditProfile(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 glass border-r border-white/40 dark:border-slate-700/50 flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleSubjectClick(null)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Learning Hub
            </h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-2 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-1 mb-6">
            <button
              onClick={() => { setCurrentSubject(null); setCurrentView('dashboard'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${currentView === 'dashboard' ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
            >
              <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500`}>
                <LayoutDashboard size={18} />
              </div>
              <span className={`font-medium ${currentView === 'dashboard' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>Dashboard</span>
            </button>

            <button
              onClick={() => { setCurrentSubject(null); setCurrentView('games'); setCurrentGame(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${currentView === 'games' ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
            >
              <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500`}>
                <Gamepad2 size={18} />
              </div>
              <span className={`font-medium ${currentView === 'games' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>Trò chơi</span>
            </button>

            <button
              onClick={() => { setCurrentSubject(null); setCurrentView('collection'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${currentView === 'collection' ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
            >
              <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-orange-500`}>
                <Flame size={18} />
              </div>
              <span className={`font-medium ${currentView === 'collection' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>Bộ sưu tập</span>
            </button>
          </div>

          <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">Môn học</h2>
          <div className="space-y-1">
            <button
              onClick={() => { setCurrentSubject(null); setCurrentView('chat'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${currentSubject === null && currentView === 'chat' ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
            >
              <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500`}>
                <Lightbulb size={18} />
              </div>
              <span className={`font-medium ${currentSubject === null && currentView === 'chat' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>Tổng hợp</span>
            </button>
            
            {SUBJECTS.map(s => {
              const Icon = s.icon;
              const isActive = currentSubject === s.id && currentView === 'chat';
              return (
                <button
                  key={s.id}
                  onClick={() => { setCurrentSubject(s.id); setCurrentView('chat'); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
                >
                  <div className={`p-1.5 rounded-lg ${s.bg} ${s.color}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`font-medium ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{s.name}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto text-slate-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen relative w-full">
        {/* Top Bar */}
        <header className="h-16 glass-panel border-b border-white/40 dark:border-slate-700/50 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors">
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              {currentView === 'chat' ? (
                <>
                  <button onClick={() => { setCurrentSubject(null); setCurrentView('dashboard'); }} className="hidden md:flex p-1.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-500">
                    <ArrowLeft size={18} />
                  </button>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/50 shadow-sm">
                    {React.createElement(SUBJECTS.find(s => s.id === currentSubject)?.icon || BookOpen, { size: 16, className: SUBJECTS.find(s => s.id === currentSubject)?.color })}
                    <span className="text-sm font-medium">{SUBJECTS.find(s => s.id === currentSubject)?.name || 'Tổng hợp'}</span>
                  </div>
                </>
              ) : currentView === 'games' ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/50 shadow-sm">
                  <Gamepad2 size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">{currentGame ? GAMES.find(g => g.id === currentGame)?.name : 'Trò chơi học tập'}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/50 shadow-sm">
                  <Sparkles size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-white/60 dark:hover:border-slate-700/50"
            >
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex items-center gap-3"
            >
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
                Xin chào, {userProfile.displayName?.split(' ')[0] || 'bạn'}!
              </span>
              <button 
                onClick={() => setShowProfile(true)}
                className="relative p-0.5 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 shadow-md hover:scale-105 transition-transform focus:outline-none"
              >
                <img 
                  src={userProfile.avatar || `https://ui-avatars.com/api/?name=${userProfile.displayName || 'User'}&background=random`} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            </motion.div>
          </div>
        </header>
        
        {/* Main Area */}
        <main 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 md:p-6 scroll-container"
        >
          <div className="max-w-5xl mx-auto w-full">
            
            {/* Dashboard View */}
            {currentView === 'dashboard' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[60vh]"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Chào mừng đến với AI Learning Hub
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                    Nền tảng học tập thông minh đa môn học. Chọn một môn học bên dưới hoặc đặt câu hỏi trực tiếp để AI tự động nhận diện và hỗ trợ bạn.
                  </p>
                </div>

                <div className="w-full max-w-3xl mb-8">
                  <div className="glass-panel p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md">
                        <Flame size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Điểm danh hằng ngày</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          Chuỗi hiện tại: <strong className="text-orange-500 text-lg">{streak}</strong> ngày
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckIn}
                      disabled={lastLoginDate === new Date().toISOString().split('T')[0]}
                      className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
                        lastLoginDate === new Date().toISOString().split('T')[0]
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105 active:scale-95 shadow-orange-500/30'
                      }`}
                    >
                      {lastLoginDate === new Date().toISOString().split('T')[0] ? 'Đã điểm danh' : 'Điểm danh nhận thẻ'}
                    </button>
                  </div>
                </div>
                
                {Object.keys(learningStats).length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-200 dark:border-amber-500/30 flex flex-col sm:flex-row items-center gap-6 shadow-lg w-full max-w-3xl"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
                      <Trophy size={32} className="text-white" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-1">Thành tích học tập</h3>
                      <p className="text-amber-800/80 dark:text-amber-200/80">
                        Bạn đang học tốt nhất môn <strong className="font-bold text-amber-900 dark:text-amber-300">{SUBJECTS.find(s => s.id === Object.keys(learningStats).reduce((a, b) => learningStats[a] > learningStats[b] ? a : b))?.name}</strong> với {Math.max(...Object.values(learningStats))} câu hỏi đã giải quyết! Hãy tiếp tục phát huy nhé! 🚀
                      </p>
                    </div>
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                  {SUBJECTS.map((s, idx) => {
                    const Icon = s.icon;
                    return (
                      <motion.button
                        key={s.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSubjectClick(s.id)}
                        className={`glass-panel p-5 rounded-2xl text-left transition-all group border ${s.border} hover:shadow-xl`}
                      >
                        <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-1 text-slate-800 dark:text-slate-100">{s.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{s.desc}</p>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-12 w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <Gamepad2 className="text-blue-500" size={24} />
                      Trò chơi nổi bật
                    </h3>
                    <button 
                      onClick={() => setCurrentView('games')}
                      className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Xem tất cả
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GAMES.slice(0, 2).map((game) => (
                      <button
                        key={game.id}
                        onClick={() => { setCurrentView('games'); setCurrentGame(game.id); }}
                        className="glass-panel p-6 rounded-3xl border border-white/40 dark:border-slate-700/50 flex items-center gap-6 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all text-left group"
                      >
                        <div className={`w-16 h-16 rounded-2xl ${game.bgColor} ${game.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          {React.createElement(game.icon, { size: 32 })}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-white text-lg">{game.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{game.description}</p>
                        </div>
                        <ChevronRight className="ml-auto text-slate-300" />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Spacer to prevent input overlap */}
                <div className="h-48 md:h-56 flex-shrink-0 w-full" />
              </motion.div>
            )}

            {/* Games View */}
            {currentView === 'games' && (
              currentGame ? (
                <GameSession gameId={currentGame} onExit={() => setCurrentGame(null)} />
              ) : (
                <GamesView />
              )
            )}

            {/* Collection View */}
            {currentView === 'collection' && (
              <div className="p-4 md:p-8 max-w-6xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3">
                      <Flame className="text-orange-500" size={32} />
                      Bộ sưu tập danh tướng
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">Thu thập thẻ tướng mỗi ngày. Sưu tập đủ bộ để nhận thưởng!</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-white/40 dark:border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cards.length}</div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tổng thẻ</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">{new Set(cards.map(c => c.generalId)).size}/{GENERALS.length}</div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tướng</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {GENERALS.map(general => {
                    const ownedCards = cards.filter(c => c.generalId === general.id);
                    const isOwned = ownedCards.length > 0;
                    // Find highest rank owned
                    const rankOrder: GeneralRank[] = ['C', 'B', 'A', 'S', 'S+', 'SSS'];
                    let highestRank: GeneralRank = 'C';
                    if (isOwned) {
                      highestRank = ownedCards.reduce((highest, current) => {
                        return rankOrder.indexOf(current.rank) > rankOrder.indexOf(highest) ? current.rank : highest;
                      }, 'C' as GeneralRank);
                    }

                    return (
                      <motion.div
                        key={general.id}
                        whileHover={isOwned ? { y: -5, scale: 1.02 } : {}}
                        onClick={() => isOwned && setSelectedCard({ general, rank: highestRank })}
                        className={`relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer transition-all ${
                          isOwned ? 'shadow-xl' : 'opacity-50 grayscale hover:grayscale-0 hover:opacity-80'
                        }`}
                      >
                        <img src={general.image} alt={general.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-bold text-lg leading-tight mb-1">{general.name}</h3>
                          <p className="text-slate-300 text-xs">{general.era}</p>
                        </div>

                        {isOwned && (
                          <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br ${RANK_COLORS[highestRank]} flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white/20`}>
                            {highestRank}
                          </div>
                        )}
                        
                        {!isOwned && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 font-medium text-sm flex items-center gap-2">
                              <Lock size={16} /> Chưa sở hữu
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Chat View */}
            {currentView === 'chat' && (
              <div className="space-y-6">
                {activeMessages.length === 0 && currentSubject && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className={`w-20 h-20 rounded-3xl ${SUBJECTS.find(s => s.id === currentSubject)?.bg} ${SUBJECTS.find(s => s.id === currentSubject)?.color} flex items-center justify-center mb-6 shadow-lg`}>
                      {React.createElement(SUBJECTS.find(s => s.id === currentSubject)?.icon || Bot, { size: 40 })}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Gia sư {SUBJECTS.find(s => s.id === currentSubject)?.name}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md">
                      {SUBJECTS.find(s => s.id === currentSubject)?.desc}. Hãy đặt câu hỏi để bắt đầu!
                    </p>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <AnimatePresence initial={false}>
                    {activeMessages.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
                      >
                        {msg.role === 'ai' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                            <Bot size={16} className="text-white" />
                          </div>
                        )}
                        
                        <div className={`message-bubble max-w-[85%] md:max-w-[80%] p-4 rounded-2xl shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none' 
                            : 'glass-panel rounded-tl-none'
                        }`}>
                          <div className="prose dark:prose-invert max-w-none text-sm md:text-base">
                            {msg.role === 'user' ? (
                              <p className="whitespace-pre-wrap m-0">{msg.content}</p>
                            ) : (
                              renderMessageContent(msg.content)
                            )}
                          </div>
                        </div>

                        {msg.role === 'user' && (
                          <div 
                            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 shadow-inner mt-1 overflow-hidden border border-white/20"
                            onClick={() => setShowProfile(true)}
                          >
                            <img 
                              src={userProfile.avatar || `https://ui-avatars.com/api/?name=${userProfile.displayName || 'User'}&background=random`} 
                              alt="User" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                        <Bot size={16} className="text-white" />
                      </div>
                      <TypingIndicator />
                    </motion.div>
                  )}
                  
                  {/* Spacer to prevent input overlap */}
                  <div className="h-48 md:h-56 flex-shrink-0 w-full" />
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Input Area */}
        {currentView === 'chat' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-transparent pointer-events-none">
          <div className="max-w-3xl mx-auto w-full pointer-events-auto relative">
            
            {/* Scroll to Bottom Button */}
            <AnimatePresence>
              {isScrolledUp && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  onClick={() => scrollToBottom(true)}
                  className="absolute -top-16 right-0 p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 dark:border-slate-700 z-50 text-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <ArrowDown size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Suggestions */}
            {activeMessages.length > 0 && !isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide"
              >
                <button onClick={() => handleSend("Giải thích thêm phần này")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                  Giải thích thêm
                </button>
                <button onClick={() => handleSend("Cho một ví dụ khác")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                  Cho ví dụ khác
                </button>
                <button onClick={() => handleSend("Cho bài tập tương tự")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                  Bài tập tương tự
                </button>
              </motion.div>
            )}

            {/* Input Box */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative flex items-end gap-2 glass-input rounded-3xl p-2 pr-3 shadow-lg">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={currentSubject ? `Nhập câu hỏi môn ${SUBJECTS.find(s => s.id === currentSubject)?.name}...` : "Nhập câu hỏi bất kỳ, AI sẽ tự nhận diện môn học..."}
                  className="w-full max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-3 px-4 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  rows={1}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`relative overflow-hidden p-3 rounded-2xl flex-shrink-0 transition-all duration-300 ${
                    inputValue.trim() && !isTyping
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={20} className={inputValue.trim() && !isTyping ? 'translate-x-0.5 -translate-y-0.5' : ''} />
                </motion.button>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium tracking-wide uppercase">
              AI Learning Hub - Trợ lý học tập đa năng
            </p>
          </div>
        </div>
        )}
      </div>

      {/* Card Reveal Modal */}
      <AnimatePresence>
        {showCardReveal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setShowCardReveal(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }} 
              animate={{ opacity: 1, scale: 1, rotateY: 0 }} 
              exit={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
              className={`relative aspect-[2/3] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl ${
                showCardReveal.rank === 'SSS' ? 'animate-shake' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${RANK_COLORS[showCardReveal.rank]} opacity-20`}></div>
              <img src={showCardReveal.general.image} alt={showCardReveal.general.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                >
                  <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-br ${RANK_COLORS[showCardReveal.rank]} font-bold text-lg mb-3 shadow-lg border-2 border-white/20`}>
                    Hạng {showCardReveal.rank}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-1">{showCardReveal.general.name}</h2>
                  <p className="text-slate-300 text-sm mb-4">{showCardReveal.general.era}</p>
                  
                  <button 
                    onClick={() => setShowCardReveal(null)}
                    className="px-8 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold transition-colors border border-white/30"
                  >
                    Thu thập
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCard(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-700"
            >
              <button onClick={() => setSelectedCard(null)} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10">
                <X size={20} />
              </button>
              
              <div className="md:w-2/5 relative aspect-[3/4] md:aspect-auto">
                <img src={selectedCard.general.image} alt={selectedCard.general.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
                <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full bg-gradient-to-br ${RANK_COLORS[selectedCard.rank]} font-bold shadow-lg border border-white/20`}>
                  Hạng {selectedCard.rank}
                </div>
              </div>
              
              <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedCard.general.name}</h2>
                  <div className="flex items-center gap-3 text-slate-400 font-medium">
                    <span>{selectedCard.general.country}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    <span>{selectedCard.general.era}</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Xuất thân</h3>
                    <p className="text-slate-300 leading-relaxed">{selectedCard.general.origin}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Công lao</h3>
                    <p className="text-slate-300 leading-relaxed">{selectedCard.general.achievements}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
