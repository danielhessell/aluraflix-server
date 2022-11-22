FROM node:16.17.0-alpine3.16

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps
RUN npx prisma generate
RUN npx prisma migrate dev

RUN npm run dev:server
