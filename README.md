# 📦 Venda de Garagem - Backend

 ## 🎯 Objetivo
Criar um aplicativo com **TypeScript** que permita a venda de **qualquer tipo de item usado** de forma fácil e acessível. Os usuários poderão **listar produtos**, **entrar em contato com os vendedores**, **comentar** e **avaliar** os vendedores e compradores.


## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Joi](https://joi.dev/)
- [Nodemailer](https://nodemailer.com/)
- [Twilio](https://www.twilio.com/)
- [Yarn](https://yarnpkg.com/)
- [Eslint](https://eslint.org/)


# ✅ Funcionalidades - Backend Venda de Garagem

## 🔐 Autenticação e Gerenciamento de Usuários

- **Cadastro de Usuário** (`POST user/create`): Criação de conta com dados como nome, e-mail, senha e tipo de usuário.
- **Login** (`POST user/login`): Retorna token JWT para autenticação.
- **Recuperação de Senha**:
  - `POST user/requestPasswordReset`: Solicita redefinição via e-mail/SMS.
  - `POST user/verifyResetToken`: Verifica validade do token de redefinição.
  - `POST user/resetPassword`: Redefine a senha.
- **Listar Usuários** (`GET user/getUsers`): Lista todos os usuários.
- **Buscar por E-mail** (`GET user/getUserByEmail?email=`): Retorna usuário correspondente.

---

## 🛒 Gerenciamento de Produtos (CRUD)

- **Criar Produto** (`POST /products/create`): Somente usuários autenticados (via middleware `validateToken`).
- **Listar Todos os Produtos** (`GET /products/getProductAll`): Acesso público, com suporte a filtros via query params.
- **Listar Produtos por Usuário** (`GET /products/getByUser`): Produtos cadastrados pelo usuário autenticado ou usuário admin.
- **Atualizar Produto** (`PUT /products/updateproduct/:id`): Edição restrita ao dono do produto ou usuário admin.
- **Excluir Produto** (`DELETE /products/deleteProduct/:id`): Exclusão protegida por autenticação ou por usuário admin.

---

## ✅ Middleware

- **Token JWT**: Middleware `validateToken` protege as rotas privadas.
- **Controle de acesso**: Somente usuários autenticados ou administradores podem criar, editar ou deletar produtos.

---

## ✉️ Funcionalidades Complementares

- **Envio de E-mails/SMS**: Presentes no backend (`utils/email.ts`, `utils/sms.ts`) para notificação e recuperação de senha.
- **Validação de Tipos**: Tipagens definidas com TypeScript para segurança dos dados.

---


## ⚙️ Configuração

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/VendaDeGaragem-server.git
cd VendaDeGaragem-server
```

2. **Instale as dependências:**

```bash
yarn
ou
npm install
```
3. **Gerar o cliente Prisma**
```bash
yarn prisma
ou
npm run prisma
```

4. **Configure o `.env`:**

Crie um arquivo `.env` na raiz com as variáveis necessárias (exemplo: banco de dados, JWT, email).

5. **Execute as migrações e o seed (opcional):**

```bash
yarn migrate
yarn seed
```

6. **Inicie o servidor:**

```bash
yarn dev
ou
npm run dev
```

---

## 📬 Contato

Desenvolvido por **Bryan Botelho** e **Adelino Júnior**

[LinkedIn](https://www.linkedin.com/in/bryan-botelho)  
[GitHub](https://github.com/bryanbotelho)

