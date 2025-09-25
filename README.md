# AI Product Designer

A Next.js app that helps you ideate product designs via a chat with Google Gemini. Each assistant reply includes guidance and a generated image of the concept.

## Prerequisites

- Node.js 18+ (recommended 20+)
- Package manager: pnpm (recommended) or npm

## 1) Install dependencies

```bash
pnpm install
# or
npm install
```

## 2) Add your Google Gemini API key

Create a `.env.local` file in the project root and add:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

You can obtain the API key in two ways:

### Option A — Google AI Studio
1. Go to `https://aistudio.google.com/app/apikey`.
2. Create an API key and copy it.
3. Paste it into `.env.local` as shown above.

### Option B — Google Cloud (this is the one that worked for me)
1. Go to `https://console.cloud.google.com/` and select or create a project.
2. In “APIs & Services”, enable the “Gemini API” (or Generative Language API where applicable).
3. Go to “Credentials” → “Create credentials” → “API key”.
4. Copy the key and paste it into `.env.local`.

Note: You may need to enable billing and ensure the Gemini API is available in your region.

## 3) Run the dev server

```bash
pnpm dev
# or
npm run dev
```

Open `http://localhost:3000` in your browser.

## How to use

1. Type your product idea/prompt in the input box.
2. Press Enter or click the send button.
3. You’ll see a loader while the assistant generates text; the product image then loads shortly after.
4. Continue the conversation to iterate on the design.
