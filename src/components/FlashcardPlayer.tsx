import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardData, StudySession } from '../types';
import { Flashcard } from './Flashcard';
import { ThumbsUp, ThumbsDown, RotateCcw, CheckCircle2 } from 'lucide-react';

interface FlashcardPlayerProps {
  session: StudySession;
  onComplete: (stats: { remembered: number; forgot: number; total: number }) => void;
  onEditCard: (card: FlashcardData) => void;
}

export function FlashcardPlayer({ session, onComplete, onEditCard }: FlashcardPlayerProps) {
  const [queue, setQueue] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rememberedCount, setRememberedCount] = useState(0);
  const [forgotCount, setForgotCount] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    // Initialize queue with all cards
    setQueue([...session.cards]);
  }, [session]);

  const currentCard = queue[currentIndex];
  const isFinished = currentIndex >= queue.length;

  useEffect(() => {
    if (isFinished && queue.length > 0) {
      onComplete({
        remembered: rememberedCount,
        forgot: forgotCount,
        total: session.cards.length
      });
    }
  }, [isFinished, queue.length, onComplete, rememberedCount, forgotCount, session.cards.length]);

  const handleRemembered = () => {
    setDirection(1);
    setRememberedCount(prev => prev + 1);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleForgot = () => {
    setDirection(-1);
    setForgotCount(prev => prev + 1);
    
    // Spaced repetition logic: push the card to the end of the queue to review again
    setTimeout(() => {
      setQueue(prev => [...prev, { ...currentCard, status: 'review' }]);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  if (isFinished) {
    return null; // Handled by onComplete
  }

  if (!currentCard) return null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full flex items-center justify-between mb-8 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">Tiến độ:</span>
          <span className="text-sm font-bold text-indigo-600">{currentIndex + 1} / {queue.length}</span>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center text-green-600">
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-bold">{rememberedCount}</span>
          </div>
          <div className="flex items-center text-red-500">
            <ThumbsDown className="w-4 h-4 mr-1" />
            <span className="text-sm font-bold">{forgotCount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6 mb-8">
        <button
          onClick={handleForgot}
          className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-red-100 text-red-500 hover:bg-red-50 hover:scale-110 transition-all z-10"
        >
          <RotateCcw className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Chưa nhớ</span>
        </button>

        <button
          onClick={handleRemembered}
          className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-green-100 text-green-500 hover:bg-green-50 hover:scale-110 transition-all z-10"
        >
          <CheckCircle2 className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Đã nhớ</span>
        </button>
      </div>

      <div className="relative w-full flex justify-center items-center h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ 
              x: direction === 1 ? 300 : -300, 
              opacity: 0, 
              scale: 0.8,
              rotate: direction === 1 ? 10 : -10
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute w-full flex justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleForgot();
              } else if (swipe > swipeConfidenceThreshold) {
                handleRemembered();
              }
            }}
          >
            <Flashcard card={currentCard} onEdit={onEditCard} />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Mẹo: Bạn có thể vuốt thẻ sang trái (Chưa nhớ) hoặc phải (Đã nhớ)
      </p>
    </div>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
