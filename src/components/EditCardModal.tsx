import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardData, Level } from '../types';
import { X, Save } from 'lucide-react';

interface EditCardModalProps {
  isOpen: boolean;
  card: FlashcardData | null;
  onClose: () => void;
  onSave: (updatedCard: FlashcardData) => void;
}

export function EditCardModal({ isOpen, card, onClose, onSave }: EditCardModalProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [explain, setExplain] = useState('');
  const [level, setLevel] = useState<Level>('medium');

  useEffect(() => {
    if (card) {
      setFront(card.front);
      setBack(card.back);
      setExplain(card.explain);
      setLevel(card.level);
    }
  }, [card]);

  if (!isOpen || !card) return null;

  const handleSave = () => {
    onSave({
      ...card,
      front,
      back,
      explain,
      level
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800">Chỉnh sửa thẻ</h3>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mặt trước (Câu hỏi)</label>
              <textarea
                value={front}
                onChange={(e) => setFront(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none h-24"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mặt sau (Đáp án)</label>
              <textarea
                value={back}
                onChange={(e) => setBack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none h-24"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Giải thích</label>
              <textarea
                value={explain}
                onChange={(e) => setExplain(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none h-24"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Độ khó</label>
              <div className="flex space-x-4">
                {(['easy', 'medium', 'hard'] as Level[]).map((l) => (
                  <label key={l} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      value={l}
                      checked={level === l}
                      onChange={(e) => setLevel(e.target.value as Level)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {l === 'easy' ? 'Dễ' : l === 'medium' ? 'Trung bình' : 'Khó'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center shadow-md hover:shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
