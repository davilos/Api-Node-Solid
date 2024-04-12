# [![Logo](https://skillicons.dev/icons?i=nodejs)](https://skillicons.dev) API REST Transactions

Esta API funciona como transações bancárias. Podendo criar uma transação, buscar todas as transações ou apenas uma, e um resumo contendo
a quantidade de dinheiro a qual foram usados nas transações. Utilizei cookies (com duração de 7 dias) para que o app pudesse indentificar o usuário.

## Como iniciar o projeto
```
# Dentro da pasta do projeto
npm install

# Executando as migrações para a criação de tabelas no DB
npx prisma migrate dev

# Iniciando o projeto
npm run start:dev
```

## Como rodar os testes
```
# Para rodar os testes E2E
npm run test:e2e

# Para rodar os testes unitários
npm run test
```

## Tecnologias usadas para a criação do projeto
- Node.js
- TypeScript
- Fastify
- Prisma
- Zod
- Vitest
- Supertest
- Tsup

# GymPass Style App

### RF - Requisitos Funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academia próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

### RN - Regras de Negócio

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer dois check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

### RNF - Requisitos Não Funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos no PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas em 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (Json Web Token);
