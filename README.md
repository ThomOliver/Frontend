# Frontend Chat – React + Vite + TailwindCSS + Socket.IO

Frontend de um chat em tempo real desenvolvido com **React**, **Vite**, **TypeScript**, **TailwindCSS** e **Socket.IO**. Cada aba do navegador representa um usuário diferente, permitindo troca de mensagens em tempo real.

---

## Stack

- React
- Vite
- TypeScript
- TailwindCSS
- Zustand
- Socket.IO Client
- Docker + Nginx

---

## Estrutura do Projeto

```
src/
 ├── components/          # Componentes do chat e UI
 │   ├── ui/              # Componentes base (button, input, card)
 ├── pages/               # Páginas (Login, Chat)
 ├── services/            # Conexão com Socket.IO
 ├── store/               # Estado global (Zustand)
 ├── types/               # Tipagens TypeScript
 ├── App.tsx
 └── main.tsx
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

> A variável deve apontar para o backend NestJS.

---

## ▶Rodando localmente

### Pré-requisitos

- Node.js **>= 20**
- npm **>= 9**

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar em modo desenvolvimento

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

### 3. Build e preview local

```bash
npm run build
```

---

## Rodando com Docker

O projeto utiliza **multi-stage build** com **Node.js** e **Nginx**.

### Dockerfile

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

### Build da imagem

```bash
docker build -t chat-frontend .
```

### Rodar container

```bash
docker run -p 80:80 chat-frontend
```

Aplicação disponível em:

```
http://localhost
```

---

## Rodando com Docker Compose

```bash
docker-compose up --build
```

Rodar em segundo plano:

```bash
docker-compose up -d --build
```

Parar containers:

```bash
docker-compose down
```

---

## WebSocket

A comunicação em tempo real é feita via **Socket.IO**.

Arquivo de conexão:

```
src/services/socket.ts
```

### Eventos principais

- `join-room`
- `send-message`
- `receive-message`

---

## Testes

```bash
npm run test
```

---

## Scripts principais

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```

---

## Autor

**Thomas Oliveira**
