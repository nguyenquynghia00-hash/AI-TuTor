import React, { useState } from 'react';
import { Plus, Trash2, Save, BookOpen, GraduationCap, FileText, Sparkles, Edit3 } from 'lucide-react';
import { FlashcardData, Level } from '../types';

interface ManualCardFormProps {
  onSave: (deck: { name: string; subject: string; className: string; cards: FlashcardData[] }) => void;
  initialDeck?: { name: string; subject: string; className: string; cards: FlashcardData[] };
  onCancel: () => void;
}

export function ManualCardForm({ onSave, initialDeck, onCancel }: ManualCardFormProps) {
  const [name, setName] = useState(initialDeck?.name || '');
  const [subject, setSubject] = useState(initialDeck?.subject || '');
  const [className, setClassName] = useState(initialDeck?.className || '');
  const [cards, setCards] = useState<FlashcardData[]>(initialDeck?.cards || []);
  
  const [currentFront, setCurrentFront] = useState('');
  const [currentBack, setCurrentBack] = useState('');
  const [currentExplain, setCurrentExplain] = useState('');
  const [currentLevel, setCurrentLevel] = useState<Level>('medium');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const handleAddCard = () => {
    if (!currentFront.trim() || !currentBack.trim()) return;

    if (editingCardId) {
      setCards(prev => prev.map(c => c.id === editingCardId ? {
        ...c,
        front: currentFront,
        back: currentBack,
        explain: currentExplain,
        level: currentLevel
      } : c));
      setEditingCardId(null);
    } else {
      const newCard: FlashcardData = {
        id: crypto.randomUUID(),
        front: currentFront,
        back: currentBack,
        explain: currentExplain,
        level: currentLevel,
        status: 'new'
      };
      setCards(prev => [...prev, newCard]);
    }

    setCurrentFront('');
    setCurrentBack('');
    setCurrentExplain('');
    setCurrentLevel('medium');
  };

  const handleEditCard = (card: FlashcardData) => {
    setCurrentFront(card.front);
    setCurrentBack(card.back);
    setCurrentExplain(card.explain);
    setCurrentLevel(card.level);
    setEditingCardId(card.id);
  };

  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const handleSaveDeck = () => {
    if (!name.trim() || cards.length === 0) {
      alert('Vui lòng nhập tên bộ thẻ và thêm ít nhất 1 thẻ.');
      return;
    }
    onSave({ name, subject, className, cards });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-indigo-100">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialDeck ? 'Chỉnh sửa bộ thẻ' : 'Tạo bộ thẻ thủ công'}
        </h2>
        <button onClick={onCancel} className="text-sm text-gray-500 hover:text-indigo-600">Hủy</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
            Tên bộ thẻ
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Từ vựng Unit 1"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
            Môn học
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="VD: Tiếng Anh"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <GraduationCap className="w-4 h-4 mr-2 text-indigo-500" />
            Lớp
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="VD: Lớp 12"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4">
        <h3 className="font-bold text-indigo-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {editingCardId ? 'Sửa thẻ' : 'Thêm thẻ mới'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Mặt trước (Câu hỏi)</label>
            <textarea
              value={currentFront}
              onChange={(e) => setCurrentFront(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Mặt sau (Đáp án)</label>
            <textarea
              value={currentBack}
              onChange={(e) => setCurrentBack(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Giải thích (Tùy chọn)</label>
          <input
            type="text"
            value={currentExplain}
            onChange={(e) => setCurrentExplain(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-xs font-bold text-gray-500 uppercase">Độ khó:</label>
            {(['easy', 'medium', 'hard'] as Level[]).map(l => (
              <label key={l} className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  checked={currentLevel === l}
                  onChange={() => setCurrentLevel(l)}
                  className="text-indigo-600"
                />
                <span className="text-sm text-gray-600 capitalize">
                  {l === 'easy' ? 'Dễ' : l === 'medium' ? 'Trung bình' : 'Khó'}
                </span>
              </label>
            ))}
          </div>
          <button
            onClick={handleAddCard}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            {editingCardId ? 'Cập nhật thẻ' : 'Thêm vào danh sách'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-700 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Danh sách thẻ ({cards.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
          {cards.map((card, idx) => (
            <div key={card.id} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm group hover:border-indigo-200 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-indigo-400"># {idx + 1}</span>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEditCard(card)} className="p-1 text-gray-400 hover:text-indigo-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteCard(card.id)} className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-800 line-clamp-1">{card.front}</p>
              <p className="text-xs text-gray-500 line-clamp-1 mt-1">{card.back}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveDeck}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        <Save className="w-5 h-5 mr-2" />
        Lưu bộ thẻ
      </button>
    </div>
  );
}
