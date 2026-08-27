# Agenda Pro Beauty API

API para gerenciamento de usuarios, profissionais, servicos, horarios e agendamentos.

## Requisitos

- Node.js 18 ou superior
- npm
- MySQL 8 ou superior

## Instalacao

1. Clone ou baixe este repositorio.
2. Entre na pasta do projeto:

```bash
cd PIdaAgenda
```

3. Instale as dependencias:

```bash
npm install
```

## Variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto. Use o arquivo `.env.example` como modelo:

```bash
copy .env.example .env
```

No Linux ou macOS, use:

```bash
cp .env.example .env
```

Preencha o `.env` com os dados da sua maquina:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_DATABASE=db_AgendaProBeauty_api
BASE=http://localhost:3000
PORT=3000
JWT_SECRET=uma_chave_secreta_forte
```

### Descricao das variaveis

| Variavel | Descricao | Exemplo |
| --- | --- | --- |
| `DB_HOST` | Endereco do servidor MySQL | `localhost` |
| `DB_USER` | Usuario do MySQL | `root` |
| `DB_PASSWORD` | Senha do usuario do MySQL | `sua_senha_mysql` |
| `DB_DATABASE` | Banco usado pela API | `db_AgendaProBeauty_api` |
| `BASE` | URL base exibida pelo servidor | `http://localhost:3000` |
| `PORT` | Porta da API | `3000` |
| `JWT_SECRET` | Chave usada para assinar os tokens JWT | `uma_chave_secreta_forte` |

Nao compartilhe o arquivo `.env` nem a chave `JWT_SECRET`.

## Configuracao do banco de dados

Execute os scripts SQL na ordem abaixo usando o MySQL:

```bash
mysql -u root -p < src/database/create_database.sql
mysql -u root -p db_AgendaProBeauty_api < src/database/create_tables.sql
mysql -u root -p db_AgendaProBeauty_api < src/database/seed_data.sql
```

Os scripts criam o banco, as tabelas e dados iniciais para testes.

Tambem e possivel abrir os arquivos da pasta `src/database` no MySQL Workbench e executa-los na mesma ordem.

## Como rodar

### Modo normal

```bash
npm start
```

### Modo desenvolvimento

O modo desenvolvimento reinicia o servidor automaticamente quando os arquivos sao alterados:

```bash
npm run dev
```

Quando iniciar corretamente, a API estara disponivel em:

```text
http://localhost:3000
```

O valor da porta depende da variavel `PORT` definida no `.env`.

## Teste rapido

Verifique se o servidor esta funcionando:

```http
GET http://localhost:3000/
```

Resposta esperada:

```json
{
	"message": "Agenda funcionando!"
}
```

Os demais exemplos de requisicoes estao na pasta `src/tests`, em arquivos `.rest` que podem ser executados pela extensao REST Client do VS Code.

## Documentacao dos endpoints

Consulte [DOCUMENTACAO_API.md](DOCUMENTACAO_API.md) para ver todas as rotas, metodos, parametros, autenticacao, corpos de requisicao e exemplos de resposta.

## Scripts disponiveis

| Comando | Funcao |
| --- | --- |
| `npm install` | Instala as dependencias |
| `npm start` | Inicia a API |
| `npm run dev` | Inicia a API com reinicio automatico |

