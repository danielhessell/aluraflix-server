FROM node:16.17.0-alpine3.16

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache bash curl && \
  curl https://raw.githubusercontent.com/eficode/wait-for/v2.1.3/wait-for --output /usr/bin/wait-for && \
  chmod +x /usr/bin/wait-for

FROM node:16.17.0-slim
