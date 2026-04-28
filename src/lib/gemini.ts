import { GoogleGenAI, Type, Schema } from "@google/genai";

// Initialize the SDK. We assume process.env.GEMINI_API_KEY is available in the environment.
// "Always use process.env.GEMINI_API_KEY for the Gemini API. This is the only way to access the Gemini API key."

const apiKey = process.env.GEMINI_API_KEY || 'dummy_key_to_prevent_crash';

const ai = new GoogleGenAI({ apiKey });

export async function generateFlashcards(
  subject: string,
  className: string,
  topic: string,
  count: number,
  fileBase64?: string,
  mimeType?: string
) {
  const prompt = `Bạn là chuyên gia tạo flashcard học tập thông minh.
Nhiệm vụ: Tạo bộ flashcard giúp học sinh học nhanh và nhớ lâu.

Thông tin:
- Môn học: ${subject}
- Lớp: ${className}
- Nội dung: ${topic}
- Số lượng thẻ: ${count}

Yêu cầu:
- Ngắn gọn, dễ nhớ, đúng kiến thức.
- Độ khó tăng dần: easy -> medium -> hard.
- Trả về đúng định dạng JSON array.
${fileBase64 ? '- Trích xuất nội dung từ tài liệu đính kèm để tạo flashcard.' : ''}`;

  const parts: any[] = [{ text: prompt }];

  if (fileBase64 && mimeType) {
    parts.push({
      inlineData: {
        data: fileBase64,
        mimeType: mimeType,
      },
    });
  }

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        front: {
          type: Type.STRING,
          description: "Câu hỏi hoặc từ khóa (Mặt trước)",
        },
        back: {
          type: Type.STRING,
          description: "Đáp án ngắn gọn (Mặt sau)",
        },
        explain: {
          type: Type.STRING,
          description: "Giải thích ngắn gọn, dễ hiểu",
        },
        level: {
          type: Type.STRING,
          description: "Độ khó: easy, medium, hoặc hard",
        },
      },
      required: ["front", "back", "explain", "level"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (response.text) {
      const cards = JSON.parse(response.text);
      return cards.map((card: any) => ({
        ...card,
        id: crypto.randomUUID(),
        status: 'new',
      }));
    }
    return [];
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw error;
  }
}
