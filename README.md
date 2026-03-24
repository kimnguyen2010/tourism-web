# Tourism Chatbot

Du an mau gom:

- `client`: React + Vite giao dien chat
- `server`: Express + Apollo GraphQL + Gemini API

## Chay du an

1. Kich hoat `pnpm` qua Corepack:

```powershell
corepack enable
corepack prepare pnpm@10.18.3 --activate
```

2. Cai dependency:

```powershell
corepack pnpm install
```

3. Tao file moi truong cho backend:

```powershell
Copy-Item server/.env.example server/.env
```

4. Dien `GEMINI_API_KEY` vao `server/.env`

5. Neu can doi URL GraphQL cho frontend thi tao file:

```powershell
Copy-Item client/.env.example client/.env
```

6. Chay development:

```powershell
corepack pnpm dev
```

Frontend: `http://localhost:5173`

Backend GraphQL: `http://localhost:4000/graphql`

## GraphQL

Schema co:

- Query `health`
- Mutation `sendChat(message, history)`

Frontend goi mutation `sendChat` de gui cau hoi cho Gemini.
