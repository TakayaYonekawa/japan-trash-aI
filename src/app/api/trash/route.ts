import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address, trashType } = await req.json();

    if (!address || !trashType) {
      return NextResponse.json({ error: "住所とごみの種類を入力してください。" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI APIキーが設定されていません。" }, { status: 500 });
    }

    // 環境変数が読み込まれた後に初期化する
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const today = new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      timeZone: "Asia/Tokyo"
    });

    const prompt = `
あなたは日本全国のごみ出し案内アシスタントです。
ユーザーは以下の条件でごみを捨てようとしています。

- 住所: ${address}
- 捨てたいもの: ${trashType}
- 現在の日時: ${today}

あなたの持っている日本全国の各市区町村の収集ルールの知識に基づいて、以下の手順で論理的に推論し、指定されたJSON形式のみを出力してください（Markdownブロック記号(\`\`\`jsonなど)は含めないでください）。

1. まず、入力された住所から対象となる市区町村（自治体）を特定してください。
2. 特定した自治体の最新のルールに従い、「${trashType}」が何ごみ（「可燃ごみ」「不燃ごみ」「資源」「粗大ごみ」など）に分類されるか特定してください。
3. ユーザーの住所地域における、そのごみ分類の「収集曜日」を特定してください。詳細な地域分けがある場合は、一般的な知識から最もそれらしいものを推測してください。
4. 「現在の日時」から直近で次に該当する収集日（年月日と曜日）を計算してください。
   （粗大ごみの場合は、事前の申し込みが必要な旨を日付の代わりに案内してください）
5. 以下のJSONフォーマットに厳密に従ってください。

{
  "category": "可燃ごみ", 
  "nextDate": "3月25日(火)",
  "reasoning": "フライパンは最長辺が30cm未満なら不燃ごみです。該当地域の不燃ごみの収集は第1・第3木曜日のため、一番近いのは○月○日です。もし30cm以上なら粗大ごみになります。"
}
`;

    // ChatGPTのモデル (gpt-4o 等) を使用
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const resultText = response.choices[0].message.content;
    if (!resultText) {
      throw new Error("No response from OpenAI");
    }

    const result = JSON.parse(resultText);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: error.message || error.toString() || "Unknown error" }, { status: 500 });
  }
}
