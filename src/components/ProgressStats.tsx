import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, RotateCcw, ArrowRight } from 'lucide-react';

interface ProgressStatsProps {
  stats: {
    remembered: number;
    forgot: number;
    total: number;
  };
  onRestart: () => void;
  onNewTopic: () => void;
}

export function ProgressStats({ stats, onRestart, onNewTopic }: ProgressStatsProps) {
  const totalAttempts = stats.remembered + stats.forgot;
  const rememberRate = totalAttempts > 0 ? Math.round((stats.remembered / totalAttempts) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-indigo-100 text-center"
    >
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-6">
        <Trophy className="w-12 h-12 text-white" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Hoàn thành bài học!</h2>
      <p className="text-gray-500 mb-8">Bạn đã làm rất tốt. Hãy xem lại kết quả nhé.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
          <div className="text-indigo-500 mb-2 flex justify-center"><Target className="w-6 h-6" /></div>
          <div className="text-3xl font-bold text-indigo-700 mb-1">{stats.total}</div>
          <div className="text-sm font-medium text-indigo-600/70">Tổng số thẻ</div>
        </div>
        
        <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
          <div className="text-3xl font-bold text-green-600 mb-1">{stats.remembered}</div>
          <div className="text-sm font-medium text-green-600/70">Lượt đã nhớ</div>
        </div>
        
        <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
          <div className="text-3xl font-bold text-red-500 mb-1">{stats.forgot}</div>
          <div className="text-sm font-medium text-red-500/70">Lượt chưa nhớ</div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
          <span>Tỷ lệ ghi nhớ</span>
          <span className="text-indigo-600 font-bold">{rememberRate}%</span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${rememberRate}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-8 py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Học lại bộ này
        </button>
        <button
          onClick={onNewTopic}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          Tạo chủ đề mới
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}
