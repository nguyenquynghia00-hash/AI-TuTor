import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Map, Target, Clock, BookOpen, Brain, TrendingUp, Loader2, Sparkles, FileText, Download, FileDown } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

interface StudyRoadmapProps {
  ai: GoogleGenAI;
  userProfile: any;
}

export default function StudyRoadmap({ ai, userProfile }: StudyRoadmapProps) {
  const [level, setLevel] = useState('THCS');
  const [classLevel, setClassLevel] = useState('');
  const [strongSubjects, setStrongSubjects] = useState('');
  const [weakSubjects, setWeakSubjects] = useState('');
  const [goal, setGoal] = useState('Tăng điểm');
  const [studyTime, setStudyTime] = useState('2 giờ');
  const [extraDesc, setExtraDesc] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapContent, setRoadmapContent] = useState<string | null>(null);

  const handleExportWord = async () => {
    if (!roadmapContent) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN');
    const timeStr = now.toLocaleTimeString('vi-VN');

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "LỘ TRÌNH HỌC TẬP CÁ NHÂN",
                  bold: true,
                  size: 36, // 18pt
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `Ngày tạo: ${dateStr} | Giờ tạo: ${timeStr}`,
                  italics: true,
                  size: 22, // 11pt
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({ text: "", spacing: { after: 200 } }),

            // Thông tin học sinh
            new Paragraph({
              children: [
                new TextRun({ text: "Họ tên: ", bold: true, font: "Times New Roman", size: 26 }),
                new TextRun({ text: userProfile?.displayName || "Học sinh", font: "Times New Roman", size: 26 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Lớp: ", bold: true, font: "Times New Roman", size: 26 }),
                new TextRun({ text: classLevel || "N/A", font: "Times New Roman", size: 26 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Cấp học: ", bold: true, font: "Times New Roman", size: 26 }),
                new TextRun({ text: level, font: "Times New Roman", size: 26 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Mục tiêu: ", bold: true, font: "Times New Roman", size: 26 }),
                new TextRun({ text: goal, font: "Times New Roman", size: 26 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Môn học mạnh: ", bold: true, font: "Times New Roman", size: 26 }),
                new TextRun({ text: strongSubjects, font: "Times New Roman", size: 26 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Môn học yếu: ", bold: true, font: "Times New Roman", size: 26 }),
                new TextRun({ text: weakSubjects, font: "Times New Roman", size: 26 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Thời gian học mỗi ngày: ", bold: true, font: "Times New Roman", size: 26 }),
                new TextRun({ text: studyTime, font: "Times New Roman", size: 26 }),
              ],
            }),
            new Paragraph({ text: "", spacing: { after: 400 } }),

            // Nội dung lộ trình
            ...roadmapContent.split('\n').map(line => {
              const trimmed = line.trim();
              if (trimmed.startsWith('## ')) {
                return new Paragraph({
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 240, after: 120 },
                  children: [
                    new TextRun({
                      text: trimmed.replace('## ', '').toUpperCase(),
                      bold: true,
                      size: 28, // 14pt
                      font: "Times New Roman",
                      color: "2E7D32", // Emerald-ish
                    }),
                  ],
                });
              } else if (trimmed.startsWith('### ')) {
                return new Paragraph({
                  heading: HeadingLevel.HEADING_3,
                  spacing: { before: 200, after: 100 },
                  children: [
                    new TextRun({
                      text: trimmed.replace('### ', ''),
                      bold: true,
                      size: 26, // 13pt
                      font: "Times New Roman",
                    }),
                  ],
                });
              } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return new Paragraph({
                  bullet: { level: 0 },
                  spacing: { line: 360 }, // 1.5 line spacing
                  children: [
                    new TextRun({
                      text: trimmed.substring(2),
                      size: 26, // 13pt
                      font: "Times New Roman",
                    }),
                  ],
                });
              } else if (trimmed.length > 0) {
                // Check for bold text in markdown
                const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                return new Paragraph({
                  spacing: { line: 360 }, // 1.5 line spacing
                  children: parts.map(part => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return new TextRun({
                        text: part.replace(/\*\*/g, ''),
                        bold: true,
                        size: 26,
                        font: "Times New Roman",
                      });
                    }
                    return new TextRun({
                      text: part,
                      size: 26,
                      font: "Times New Roman",
                    });
                  }),
                });
              }
              return new Paragraph({ text: "" });
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Lo_trinh_hoc_${userProfile?.displayName || 'Hoc_sinh'}.docx`);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setRoadmapContent(null);

    const prompt = `Bạn là chuyên gia giáo dục và cố vấn học tập cá nhân.
Nhiệm vụ: Tạo lộ trình học tập chi tiết, cá nhân hóa cho học sinh.

THÔNG TIN HỌC SINH:
- Họ tên: ${userProfile?.displayName || 'Học sinh'}
- Lớp: ${classLevel}
- Cấp học: ${level}
- Môn học mạnh: ${strongSubjects}
- Môn học yếu: ${weakSubjects}
- Mục tiêu: ${goal}
- Thời gian học mỗi ngày: ${studyTime}
- Mô tả thêm (Thói quen, điểm số): ${extraDesc || 'Không có'}

YÊU CẦU PHÂN TÍCH & LẬP KẾ HOẠCH:
1. Phân tích điểm mạnh, điểm yếu và mức độ hiện tại.
2. Đưa ra chiến lược học tập phù hợp.
3. Lập lộ trình: Ngắn hạn (1-2 tuần), Trung hạn (1 tháng), Dài hạn (3 tháng).
4. Lập kế hoạch học tập chia theo các ngày trong tuần (Thứ 2 đến Chủ nhật) dựa trên thời gian học mỗi ngày.
5. Đưa ra gợi ý cách học hiệu quả và lỗi thường gặp cho từng môn.
6. Tích hợp AI: Gợi ý cách dùng AI để làm bài tập phù hợp.
7. Theo dõi: Gợi ý cách check tiến độ và tự điều chỉnh lộ trình (tăng độ khó nếu tiến bộ, giảm độ khó/ôn lại nếu yếu).
8. Động lực: Lời khuyên khuyến khích và mục tiêu nhỏ mỗi tuần.

BẮT BUỘC TRÌNH BÀY THEO FORMAT SAU (Sử dụng Markdown):

## 📊 Tổng quan
(Phân tích điểm mạnh, yếu, chiến lược)

## 📅 Lộ trình
### 1. Ngắn hạn (1–2 tuần)
...
### 2. Trung hạn (1 tháng)
...
### 3. Dài hạn (3 tháng)
...

## 📚 Kế hoạch học tập hàng tuần
(Chia lịch từ Thứ 2 đến Chủ nhật, phân bổ thời gian hợp lý)

## 🎯 Gợi ý phương pháp
(Cách học, lỗi thường gặp, cách dùng AI)

## 📈 Theo dõi & Điều chỉnh
(Cách đánh giá tiến độ và tự điều chỉnh)

## 🏆 Động lực
(Lời khuyên, mục tiêu nhỏ)`;

    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        fullText += chunk.text;
        setRoadmapContent(fullText);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setRoadmapContent("Đã có lỗi xảy ra khi tạo lộ trình. Vui lòng thử lại sau.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
          <Map size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Lộ Trình Học Tập</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Cá nhân hóa kế hoạch học tập để đạt mục tiêu</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-4 overflow-y-auto custom-scrollbar pr-2" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <Target size={18} className="text-emerald-500" /> Thông tin học sinh
            </h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cấp học</label>
                  <select value={level} onChange={e => setLevel(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none">
                    <option value="Tiểu học">Tiểu học</option>
                    <option value="THCS">THCS</option>
                    <option value="THPT">THPT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Lớp</label>
                  <input type="text" value={classLevel} onChange={e => setClassLevel(e.target.value)} placeholder="VD: 9A1" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mục tiêu</label>
                <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none">
                  <option value="Tăng điểm">Tăng điểm</option>
                  <option value="Thi học kỳ">Thi học kỳ</option>
                  <option value="Thi chuyển cấp">Thi chuyển cấp</option>
                  <option value="Thi học sinh giỏi">Thi học sinh giỏi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Môn học mạnh</label>
                <input type="text" value={strongSubjects} onChange={e => setStrongSubjects(e.target.value)} placeholder="VD: Toán, Lý" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Môn học yếu</label>
                <input type="text" value={weakSubjects} onChange={e => setWeakSubjects(e.target.value)} placeholder="VD: Văn, Anh" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Thời gian tự học mỗi ngày</label>
                <input type="text" value={studyTime} onChange={e => setStudyTime(e.target.value)} placeholder="VD: 2 giờ" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mô tả thêm (Tùy chọn)</label>
                <textarea 
                  value={extraDesc} 
                  onChange={e => setExtraDesc(e.target.value)} 
                  placeholder="Thói quen học, điểm số hiện tại, khó khăn đang gặp..." 
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none resize-none"
                  rows={3}
                />
              </div>

              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isGenerating ? (
                  <><Loader2 size={18} className="animate-spin" /> Đang phân tích...</>
                ) : (
                  <><Sparkles size={18} /> Tạo lộ trình</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-8 overflow-hidden flex flex-col h-full" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-t-3xl flex justify-between items-center">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BookOpen size={18} className="text-emerald-500" /> Kết quả lộ trình
              </h3>
              {roadmapContent && !isGenerating && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleExportWord}
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-emerald-200 dark:border-emerald-500/30"
                  >
                    <FileDown size={16} /> Xuất Word (.docx)
                  </button>
                  <button 
                    onClick={() => {
                      const blob = new Blob([roadmapContent], { type: 'text/markdown;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Lo_Trinh_Hoc_Tap_${userProfile?.displayName || 'HS'}.md`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <Download size={16} /> Tải Markdown
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar bg-white dark:bg-slate-900 rounded-b-3xl">
              {roadmapContent ? (
                <div className="prose dark:prose-invert max-w-none prose-headings:text-emerald-600 dark:prose-headings:text-emerald-400 prose-a:text-blue-500">
                  <Markdown remarkPlugins={[remarkGfm]}>{roadmapContent}</Markdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-4">
                  <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Map size={40} className="text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-center max-w-sm">
                    Điền thông tin và bấm "Tạo lộ trình" để AI thiết kế kế hoạch học tập dành riêng cho bạn.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
