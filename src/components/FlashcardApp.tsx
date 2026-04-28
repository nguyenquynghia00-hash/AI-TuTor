import React, { useState, useEffect } from 'react';
import { SetupForm } from './SetupForm';
import { FlashcardPlayer } from './FlashcardPlayer';
import { ProgressStats } from './ProgressStats';
import { EditCardModal } from './EditCardModal';
import { ManualCardForm } from './ManualCardForm';
import { DeckList } from './DeckList';
import { StudySession, FlashcardData, Deck } from '../types';
import { generateFlashcards } from '../lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Edit3 } from 'lucide-react';

export default function FlashcardApp() {
  const [decks, setDecks] = useState<Deck[]>(() => {
    const savedDecks = localStorage.getItem('ai_learning_hub_flashcard_decks');
    if (savedDecks) {
      try {
        return JSON.parse(savedDecks);
      } catch (e) {
        console.error("Failed to load saved decks", e);
        return [];
      }
    }
    return [];
  });
  const [session, setSession] = useState<StudySession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stats, setStats] = useState<{ remembered: number; forgot: number; total: number } | null>(null);
  const [editingCard, setEditingCard] = useState<FlashcardData | null>(null);
  const [view, setView] = useState<'list' | 'setup' | 'manual' | 'player' | 'stats'>('list');
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deckToDelete, setDeckToDelete] = useState<string | null>(null);

  // Save decks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ai_learning_hub_flashcard_decks', JSON.stringify(decks));
  }, [decks]);

  const handleGenerate = async (data: any) => {
    setIsGenerating(true);
    try {
      const cards = await generateFlashcards(
        data.subject,
        data.className,
        data.topic,
        data.count,
        data.fileBase64,
        data.mimeType
      );
      
      const newDeck: Deck = {
        id: crypto.randomUUID(),
        name: data.topic,
        subject: data.subject,
        className: data.className,
        cards,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      setDecks(prev => [newDeck, ...prev]);
      setSession({ deckId: newDeck.id, cards: newDeck.cards });
      setView('player');
      setStats(null);
    } catch (error) {
      console.error("Failed to generate flashcards:", error);
      alert("Đã có lỗi xảy ra khi tạo flashcard. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveManualDeck = (deckData: { name: string; subject: string; className: string; cards: FlashcardData[] }) => {
    if (editingDeck) {
      const updatedDeck: Deck = {
        ...editingDeck,
        ...deckData,
        updatedAt: Date.now()
      };
      setDecks(prev => prev.map(d => d.id === editingDeck.id ? updatedDeck : d));
      setEditingDeck(null);
    } else {
      const newDeck: Deck = {
        id: crypto.randomUUID(),
        ...deckData,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setDecks(prev => [newDeck, ...prev]);
    }
    setView('list');
  };

  const handlePractice = (deck: Deck) => {
    setSession({ deckId: deck.id, cards: deck.cards });
    setView('player');
    setStats(null);
  };

  const handleEditDeck = (deck: Deck) => {
    setEditingDeck(deck);
    setView('manual');
  };

  const handleDeleteDeck = (id: string) => {
    setDeckToDelete(id);
  };

  const confirmDeleteDeck = () => {
    if (deckToDelete) {
      setDecks(prev => prev.filter(d => d.id !== deckToDelete));
      setDeckToDelete(null);
    }
  };

  const handleExportDeck = (deck: Deck) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${deck.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleComplete = (finalStats: any) => {
    setStats(finalStats);
    setView('stats');
  };

  const handleRestart = () => {
    setStats(null);
    setView('player');
  };

  const handleNewTopic = () => {
    setSession(null);
    setStats(null);
    setView('list');
  };

  const handleSaveEditCard = (updatedCard: FlashcardData) => {
    if (session) {
      const updatedCards = session.cards.map(c => c.id === updatedCard.id ? updatedCard : c);
      setSession({
        ...session,
        cards: updatedCards
      });
      // Also update the deck
      setDecks(prev => prev.map(d => d.id === session.deckId ? { ...d, cards: updatedCards, updatedAt: Date.now() } : d));
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
            <DeckList 
              decks={decks} 
              onPractice={handlePractice} 
              onEdit={handleEditDeck} 
              onDelete={handleDeleteDeck} 
              onExport={handleExportDeck}
              onNewDeck={() => setView('setup')}
            />
          </motion.div>
        )}

        {view === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-2xl mx-auto space-y-6">
            <div className="flex justify-center space-x-4 mb-8">
              <button 
                onClick={() => setView('setup')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg flex items-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Tạo bằng AI
              </button>
              <button 
                onClick={() => setView('manual')}
                className="px-6 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-xl font-bold hover:bg-indigo-50 flex items-center"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Tạo thủ công
              </button>
            </div>
            <SetupForm onGenerate={handleGenerate} isLoading={isGenerating} />
            <button onClick={() => setView('list')} className="w-full text-center text-gray-500 hover:text-indigo-600">Quay lại danh sách</button>
          </motion.div>
        )}

        {view === 'manual' && (
          <motion.div key="manual" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
            <ManualCardForm 
              onSave={handleSaveManualDeck} 
              initialDeck={editingDeck || undefined}
              onCancel={() => { setView('list'); setEditingDeck(null); }}
            />
          </motion.div>
        )}

        {view === 'player' && session && (
          <motion.div key="player" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex-1 flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {decks.find(d => d.id === session.deckId)?.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {decks.find(d => d.id === session.deckId)?.subject} - {decks.find(d => d.id === session.deckId)?.className}
              </p>
              <button 
                onClick={handleNewTopic}
                className="mt-2 text-sm text-indigo-500 hover:text-indigo-600 underline"
              >
                Quay lại danh sách
              </button>
            </div>
            <FlashcardPlayer 
              session={session as any} 
              onComplete={handleComplete} 
              onEditCard={setEditingCard}
            />
          </motion.div>
        )}

        {view === 'stats' && stats && (
          <motion.div key="stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
            <ProgressStats 
              stats={stats} 
              onRestart={handleRestart} 
              onNewTopic={handleNewTopic} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <EditCardModal
        isOpen={!!editingCard}
        card={editingCard}
        onClose={() => setEditingCard(null)}
        onSave={handleSaveEditCard}
      />

      {deckToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Xóa bộ thẻ?</h3>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa bộ thẻ này không? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setDeckToDelete(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Hủy</button>
              <button onClick={confirmDeleteDeck} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

