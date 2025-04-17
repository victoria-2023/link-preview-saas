# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
