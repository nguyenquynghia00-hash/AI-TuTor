import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FlashcardData } from '../types';
import { Edit2 } from 'lucide-react';

interface FlashcardProps {
  card: FlashcardData;
  onEdit: (card: FlashcardData) => void;
}

export function Flashcard({ card, onEdit }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return level;
    }
  };

  return (
    <div className="relative w-full max-w-xs aspect-[3/4] perspective-1000 mx-auto">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-2xl border border-indigo-50 p-6 flex flex-col items-center justify-center text-center hover:shadow-indigo-200/50 transition-shadow">
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(card.level)}`}>
            {getLevelLabel(card.level)}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(card); }}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <h3 className="text-2xl font-bold text-gray-800 leading-tight">
            {card.front}
          </h3>
          <p className="absolute bottom-4 text-xs text-gray-400 animate-pulse">
            Chạm để lật thẻ
          </p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-white border-2 border-indigo-100 rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center text-center text-gray-800" style={{ transform: 'rotateY(180deg)' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(card); }}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <h3 className="text-xl font-bold mb-4 pb-4 border-b border-gray-200 w-full text-gray-900">
              {card.back}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed overflow-y-auto max-h-32">
              {card.explain}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
