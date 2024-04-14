# [![Logo](https://skillicons.dev/icons?i=nodejs)](https://skillicons.dev) GymPass Style API

Esta API funciona como uma aplicação que realiza check-ins em academias. O usuário pode fazer check-in em uma academia, buscar academias próximas, e um resumo contendo a contagem de todos os check-ins dele. Também existe a entidade academia que pode validar check-ins dos usuários. A autenticação de usuários funciona com o JWT, contendo 2 tokens, o primeiro com duração de 10 minutos, e o segundo com duração de 7 dias. Caso o de 7 dias acabe, o usuário será automaticamente deslogado da conta. 

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
