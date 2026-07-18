-- Usa o banco de dados
USE db_AgendaProBeauty_api;

-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS tb_usuarios (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 senha_hash VARCHAR(128) NOT NULL,
 perfil VARCHAR(128) NOT NULL, 
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tb_areas (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 descricao VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_status_agendamento (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 descricao VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_profissionais (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 especialidade VARCHAR(60) NOT NULL,
 telefone VARCHAR(20) NOT NULL,
 ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS tb_horarios_bloqueados (
 id INT AUTO_INCREMENT PRIMARY KEY,
 profissional_id INT NOT NULL,
 FOREIGN KEY (profissional_id) REFERENCES tb_profissionais(id),
 inicio DATETIME NOT NULL,
 fim DATETIME NOT NULL,
 motivo VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_horarios_trabalho (
 id INT AUTO_INCREMENT PRIMARY KEY,
 profissional_id INT NOT NULL,
 FOREIGN KEY (profissional_id) REFERENCES tb_profissionais(id),
 dia_semana int NOT NULL,
 inicio TIME NOT NULL,
 fim TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_servicos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 area_id INT NOT NULL,
 FOREIGN KEY (area_id) REFERENCES tb_areas(id),
 nome VARCHAR(100) NOT NULL,
 duracao INT NOT NULL,
 preco decimal NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_agendamentos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NOT NULL,
 FOREIGN KEY (usuario_id) REFERENCES tb_usuarios(id),
 profissional_id INT NOT NULL,
 FOREIGN KEY (profissional_id) REFERENCES tb_profissionais(id),
 servico_id INT NOT NULL,
 FOREIGN KEY (servico_id) REFERENCES tb_servicos(id),
 status_id INT NOT NULL, 
 FOREIGN KEY (status_id) REFERENCES tb_status_agendamento(id),
 inicio DATETIME NOT NULL,
 fim DATETIME NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
