# Cadastro e Lista de Recados

Sistema full-stack de recados pessoais, com autenticação, listagem e gerenciamento de recados.
Projeto desenvolvido para a disciplina de Desenvolvimento Web III (Fatec).

## Tecnologias

- **Frontend:** React (Create React App)
- **Backend:** Laravel 11 + Sanctum
- **Banco de dados:** MySQL 8

## Pré-requisitos

- Node.js v20+
- PHP 8.2+
- Composer 2
- MySQL 8 rodando localmente

## Como rodar o backend

```bash
cd backend
composer install
cp .env.example .env      # edite com suas credenciais MySQL, se necessário
php artisan key:generate
php artisan migrate
php artisan serve
```

O backend sobe em `http://localhost:8000`.

## Como rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

O frontend sobe em `http://localhost:3000`.

> Certifique-se de que o backend esteja rodando antes de usar o frontend, já que as
> chamadas de API apontam para `http://localhost:8000`.

## Funcionalidades

### Autenticação
- Cadastro de usuário (nome, e-mail e senha)
- Login com e-mail e senha
- Logout (invalida o token e redireciona para o login)
- Rotas protegidas: a página de recados só é acessível estando autenticado

### Recados
- Listagem dos recados do usuário logado
- Adicionar novo recado (título + texto)
- Excluir recado
- Lista atualizada automaticamente após adicionar/excluir, sem recarregar a página

## Endpoints da API

| Método | Rota              | Função                          | Protegida |
|--------|--------------------|----------------------------------|-----------|
| POST   | `/api/register`    | Criar nova conta                | Não       |
| POST   | `/api/login`        | Autenticar usuário              | Não       |
| POST   | `/api/logout`       | Encerrar sessão                 | Sim       |
| GET    | `/api/me`           | Dados do usuário logado         | Sim       |
| GET    | `/api/recados`      | Listar recados do usuário       | Sim       |
| POST   | `/api/recados`      | Criar novo recado               | Sim       |
| DELETE | `/api/recados/{id}` | Excluir um recado                | Sim       |

Rotas protegidas exigem o header `Authorization: Bearer {token}`, obtido no login/cadastro.

## Estrutura do repositório

```
recados/
├── frontend/   # projeto React
├── backend/    # projeto Laravel
└── README.md
```
