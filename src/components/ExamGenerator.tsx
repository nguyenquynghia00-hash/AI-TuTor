import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, CheckCircle, Loader2, Eye, EyeOff, Play, Upload, X } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Header, Footer, PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

interface ExamGeneratorProps {
  ai: GoogleGenAI;
}

interface ExamQuestion {
  type: string;
  questionText: string;
  options?: string[];
  statements?: { text: string; isTrue: boolean }[];
  matchingLeft?: string[];
  matchingRight?: string[];
  tableData?: { headers: string[]; rows: string[][] };
  projectDetails?: { product: string; method: string };
  selfAssessment?: string[];
  answerGuide: string;
}

interface ExamData {
  school: string;
  examName: string;
  subject: string;
  time: string;
  questions: ExamQuestion[];
}

const QUESTION_TYPES = [
  "Trắc nghiệm A B C D",
  "Đúng / Sai",
  "Nối cột",
  "Ghép thẻ kiến thức",
  "Tự luận ngắn",
  "Tìm lỗi sai",
  "Tình huống - giải quyết vấn đề",
  "Phân tích bảng / biểu đồ",
  "So sánh - đối chiếu",
  "Viết mở rộng",
  "Nhập vai",
  "Sơ đồ tư duy",
  "Dự án nhỏ (project)",
  "Tự đánh giá"
];

export default function ExamGenerator({ ai }: ExamGeneratorProps) {
  const [school, setSchool] = useState('');
  const [level, setLevel] = useState('THCS');
  const [classLevel, setClassLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('Học kỳ 1');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState('10');
  const [language, setLanguage] = useState('Tiếng Việt');
  const [difficulty, setDifficulty] = useState('Trung bình');
  const [mode, setMode] = useState('Bài kiểm tra');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Trắc nghiệm A B C D', 'Tự luận ngắn']);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isTakingExam, setIsTakingExam] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target?.result as string);
      };
      reader.readAsText(selectedFile);
    }
  };

  const toggleQuestionType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classLevel || !subject || !topic || !numQuestions || selectedTypes.length === 0) {
      alert("Vui lòng điền đầy đủ thông tin và chọn ít nhất 1 dạng câu hỏi.");
      return;
    }

    setIsGenerating(true);
    setExamData(null);
    setShowAnswers(false);
    setIsTakingExam(false);

    try {
      let prompt = `Bạn là chuyên gia giáo dục và thiết kế đề thi chuyên nghiệp.
Tạo bài kiểm tra hoàn chỉnh, đa dạng dạng câu hỏi, đúng chuẩn giáo dục.

INPUT NGƯỜI DÙNG:
- Trường: ${school || 'Trường giả lập'}
- Lớp: ${classLevel}
- Cấp học: ${level}
- Môn học: ${subject}
- Học kỳ: ${semester}
- Nội dung bài học: ${topic}
- Số câu hỏi: ${numQuestions}
- Ngôn ngữ câu hỏi: ${language}
- Độ khó: ${difficulty}
- Chế độ tạo: ${mode}
- Dạng câu hỏi: ${selectedTypes.join(', ')}

YÊU CẦU:
1. Phân bố câu hỏi theo các dạng đã chọn.
2. Nội dung chính xác, phù hợp cấp học, độ khó phân bố hợp lý.
3. Cung cấp đáp án chi tiết cho mỗi câu hỏi.
`;

      if (fileContent) {
        prompt += `\nDựa vào nội dung tài liệu sau để tạo câu hỏi:\n${fileContent.substring(0, 5000)}\n`;
      } else {
        prompt += `\nTự tạo câu hỏi từ kiến thức chuẩn.\n`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              school: { type: Type.STRING },
              examName: { type: Type.STRING },
              subject: { type: Type.STRING },
              time: { type: Type.STRING, description: "VD: Thời gian làm bài: 45 phút" },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, description: "Dạng câu hỏi (VD: Trắc nghiệm A B C D, Đúng / Sai, Nối cột, Tự luận ngắn...)" },
                    questionText: { type: Type.STRING, description: "Nội dung câu hỏi" },
                    options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Dành cho trắc nghiệm (A. ..., B. ...)" },
                    statements: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          text: { type: Type.STRING },
                          isTrue: { type: Type.BOOLEAN }
                        }
                      },
                      description: "Dành cho Đúng/Sai"
                    },
                    matchingLeft: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Cột A cho nối cột" },
                    matchingRight: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Cột B cho nối cột" },
                    tableData: {
                      type: Type.OBJECT,
                      properties: {
                        headers: { type: Type.ARRAY, items: { type: Type.STRING } },
                        rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } }
                      },
                      description: "Dành cho Phân tích bảng / biểu đồ, So sánh - đối chiếu"
                    },
                    projectDetails: {
                      type: Type.OBJECT,
                      properties: {
                        product: { type: Type.STRING },
                        method: { type: Type.STRING }
                      },
                      description: "Dành cho Dự án nhỏ"
                    },
                    selfAssessment: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Dành cho Tự đánh giá"
                    },
                    answerGuide: { type: Type.STRING, description: "Đáp án hoặc hướng dẫn giải chi tiết" }
                  },
                  required: ["type", "questionText", "answerGuide"]
                }
              }
            },
            required: ["school", "examName", "subject", "time", "questions"]
          }
        }
      });

      const data = JSON.parse(response.text) as ExamData;
      setExamData(data);
    } catch (error) {
      console.error("Error generating exam:", error);
      alert("Có lỗi xảy ra khi tạo đề thi. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDocx = async (includeAnswers: boolean) => {
    if (!examData) return;

    const createDottedLines = (lines: number) => {
      const result = [];
      for (let i = 0; i < lines; i++) {
        result.push(new Paragraph({ text: "....................................................................................................................................", spacing: { after: 200 } }));
      }
      return result;
    };

    const createTable = (headers: string[], rows: string[][]) => {
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        },
        rows: [
          new TableRow({
            children: headers.map(h => new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })],
              margins: { top: 100, bottom: 100, left: 100, right: 100 }
            }))
          }),
          ...rows.map(row => new TableRow({
            children: row.map(cell => new TableCell({
              children: [new Paragraph({ text: cell })],
              margins: { top: 100, bottom: 100, left: 100, right: 100 }
            }))
          }))
        ]
      });
    };

    const children: any[] = [
      new Paragraph({
        text: examData.school,
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: examData.examName,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: examData.subject, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: examData.time, italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "------------------------" })]
      }),
      new Paragraph({ text: "", spacing: { after: 400 } }),
    ];

    examData.questions.forEach((q, i) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `Câu ${i + 1} (${q.type}): `, bold: true }), new TextRun({ text: q.questionText })],
          spacing: { before: 200, after: 100 }
        })
      );

      if (q.options && q.options.length > 0) {
        q.options.forEach(opt => {
          children.push(new Paragraph({ text: opt, spacing: { after: 100 } }));
        });
      }

      if (q.statements && q.statements.length > 0) {
        q.statements.forEach((stmt, idx) => {
          children.push(new Paragraph({ text: `${idx + 1}. ${stmt.text}`, spacing: { after: 100 } }));
          children.push(new Paragraph({ text: "☐ Đúng      ☐ Sai", spacing: { after: 200 } }));
        });
      }

      if (q.matchingLeft && q.matchingRight) {
        const maxLen = Math.max(q.matchingLeft.length, q.matchingRight.length);
        const rows = [];
        for (let j = 0; j < maxLen; j++) {
          const left = q.matchingLeft[j] || "";
          const right = q.matchingRight[j] || "";
          rows.push([`${j + 1}. ${left}`, `${String.fromCharCode(65 + j)}. ${right}`]);
        }
        children.push(createTable(["Cột A", "Cột B"], rows));
        children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
      }

      if (q.tableData) {
        children.push(createTable(q.tableData.headers, q.tableData.rows));
        children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
      }

      if (q.projectDetails) {
        children.push(new Paragraph({ text: `- Sản phẩm: ${q.projectDetails.product}`, spacing: { after: 100 } }));
        children.push(new Paragraph({ text: `- Cách làm: ${q.projectDetails.method}`, spacing: { after: 200 } }));
      }

      if (q.selfAssessment && q.selfAssessment.length > 0) {
        q.selfAssessment.forEach((item) => {
          children.push(new Paragraph({ text: `☐ ${item}`, spacing: { after: 100 } }));
        });
      }

      if (q.type === "Sơ đồ tư duy") {
        children.push(new Paragraph({ children: [new TextRun({ text: "Vẽ sơ đồ tư duy vào giấy", italics: true })], spacing: { after: 200 } }));
      }

      const typesWithDottedLines = ["Tự luận ngắn", "Tìm lỗi sai", "Tình huống - giải quyết vấn đề", "Viết mở rộng", "Nhập vai"];
      if (typesWithDottedLines.includes(q.type)) {
        const lines = q.type === "Viết mở rộng" ? 5 : 3;
        children.push(...createDottedLines(lines));
      }
    });

    if (includeAnswers) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
      children.push(
        new Paragraph({
          text: "ĐÁP ÁN VÀ HƯỚNG DẪN GIẢI",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 400 }
        })
      );

      examData.questions.forEach((q, i) => {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: `Câu ${i + 1}: `, bold: true }), new TextRun({ text: q.answerGuide })],
            spacing: { before: 200, after: 100 }
          })
        );
      });
    }

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Times New Roman",
              size: 26, // 13pt
            },
            paragraph: {
              spacing: {
                line: 360, // 1.5 line spacing
              },
            },
          },
        },
      },
      sections: [{
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: `Họ và tên: ...........................................`, italics: true }),
                  new TextRun({ text: `\t\tLớp: ....................`, italics: true }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "Trang ", italics: true })],
              }),
            ],
          }),
        },
        properties: {},
        children: children,
      }],
    });

    const blob = await Packer.toBlob(doc);
    const safeSubject = subject.replace(/[^a-zA-Z0-9]/g, '_');
    const safeClass = classLevel.replace(/[^a-zA-Z0-9]/g, '_');
    const suffix = includeAnswers ? '_CoDapAn' : '_KhongDapAn';
    saveAs(blob, `De_${safeSubject}_${safeClass}_${semester.replace(/[^a-zA-Z0-9]/g, '')}${suffix}.docx`);
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <FileText size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Tạo Đề Thi Chuyên Nghiệp</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Tùy chỉnh đa dạng dạng câu hỏi, xuất file Word chuẩn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-4 overflow-y-auto custom-scrollbar pr-2" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Thông số đề thi</h2>
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
                  <input type="text" value={classLevel} onChange={e => setClassLevel(e.target.value)} placeholder="VD: 10A1" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Trường</label>
                <input type="text" value={school} onChange={e => setSchool(e.target.value)} placeholder="VD: THPT Chuyên Lê Hồng Phong" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Môn học</label>
                  <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="VD: Toán" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Học kỳ</label>
                  <select value={semester} onChange={e => setSemester(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none">
                    <option value="Học kỳ 1">Học kỳ 1</option>
                    <option value="Học kỳ 2">Học kỳ 2</option>
                    <option value="Cả năm">Cả năm</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nội dung / Chủ đề</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="VD: Đạo hàm và ứng dụng" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Số câu hỏi</label>
                  <input type="number" value={numQuestions} onChange={e => setNumQuestions(e.target.value)} min="1" max="100" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Độ khó</label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none">
                    <option value="Dễ">Dễ</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Khó">Khó</option>
                    <option value="Nâng cao">Nâng cao</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ngôn ngữ</label>
                  <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none">
                    <option value="Tiếng Việt">Tiếng Việt</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Chế độ</label>
                  <select value={mode} onChange={e => setMode(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none">
                    <option value="Bài kiểm tra">Bài kiểm tra</option>
                    <option value="Phiếu học tập">Phiếu học tập</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dạng câu hỏi</label>
                <div className="flex flex-wrap gap-2">
                  {QUESTION_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleQuestionType(type)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        selectedTypes.includes(type) 
                          ? 'bg-indigo-100 border-indigo-300 text-indigo-700 dark:bg-indigo-900/40 dark:border-indigo-700 dark:text-indigo-300' 
                          : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tài liệu tham khảo (Tùy chọn)</label>
                <div 
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".txt,.md,.csv"
                  />
                  {file ? (
                    <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <FileText size={20} />
                      <span className="text-sm font-medium">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setFile(null); setFileContent(''); }}
                        className="p-1 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Upload size={24} />
                      <span className="text-sm">Tải lên file text (.txt, .md)</span>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isGenerating ? (
                  <><Loader2 size={18} className="animate-spin" /> Đang tạo đề thi...</>
                ) : (
                  <><FileText size={18} /> Tạo đề thi mới</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-8 overflow-hidden flex flex-col h-full" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          {examData ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-t-3xl">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsTakingExam(!isTakingExam)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <Play size={16} /> {isTakingExam ? 'Dừng làm bài' : 'Làm bài'}
                  </button>
                  <button 
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    {showAnswers ? <EyeOff size={16} /> : <Eye size={16} />} 
                    {showAnswers ? 'Ẩn đáp án' : 'Xem đáp án'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => generateDocx(false)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <Download size={16} /> Bản HS (Không ĐA)
                  </button>
                  <button 
                    onClick={() => generateDocx(true)}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <Download size={16} /> Bản GV (Có ĐA)
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto flex-1 font-serif text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 rounded-b-3xl">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold uppercase">{examData.school}</h2>
                  <h1 className="text-2xl font-bold uppercase mt-2">{examData.examName}</h1>
                  <p className="font-bold mt-2">{examData.subject}</p>
                  <p className="italic">{examData.time}</p>
                </div>

                <div className="space-y-8">
                  {examData.questions.map((q, i) => (
                    <div key={i} className="space-y-3">
                      <p className="font-bold">Câu {i + 1} <span className="text-sm font-normal text-slate-500">({q.type})</span>: <span className="font-normal">{q.questionText}</span></p>
                      
                      {/* Multiple Choice */}
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                          {q.options.map((opt, j) => {
                            const isCorrect = showAnswers && q.answerGuide.includes(opt.substring(0, 2));
                            return (
                              <div 
                                key={j} 
                                className={`p-2 rounded-lg transition-colors ${
                                  isCorrect 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium' 
                                    : isTakingExam ? 'hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer' : ''
                                }`}
                              >
                                {opt}
                                {isCorrect && <CheckCircle size={16} className="inline ml-2 text-green-500" />}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* True/False */}
                      {q.statements && q.statements.length > 0 && (
                        <div className="pl-4 space-y-2">
                          {q.statements.map((stmt, j) => (
                            <div key={j} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                              <span>{j + 1}. {stmt.text}</span>
                              {showAnswers ? (
                                <span className={`font-bold ${stmt.isTrue ? 'text-green-500' : 'text-red-500'}`}>
                                  {stmt.isTrue ? 'Đúng' : 'Sai'}
                                </span>
                              ) : isTakingExam ? (
                                <div className="flex gap-2">
                                  <button className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-100">Đ</button>
                                  <button className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-100">S</button>
                                </div>
                              ) : (
                                <span className="text-slate-400">(Đ/S)</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Matching */}
                      {q.matchingLeft && q.matchingRight && (
                        <div className="grid grid-cols-2 gap-4 pl-4">
                          <div className="space-y-2">
                            {q.matchingLeft.map((left, j) => (
                              <div key={j} className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700">{j + 1}. {left}</div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            {q.matchingRight.map((right, j) => (
                              <div key={j} className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700">{String.fromCharCode(65 + j)}. {right}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Essay / Short Answer Input */}
                      {!q.options && !q.statements && !q.matchingLeft && isTakingExam && !showAnswers && (
                        <textarea 
                          className="w-full h-24 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nhập câu trả lời của bạn..."
                        ></textarea>
                      )}

                      {/* Answer Guide */}
                      {showAnswers && (
                        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
                          <p className="font-bold text-amber-800 dark:text-amber-400 mb-1">Đáp án / Gợi ý:</p>
                          <p className="text-amber-900 dark:text-amber-200 whitespace-pre-wrap">{q.answerGuide}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <FileText size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Chưa có đề thi nào</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md">
                Điền thông tin vào form bên trái và nhấn "Tạo đề thi mới" để AI tự động soạn bài kiểm tra cho bạn.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
