import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, FileText, Play, Edit3, Trash2, Download, Plus } from 'lucide-react';
import { Deck } from '../types';

interface DeckListProps {
  decks: Deck[];
  onPractice: (deck: Deck) => void;
  onEdit: (deck: Deck) => void;
  onDelete: (id: string) => void;
  onExport: (deck: Deck) => void;
  onNewDeck: () => void;
}

export function DeckList({ decks, onPractice, onEdit, onDelete, onExport, onNewDeck }: DeckListProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Bộ thẻ của bạn</h2>
          <p className="text-gray-500 mt-1">Quản lý và luyện tập các bộ thẻ đã tạo</p>
        </div>
        <button
          onClick={onNewDeck}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo bộ thẻ mới
        </button>
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400">Chưa có bộ thẻ nào</h3>
          <p className="text-gray-400 mt-2">Hãy tạo bộ thẻ đầu tiên bằng AI hoặc thủ công nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck, idx) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-indigo-50 p-6 hover:shadow-xl hover:border-indigo-200 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex space-x-2 transition-opacity">
                  <button onClick={() => onExport(deck)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="Xuất JSON">
                    <Download className="w-4 h-4" />
                  </button>
                  <button onClick={() => onEdit(deck)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="Sửa">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(deck.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Xóa">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{deck.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium border border-indigo-100">
                  <FileText className="w-3 h-3 mr-1" />
                  {deck.cards.length} thẻ
                </span>
                <span className="flex items-center px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium border border-purple-100">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {deck.subject}
                </span>
              </div>

              <button
                onClick={() => onPractice(deck)}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Luyện tập ngay
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
