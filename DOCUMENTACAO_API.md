# Documentação da API

## Informações gerais

- **Base URL:** `http://localhost:3000`
- **Formato:** JSON, exceto `GET /public/home`, que retorna texto.
- **Autenticação:** endpoints protegidos usam `Authorization: Bearer <token>`.
- **Perfil:** endpoints administrativos exigem token com perfil `administrador`.

Respostas comuns de autenticação:

```json
{ "error": "Unauthorized" }
```

- `401`: token ausente.
- `403`: token inválido ou perfil sem permissão.

## Rotas do servidor e públicas

### `GET /`

Verifica se a API está funcionando. Não possui parâmetros nem autenticação.

Resposta `200`:

```json
{ "message": "Agenda funcionando!" }
```

### `GET /public/home`

Rota pública, sem parâmetros e sem autenticação.

Resposta `200`:

```text
Bem-vindo à API pública!
```

## Autenticação

### `POST /auth/register`

Registra um usuário. Não possui autenticação.

Corpo:

```json
{
  "nome": "Mariana Silva",
  "email": "mariana@email.com",
  "senha_hash": "senha123",
  "perfil": "cliente"
}
```

Resposta `201`:

```json
{
  "message": "Usuário registrado com sucesso.",
  "id": 4
}
```

Resposta `409` quando o e-mail já estiver cadastrado:

```json
{ "message": "E-mail já cadastrado." }
```

### `POST /auth/login`

Autentica um usuário. Não possui autenticação.

Corpo:

```json
{
  "email": "roberto.admin@email.com",
  "senha_hash": "senha123"
}
```

Resposta `200`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "nome": "Roberto Almeida",
    "email": "roberto.admin@email.com",
    "perfil": "administrador"
  }
}
```

Resposta `401`:

```json
{ "message": "Senha inválida." }
```

## Rotas protegidas

Todas exigem `Authorization: Bearer <token>`.

### `GET /protected/dashboard`

Não possui parâmetros.

Resposta `200`:

```json
{ "message": "Bem-vindo ao painel, Roberto Almeida" }
```

### `GET /protected/admin`

Exige perfil `administrador` e não possui parâmetros.

Resposta `200`:

```json
{ "message": "Bem-vindo à área admin, Roberto Almeida" }
```

## Usuários

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /users`

Lista todos os usuários. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "nome": "Mariana Silva",
    "email": "mariana.cliente@email.com",
    "senha_hash": "...",
    "perfil": "cliente",
    "created_at": "2026-06-16T12:00:00.000Z"
  }
]
```

### `POST /users`

Cria um usuário. Não possui parâmetros de rota.

Corpo:

```json
{
  "nome": "Camila Rodrigues",
  "email": "camila@email.com",
  "senha_hash": "senha123",
  "perfil": "cliente"
}
```

Resposta `201`:

```json
{ "message": "Usuário criado com sucesso.", "id": 5 }
```

### `PUT /users/:id`

Atualiza o usuário indicado por `id`.

Parâmetro: `id` (inteiro).

Corpo:

```json
{
  "nome": "Camila Rodrigues Atualizada",
  "email": "camila.nova@email.com",
  "senha_hash": "senha456",
  "perfil": "cliente"
}
```

Resposta `200`:

```json
{ "message": "Usuário atualizado com sucesso." }
```

### `DELETE /users/:id`

Remove o usuário indicado por `id` (inteiro).

Resposta `200`:

```json
{ "message": "Usuário deletado com sucesso." }
```

## Áreas

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /areas`

Lista todas as áreas. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "nome": "Cabelo",
    "descricao": "Cortes, coloração, escovas e tratamentos capilares."
  }
]
```

### `POST /areas`

Cria uma área.

Corpo:

```json
{
  "nome": "Cabelo",
  "descricao": "Cortes e tratamentos capilares."
}
```

Resposta `201`:

```json
{ "message": "Área criada com sucesso.", "id": 4 }
```

### `PUT /areas/:id`

Atualiza uma área. Parâmetro: `id` (inteiro).

Corpo:

```json
{
  "nome": "Cabelo e Colorimetria",
  "descricao": "Serviços capilares completos."
}
```

Resposta `200`:

```json
{ "message": "Área atualizada com sucesso." }
```

### `DELETE /areas/:id`

Remove uma área. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{ "message": "Área deletada com sucesso." }
```

## Profissionais

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /profissionais`

Lista todos os profissionais. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "nome": "Marcos Oliver",
    "especialidade": "Hair Stylist / Colorista",
    "telefone": "(51) 98888-1111",
    "ativo": 1
  }
]
```

### `POST /profissionais`

Cria um profissional.

Corpo:

```json
{
  "nome": "Marcos Oliver",
  "especialidade": "Hair Stylist / Colorista",
  "telefone": "(51) 98888-1111",
  "ativo": true
}
```

Resposta `201`:

```json
{ "message": "Profissional criado com sucesso.", "id": 4 }
```

### `PUT /profissionais/:id`

Atualiza um profissional. Parâmetro: `id` (inteiro).

Corpo:

```json
{
  "nome": "Marcos Oliver Atualizado",
  "especialidade": "Colorista",
  "telefone": "(51) 99999-1111",
  "ativo": true
}
```

Resposta `200`:

```json
{ "message": "Profissional atualizado com sucesso." }
```

### `DELETE /profissionais/:id`

Remove um profissional. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{ "message": "Profissional deletado com sucesso." }
```

## Serviços

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /servicos`

Lista todos os serviços. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "area_id": 1,
    "nome": "Corte Feminino + Escova",
    "duracao": 60,
    "preco": "150.00"
  }
]
```

### `GET /servicos/area/:area_id`

Lista serviços vinculados à área informada.

Parâmetro: `area_id` (inteiro).

Resposta `200`:

```json
[
  {
    "id": 1,
    "area_id": 1,
    "nome": "Corte Feminino + Escova",
    "duracao": 60,
    "preco": "150.00"
  }
]
```

### `POST /servicos`

Cria um serviço.

Corpo:

```json
{
  "area_id": 1,
  "nome": "Corte Feminino + Escova",
  "duracao": 60,
  "preco": 150.00
}
```

Resposta `201`:

```json
{ "message": "Serviço criado com sucesso.", "id": 7 }
```

### `PUT /servicos/:id`

Atualiza um serviço. Parâmetro: `id` (inteiro).

Corpo:

```json
{
  "area_id": 1,
  "nome": "Corte Feminino",
  "duracao": 45,
  "preco": 120.00
}
```

Resposta `200`:

```json
{ "message": "Serviço atualizado com sucesso." }
```

### `DELETE /servicos/:id`

Remove um serviço. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{ "message": "Serviço deletado com sucesso." }
```

## Horários de trabalho

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /horarios_trabalho`

Lista os horários de trabalho. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "profissional_id": 1,
    "dia_semana": 2,
    "hora_inicio": "09:00:00",
    "hora_fim": "18:00:00"
  }
]
```

### `POST /horarios_trabalho`

Cria um horário de trabalho.

Corpo:

```json
{
  "profissional_id": 1,
  "dia_semana": 2,
  "hora_inicio": "09:00:00",
  "hora_fim": "18:00:00"
}
```

Resposta `201`:

```json
{
  "message": "Horário de trabalho criado com sucesso.",
  "horario": 4
}
```

### `PUT /horarios_trabalho/:id`

Atualiza um horário. Parâmetro: `id` (inteiro).

Corpo: os campos `profissional_id`, `dia_semana`, `hora_inicio` e `hora_fim`.

Resposta `200`:

```json
{
  "message": "Horário de trabalho atualizado com sucesso.",
  "horario": {
    "id": 1,
    "profissional_id": 1,
    "dia_semana": 2,
    "hora_inicio": "10:00:00",
    "hora_fim": "19:00:00"
  }
}
```

### `DELETE /horarios_trabalho/:id`

Remove um horário. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{ "message": "Horário de trabalho deletado com sucesso." }
```

## Horários bloqueados

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /horarios_bloqueados`

Lista os bloqueios. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "profissional_id": 1,
    "inicio": "2026-06-16T12:00:00.000Z",
    "fim": "2026-06-16T13:00:00.000Z",
    "motivo": "Horário de almoço"
  }
]
```

### `POST /horarios_bloqueados`

Cria um bloqueio.

Corpo:

```json
{
  "profissional_id": 1,
  "inicio": "2026-06-16 12:00:00",
  "fim": "2026-06-16 13:00:00",
  "motivo": "Horário de almoço"
}
```

Resposta `201`:

```json
{
  "message": "Horário bloqueado criado com sucesso.",
  "horario": 2
}
```

### `PUT /horarios_bloqueados/:id`

Atualiza um bloqueio. Parâmetro: `id` (inteiro).

Corpo: `profissional_id`, `inicio`, `fim` e `motivo`.

Resposta `200`:

```json
{
  "message": "Horário bloqueado atualizado com sucesso.",
  "horario": {
    "id": 1,
    "profissional_id": 1,
    "inicio": "2026-06-16T14:00:00.000Z",
    "fim": "2026-06-16T15:00:00.000Z",
    "motivo": "Reunião"
  }
}
```

### `DELETE /horarios_bloqueados/:id`

Remove um bloqueio. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{ "message": "Horário bloqueado deletado com sucesso." }
```

## Status de agendamento

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /status_agendamento`

Lista todos os status. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "nome": "Pendente",
    "descricao": "Aguardando confirmação."
  }
]
```

### `GET /status_agendamento/:id`

Consulta um status. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{
  "id": 1,
  "nome": "Pendente",
  "descricao": "Aguardando confirmação."
}
```

### `POST /status_agendamento`

Cria um status.

Corpo:

```json
{
  "nome": "Pendente",
  "descricao": "Aguardando confirmação."
}
```

Resposta `201`:

```json
{ "message": "Status de agendamento criado com sucesso.", "id": 5 }
```

### `PUT /status_agendamento/:id`

Atualiza um status. Parâmetro: `id` (inteiro).

Corpo: `nome` e `descricao`.

Resposta `200`:

```json
{ "message": "Status de agendamento atualizado com sucesso." }
```

### `DELETE /status_agendamento/:id`

Remove um status. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{ "message": "Status de agendamento deletado com sucesso." }
```

## Agendamentos

Com exceção de `GET /agendamentos/disponibilidade`, todas as rotas exigem autenticação e perfil `administrador`.

### `GET /agendamentos`

Lista todos os agendamentos. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "id": 1,
    "usuario_id": 1,
    "profissional_id": 1,
    "servico_id": 2,
    "status_id": 2,
    "inicio": "2026-06-16T09:00:00.000Z",
    "fim": "2026-06-16T12:00:00.000Z",
    "created_at": "2026-06-15T18:00:00.000Z"
  }
]
```

### `GET /agendamentos/usuario/:id`

Lista agendamentos de um usuário. Parâmetro: `id` (identificador do usuário).

Resposta `200`: array de agendamentos, como no exemplo anterior.

### `GET /agendamentos/profissional/:id`

Lista agendamentos de um profissional. Parâmetro: `id` (identificador do profissional).

Resposta `200`: array de agendamentos, como no exemplo anterior.

### `GET /agendamentos/status/:id`

Lista agendamentos com o status informado. Parâmetro: `id` (identificador do status).

Resposta `200`: array de agendamentos, como no exemplo anterior.

### `GET /agendamentos/usuario/:id/status/:statusId`

Filtra por usuário e status.

Parâmetros: `id` (usuário) e `statusId` (status).

Resposta `200`: array de agendamentos, como no exemplo anterior.

### `GET /agendamentos/profissional/:id/status/:statusId`

Filtra por profissional e status.

Parâmetros: `id` (profissional) e `statusId` (status).

Resposta `200`: array de agendamentos, como no exemplo anterior.

### `POST /agendamentos`

Cria um agendamento. O início e o fim devem estar no formato `YYYY-MM-DD HH:mm:ss`, no mesmo dia, com o fim posterior ao início.

Corpo:

```json
{
  "usuario_id": 1,
  "profissional_id": 1,
  "servico_id": 2,
  "status_id": 1,
  "data_hora_inicio": "2026-08-06 16:30:00",
  "data_hora_fim": "2026-08-06 17:00:00"
}
```

Resposta `201`:

```json
{ "message": "Agendamento criado com sucesso.", "id": 15 }
```

### `PUT /agendamentos/:id`

Atualiza, cancela ou reagenda um agendamento. Parâmetro: `id` (identificador do agendamento).

Corpo de exemplo:

```json
{
  "usuario_id": 1,
  "profissional_id": 1,
  "servico_id": 2,
  "status_id": 2,
  "data_hora_inicio": "2026-09-01 13:00:00",
  "data_hora_fim": "2026-09-01 13:30:00"
}
```

Resposta `200` em atualização:

```json
{ "message": "Agendamento atualizado com sucesso." }
```

Resposta `400` quando houver conflito ou regra inválida:

```json
{ "error": "Horário indisponível: já existe outro agendamento nesse período para este profissional." }
```

### `DELETE /agendamentos/:id`

Remove um agendamento. Parâmetro: `id` (inteiro).

Resposta `200`:

```json
{ "message": "Agendamento deletado com sucesso." }
```

### `GET /agendamentos/disponibilidade?profissional_id=1&data=2026-07-10`

Consulta horários disponíveis. Rota pública, sem autenticação.

Parâmetros de consulta obrigatórios:

- `profissional_id`: identificador do profissional.
- `data`: data no formato `YYYY-MM-DD`.

Resposta `200`:

```json
[
  "09:00",
  "09:30",
  "10:00",
  "15:00"
]
```

Resposta `400` se faltar parâmetro:

```json
{ "error": "Os parâmetros profissional_id e data são obrigatórios." }
```

## Relatórios

Todas as rotas exigem autenticação e perfil `administrador`.

### `GET /relatorios`

Retorna os três relatórios em uma única resposta. Não possui parâmetros.

Resposta `200`:

```json
{
  "totalAgendamentos": 10,
  "servicosMaisSolicitados": [
    {
      "servico_id": 2,
      "nome": "Mechas / Luzes",
      "totalSolicitacoes": 5
    }
  ],
  "profissionaisMaisRequisitados": [
    {
      "profissional_id": 1,
      "nome": "Marcos Oliver",
      "totalSolicitacoes": 6
    }
  ]
}
```

### `GET /relatorios/totalAgendamentos`

Retorna apenas o total de agendamentos. Não possui parâmetros.

Resposta `200`:

```json
{ "totalAgendamentos": 10 }
```

### `GET /relatorios/servicosMaisSolicitados`

Retorna os serviços ordenados pela quantidade de solicitações, da maior para a menor. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "servico_id": 2,
    "nome": "Mechas / Luzes",
    "totalSolicitacoes": 5
  },
  {
    "servico_id": 1,
    "nome": "Corte Feminino + Escova",
    "totalSolicitacoes": 3
  }
]
```

### `GET /relatorios/profissionaisMaisRequisitados`

Retorna os profissionais ordenados pela quantidade de agendamentos, da maior para a menor. Não possui parâmetros.

Resposta `200`:

```json
[
  {
    "profissional_id": 1,
    "nome": "Marcos Oliver",
    "totalSolicitacoes": 6
  },
  {
    "profissional_id": 3,
    "nome": "Juliana Prado",
    "totalSolicitacoes": 4
  }
]
```

## Erros gerais

A maioria das rotas protegidas retorna erros no formato abaixo:

```json
{ "error": "Mensagem descrevendo o problema." }
```

Códigos mais usados:

- `200`: consulta, atualização ou exclusão realizada.
- `201`: recurso criado.
- `400`: dados inválidos ou recurso não encontrado.
- `401`: autenticação ausente ou credenciais inválidas.
- `403`: token inválido ou acesso não autorizado.
- `409`: conflito, como cadastro duplicado.
- `500`: erro interno do servidor.
