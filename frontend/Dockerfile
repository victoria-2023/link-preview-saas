# frontend/Dockerfile
FROM node:18

RUN npm install -g pnpm

WORKDIR /app

COPY .npmrc .npmrc
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "preview", "--host"]
