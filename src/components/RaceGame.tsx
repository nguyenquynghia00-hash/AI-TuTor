import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Sparkles, CheckCircle2, XCircle, Lightbulb, Flag } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import confetti from 'canvas-confetti';

interface RaceGameProps {
  onExit: () => void;
  settings: any;
}

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const TRACK_LENGTH = 10;

export const RaceGame = ({ onExit, settings }: RaceGameProps) => {
  const [team1Pos, setTeam1Pos] = useState(0);
  const [team2Pos, setTeam2Pos] = useState(0);
  const [currentTurn, setCurrentTurn] = useState<1 | 2>(1);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('raceGameState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setTeam1Pos(parsed.team1Pos || 0);
      setTeam2Pos(parsed.team2Pos || 0);
      setCurrentTurn(parsed.currentTurn || 1);
      setQuestion(parsed.question || null);
    } else {
      generateQuestion();
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (winner) {
      localStorage.removeItem('raceGameState');
    } else {
      localStorage.setItem('raceGameState', JSON.stringify({
        team1Pos,
        team2Pos,
        currentTurn,
        question
      }));
    }
  }, [team1Pos, team2Pos, currentTurn, question, winner]);

  const generateQuestion = async () => {
    setLoading(true);
    setFeedback(null);
    setSelectedOption(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const subject = settings?.subject || 'Kiến thức chung';
      const topic = settings?.topic || 'Tổng hợp';
      const difficulty = settings?.difficulty || 'Trung bình';

      const prompt = `Bạn là giáo viên thông minh và chuyên gia tạo câu hỏi.
Nhiệm vụ: Tạo 1 câu hỏi trắc nghiệm dựa trên thông tin sau:
- Lớp: THCS
- Môn học: ${subject}
- Chủ đề: ${topic}
- Độ khó: ${difficulty}

YÊU CẦU:
1. Phù hợp với lớp học, đúng nội dung yêu cầu, rõ ràng, dễ hiểu.
2. Có 4 đáp án A, B, C, D. Chỉ có 1 đáp án đúng.
3. Không mơ hồ, không sai kiến thức.
4. Không dùng ký hiệu LaTeX. Viết rõ ràng như sách giáo khoa.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              A: { type: Type.STRING },
              B: { type: Type.STRING },
              C: { type: Type.STRING },
              D: { type: Type.STRING },
              correct: { type: Type.STRING }
            },
            required: ['question', 'A', 'B', 'C', 'D', 'correct']
          },
          maxOutputTokens: 8192,
          temperature: 0.7
        }
      });

      const parsed = JSON.parse(response.text);
      setQuestion({
        question: parsed.question,
        options: [parsed.A, parsed.B, parsed.C, parsed.D],
        answer: parsed[parsed.correct as 'A'|'B'|'C'|'D'] || parsed.A,
        explanation: `Đáp án đúng là ${parsed.correct}`
      });
    } catch (error) {
      console.error("Error generating question:", error);
      // Fallback question
      setQuestion({
        question: "Đâu là thủ đô của Việt Nam?",
        options: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng"],
        answer: "Hà Nội",
        explanation: "Hà Nội là thủ đô của nước Cộng hòa Xã hội chủ nghĩa Việt Nam."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (opt: string) => {
    if (feedback || !question) return;
    
    setSelectedOption(opt);
    const isCorrect = opt === question.answer;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      let isWin = false;
      if (isCorrect) {
        if (currentTurn === 1) {
          const newPos = team1Pos + 1;
          setTeam1Pos(newPos);
          if (newPos >= TRACK_LENGTH) {
            setWinner(1);
            isWin = true;
          }
        } else {
          const newPos = team2Pos + 1;
          setTeam2Pos(newPos);
          if (newPos >= TRACK_LENGTH) {
            setWinner(2);
            isWin = true;
          }
        }
      }
      
      if (isWin) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444']
        });
      } else {
        setCurrentTurn(currentTurn === 1 ? 2 : 1);
        generateQuestion();
      }
    }, 2000);
  };

  if (winner) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-[2rem] text-center border border-white/40 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 z-0"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-6">{winner === 1 ? '🐱' : '🐶'}</div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              ĐỘI {winner} CHIẾN THẮNG!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              Chúc mừng Đội {winner} đã về đích đầu tiên!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setTeam1Pos(0);
                  setTeam2Pos(0);
                  setCurrentTurn(1);
                  setWinner(null);
                  generateQuestion();
                }}
                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all"
              >
                Chơi lại
              </button>
              <button
                onClick={onExit}
                className="px-8 py-4 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
              >
                Thoát
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-4 md:mt-8 p-4">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Flag className="text-blue-500" />
          Đường đua vượt chướng ngại vật
        </h2>
        <div className="w-10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Track Section */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <div className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${currentTurn === 1 ? 'bg-blue-100 text-blue-700 scale-110 shadow-md' : 'bg-slate-100 text-slate-500 opacity-50'}`}>
              <span className="text-2xl">🐱</span> Đội 1
            </div>
            <div className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${currentTurn === 2 ? 'bg-orange-100 text-orange-700 scale-110 shadow-md' : 'bg-slate-100 text-slate-500 opacity-50'}`}>
              Đội 2 <span className="text-2xl">🐶</span>
            </div>
          </div>

          <div className="relative w-full h-[500px] bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-4 flex justify-around overflow-hidden">
            {/* Team 1 Track */}
            <div className="relative w-20 h-full flex flex-col-reverse justify-between">
              {Array.from({ length: TRACK_LENGTH + 1 }).map((_, i) => (
                <div key={`t1-${i}`} className="w-full h-10 relative flex items-center justify-center">
                  {i > 0 && i < TRACK_LENGTH && (
                    <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-full shadow-sm"></div>
                  )}
                  {i === TRACK_LENGTH && <Flag className="text-green-500 absolute -top-2" size={32} />}
                  {i === 0 && <div className="w-full h-2 bg-blue-400 rounded-full shadow-sm"></div>}
                </div>
              ))}
              <motion.div 
                className="absolute left-0 w-full h-12 flex items-center justify-center text-5xl z-10"
                animate={{ bottom: `calc(${(team1Pos / TRACK_LENGTH) * 100}% - ${team1Pos === TRACK_LENGTH ? 24 : 0}px)` }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                🐱
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-2 h-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>

            {/* Team 2 Track */}
            <div className="relative w-20 h-full flex flex-col-reverse justify-between">
              {Array.from({ length: TRACK_LENGTH + 1 }).map((_, i) => (
                <div key={`t2-${i}`} className="w-full h-10 relative flex items-center justify-center">
                  {i > 0 && i < TRACK_LENGTH && (
                    <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-full shadow-sm"></div>
                  )}
                  {i === TRACK_LENGTH && <Flag className="text-green-500 absolute -top-2" size={32} />}
                  {i === 0 && <div className="w-full h-2 bg-orange-400 rounded-full shadow-sm"></div>}
                </div>
              ))}
              <motion.div 
                className="absolute left-0 w-full h-12 flex items-center justify-center text-5xl z-10"
                animate={{ bottom: `calc(${(team2Pos / TRACK_LENGTH) * 100}% - ${team2Pos === TRACK_LENGTH ? 24 : 0}px)` }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                🐶
              </motion.div>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-12 shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">AI đang chuẩn bị câu hỏi...</p>
            </div>
          ) : question ? (
            <motion.div 
              key={currentTurn + (question.question || '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-xl border-2 transition-all duration-300 ${
                feedback === 'correct' ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 
                feedback === 'wrong' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-shake' : 
                currentTurn === 1 ? 'border-blue-200 dark:border-blue-900/50' : 'border-orange-200 dark:border-orange-900/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner ${currentTurn === 1 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                  {currentTurn === 1 ? '🐱' : '🐶'}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Lượt của</div>
                  <div className={`text-xl font-bold ${currentTurn === 1 ? 'text-blue-600' : 'text-orange-600'}`}>
                    Đội {currentTurn}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 leading-relaxed">
                {question.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(opt)}
                    className={`p-5 rounded-2xl text-left font-medium transition-all border-2 flex items-center justify-between group ${
                      selectedOption === opt ? (
                        feedback === 'correct' ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        feedback === 'wrong' ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      ) : (
                        feedback === 'wrong' && opt === question.answer ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50 text-slate-700 dark:text-slate-300'
                      )
                    }`}
                  >
                    <span className="text-lg">{opt}</span>
                    {selectedOption === opt && feedback === 'correct' && <CheckCircle2 size={24} className="text-green-500" />}
                    {selectedOption === opt && feedback === 'wrong' && <XCircle size={24} className="text-red-500" />}
                    {feedback === 'wrong' && opt === question.answer && <CheckCircle2 size={24} className="text-green-500" />}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                    className={`p-6 rounded-2xl border ${
                      feedback === 'correct' 
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                        : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                    }`}
                  >
                    <div className={`flex items-center gap-2 font-bold text-sm mb-2 uppercase tracking-wider ${
                      feedback === 'correct' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {feedback === 'correct' ? <Sparkles size={18} /> : <Lightbulb size={18} />}
                      {feedback === 'correct' ? 'Chính xác! Tiến lên 1 bước' : 'Sai rồi! Đứng yên nhé'}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                      {question.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
