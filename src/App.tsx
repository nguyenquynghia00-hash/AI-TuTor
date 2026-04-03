import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Bot, User, Menu, X, Moon, Sun, 
  BookOpen, Calculator, Languages, Zap, FlaskConical, Dna,
  Landmark, Globe, Monitor, Cpu, Settings, LayoutDashboard, Users,
  Sparkles, History, ChevronRight, ArrowLeft, Lightbulb, ArrowDown, LogOut, Edit3, Lock, Flame, Trophy, FileText, Camera, Image as ImageIcon, Target
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { auth } from './firebase';
import ExamGenerator from './components/ExamGenerator';
import StudyRoadmap from './components/StudyRoadmap';
import { 
  signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile
} from 'firebase/auth';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  image?: string;
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
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'exam' | 'roadmap'>('dashboard');
  const [chats, setChats] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [learningStats, setLearningStats] = useState<Record<string, number>>({});
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
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
  const chatFileInputRef = useRef<HTMLInputElement>(null);

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
        profile: userProfile
      }));
    }
  }, [chats, learningStats, userProfile, user, isAuthReady]);



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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
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

  const handleSend = async (text: string = inputValue, image: string | null = selectedImage) => {
    if (!text.trim() && !image) return;
    
    let targetSubject = currentSubject;
    let isUnknown = false;
    
    setInputValue('');
    setSelectedImage(null);
    setIsTyping(true);

    if (currentSubject === null && !image) {
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
              { id: Date.now().toString(), role: 'user', content: text, image: image || undefined },
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

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text, image: image || undefined };
    
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
      const history = chats[chatId] || [];
      const formattedContents = history.map(m => {
        const parts: any[] = [];
        if (m.image) {
           const base64Data = m.image.split(',')[1];
           const mimeType = m.image.split(';')[0].split(':')[1];
           parts.push({ inlineData: { data: base64Data, mimeType: mimeType } });
        }
        parts.push({ text: m.content || " " });
        return {
          role: m.role === 'user' ? 'user' : 'model',
          parts: parts
        };
      });

      const currentParts: any[] = [];
      if (image) {
         const base64Data = image.split(',')[1];
         const mimeType = image.split(';')[0].split(':')[1];
         currentParts.push({ inlineData: { data: base64Data, mimeType: mimeType } });
         
         let imagePrompt = text || "Hãy giải quyết bài tập/vấn đề trong bức ảnh này.";
         imagePrompt += `\n\nBẮT BUỘC TRÌNH BÀY THEO CẤU TRÚC SAU:
📌 1. Nội dung nhận diện: (Trích xuất lại text từ ảnh)
📌 2. Giải / trả lời: (Chi tiết, rõ ràng)
📌 3. Giải thích: (Vì sao đúng)
📌 4. Gợi ý: (Cách học/Mẹo nhớ)`;
         currentParts.push({ text: imagePrompt });
      } else {
         currentParts.push({ text: text });
      }

      formattedContents.push({
        role: 'user',
        parts: currentParts
      });

      const responseStream = await retryWithBackoff(() => aiRef.current.models.generateContentStream({
        model: 'gemini-3.1-pro-preview',
        contents: formattedContents,
        config: {
          systemInstruction: getSystemInstruction(targetSubject),
          temperature: 0.7,
        }
      }));
      
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
              onClick={() => { setCurrentSubject(null); setCurrentView('exam'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${currentView === 'exam' ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
            >
              <div className={`p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500`}>
                <FileText size={18} />
              </div>
              <span className={`font-medium ${currentView === 'exam' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>Tạo Đề Thi</span>
            </button>
            <button
              onClick={() => { setCurrentSubject(null); setCurrentView('roadmap'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${currentView === 'roadmap' ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
            >
              <div className={`p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500`}>
                <Target size={18} />
              </div>
              <span className={`font-medium ${currentView === 'roadmap' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>Lộ Trình Học Tập</span>
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
              ) : currentView === 'exam' ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/50 shadow-sm">
                  <FileText size={16} className="text-indigo-500" />
                  <span className="text-sm font-medium">Tạo Đề Thi</span>
                </div>
              ) : currentView === 'roadmap' ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-slate-700/50 shadow-sm">
                  <Target size={16} className="text-emerald-500" />
                  <span className="text-sm font-medium">Lộ Trình Học Tập</span>
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
          <div className={`mx-auto w-full h-full ${currentView === 'exam' ? 'max-w-full' : 'max-w-5xl'}`}>
            
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
                
                {/* Spacer to prevent input overlap */}
                <div className="h-48 md:h-56 flex-shrink-0 w-full" />
              </motion.div>
            )}

            {/* Exam Generator View */}
            {currentView === 'exam' && aiRef.current && (
              <ExamGenerator ai={aiRef.current} />
            )}

            {/* Study Roadmap View */}
            {currentView === 'roadmap' && aiRef.current && (
              <StudyRoadmap ai={aiRef.current} userProfile={userProfile} />
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
                          {msg.image && (
                            <div className="mb-3 rounded-xl overflow-hidden border border-white/20 shadow-sm">
                              <img src={msg.image} alt="Uploaded" className="max-w-full h-auto max-h-64 object-contain" />
                            </div>
                          )}
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
                {activeMessages[activeMessages.length - 2]?.image ? (
                  <>
                    <button onClick={() => handleSend("Giải bài này chi tiết hơn")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                      Giải chi tiết
                    </button>
                    <button onClick={() => handleSend("Tạo quiz từ nội dung ảnh này")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                      Tạo quiz
                    </button>
                    <button onClick={() => handleSend("Tạo đề thi tương tự")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                      Tạo đề thi
                    </button>
                    <button onClick={() => handleSend("Chấm điểm bài làm trong ảnh")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                      Chấm bài
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleSend("Giải thích thêm phần này")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                      Giải thích thêm
                    </button>
                    <button onClick={() => handleSend("Cho một ví dụ khác")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                      Cho ví dụ khác
                    </button>
                    <button onClick={() => handleSend("Cho bài tập tương tự")} className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium glass-panel text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                      Bài tập tương tự
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {/* Image Preview */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  className="mb-3 relative inline-block"
                >
                  <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500 shadow-lg max-w-[200px]">
                    <img src={selectedImage} alt="Preview" className="w-full h-auto object-cover" />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Box */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative flex items-end gap-2 glass-input rounded-3xl p-2 pl-3 pr-3 shadow-lg">
                <button 
                  onClick={() => chatFileInputRef.current?.click()}
                  className="p-3 text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0"
                  title="Tải ảnh lên"
                >
                  <Camera size={22} />
                  <input 
                    type="file" 
                    ref={chatFileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    accept="image/*"
                  />
                </button>
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
                  className="w-full max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  rows={1}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={(!inputValue.trim() && !selectedImage) || isTyping}
                  className={`relative overflow-hidden p-3 rounded-2xl flex-shrink-0 transition-all duration-300 ${
                    (inputValue.trim() || selectedImage) && !isTyping
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={20} className={(inputValue.trim() || selectedImage) && !isTyping ? 'translate-x-0.5 -translate-y-0.5' : ''} />
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

    </div>
  );
}
