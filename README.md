## Aluraflix back-end
![Badge](https://img.shields.io/static/v1?label=DH&message=DOSOMETHINGGREAT&color=0070f3&style=<0070f3>&logo=rocket)

### Projeto

Aluraflix é uma aplicação desenvolvida na Edição #2 da Alura Challenges, que consiste em permitir que usuários possam montar playlists com links apra seus vídeos preferidos, separados por categoria.

Edição #2 da Alura Challenges: Desenvolver uma API Rest do zero, escolhendo as linguagens e tecnologias, um desafio de 4 semanas para implementar um sitema desde a base de dados até os testes e o deploy, com suporte de especialistas via Discord.

### Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [JSON Web Tokens](https://jwt.io/)
- [TSyringe](https://www.npmjs.com/package/tsyringe)
- [Celebrate](https://www.npmjs.com/package/celebrate)

### Padrões de Código

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

### Requisitos básicos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- [Git](https://git-scm.com)

O projeto pode ser construído com npm ou yarn, então escolha uma das abordagens abaixo caso você não tenha nenhum instalado em seu sistema.

O Npm é distribuído com o Node.js, o que significa que quando você faz o download do Node.js, o npm é instalado automaticamente no seu computador
- [Node.js v14.16.0](https://nodejs.org/) ou maior.

Yarn é um gerenciador de pacotes criado pela equipe do Facebook e parece ser mais rápido do que o npm em geral.
- [Yarn v1.22.5](https://yarnpkg.com/) ou maior.

Além disso, é bom ter um editor para trabalhar com o código, como [VSCode](https://code.visualstudio.com/).

### :information_source: Como executar

Siga as instruções abaixo para baixar e usar o projeto deste repositório:

```bash
# Clone este repositório usando SSH
$ git clone git@github.com:daniel21h/aluraflix-server.git
# ou clone usando https
$ git clone https://github.com/daniel21h/aluraflix-server.git

# Vá para o repositório
$ cd aluraflix-server

# Instale as dependências
$ yarn

# Executar migrações do banco
$ yarn prisma migrate dev

# Executar projeto
$ yarn dev:server
```

---

Made with :blue_heart: by Daniel Hessel :wave:
