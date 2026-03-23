# Japan Trash AI

ゴミの分別と収集日をAIで検索できるアプリケーションです。

## 本番リンク
[https://japan-trash-a-i.vercel.app/](https://japan-trash-a-i.vercel.app/)

## 環境構築
このプロジェクトは以下の技術スタックで構築されています。

### 使用技術・API
- **Frontend**: [Next.js](https://nextjs.org/) (React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Sass (SCSS)](https://sass-lang.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI API**: [OpenAI API](https://openai.com/api/)

### 必要なもの
- Node.js (v18以降)
- npm

### インストール
```bash
npm install
```

## .envの書き方
プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を設定してください。
※ `env` の中身を直接編集しないでください。

```bash
OPENAI_API_KEY=あなたのOpenAI_API_キー
```

## 立ち上げ方
ローカル開発サーバーを起動します。

```bash
npm run dev
```

起動後、ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

