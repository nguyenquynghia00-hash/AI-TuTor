import React, { useState, useRef } from 'react';
import { Upload, BookOpen, GraduationCap, FileText, Hash, Loader2 } from 'lucide-react';

interface SetupFormProps {
  onGenerate: (data: {
    subject: string;
    className: string;
    topic: string;
    count: number;
    fileBase64?: string;
    mimeType?: string;
  }) => void;
  isLoading: boolean;
}

export function SetupForm({ onGenerate, isLoading }: SetupFormProps) {
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let fileBase64: string | undefined;
    let mimeType: string | undefined;

    if (file) {
      mimeType = file.type;
      fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Extract base64 part
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    onGenerate({ subject, className, topic, count, fileBase64, mimeType });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 bg-white/90 dark:bg-slate-100/90 backdrop-blur-xl rounded-3xl shadow-xl border border-indigo-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Tạo Flashcard Thông Minh
        </h2>
        <p className="text-gray-600 mt-1 text-sm">Nhập thông tin để AI tạo bộ thẻ học tập cho bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-gray-800">
              <BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
              Môn học
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="VD: Lịch sử, Sinh học..."
              className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-gray-800">
              <GraduationCap className="w-4 h-4 mr-2 text-indigo-600" />
              Lớp
            </label>
            <input
              type="text"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="VD: Lớp 12, Đại học..."
              className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center text-sm font-medium text-gray-800">
            <FileText className="w-4 h-4 mr-2 text-indigo-600" />
            Nội dung / Chủ đề
          </label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="VD: Chiến tranh thế giới thứ 2, Tế bào..."
            className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center text-sm font-medium text-gray-800">
            <Hash className="w-4 h-4 mr-2 text-indigo-600" />
            Số lượng thẻ
          </label>
          <input
            type="number"
            min="5"
            max="50"
            required
            value={count || ''}
            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center text-sm font-medium text-gray-800">
            <Upload className="w-4 h-4 mr-2 text-indigo-600" />
            Tài liệu đính kèm (Tùy chọn)
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-6 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer flex flex-col items-center justify-center group"
          >
            <Upload className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 mb-2" />
            <span className="text-sm text-gray-600 group-hover:text-indigo-700">
              {file ? file.name : "Click để tải lên ảnh hoặc file (PDF, TXT...)"}
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.txt,.doc,.docx"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Đang tạo Flashcard...
            </>
          ) : (
            'Tạo Flashcard Ngay'
          )}
        </button>
      </form>
    </div>
  );
}
