-- Usa o banco de dados
USE agenda_api_db;

-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 senha_hash VARCHAR(128) NOT NULL,
 perfil VARCHAR(128) NOT NULL, 
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS areas (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 descricao VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS status_agendamento (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 descricao VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS profissionais (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 especialidade VARCHAR(60) NOT NULL,
 telefone VARCHAR(20) NOT NULL,
 ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS horarios_bloqueados (
 id INT AUTO_INCREMENT PRIMARY KEY,
 profissional_id INT NOT NULL,
 FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
 inicio DATETIME NOT NULL,
 fim DATETIME NOT NULL,
 motivo VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS horarios_trabalho (
 id INT AUTO_INCREMENT PRIMARY KEY,
 profissional_id INT NOT NULL,
 FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
 dia_semana int NOT NULL,
 inicio DATETIME NOT NULL,
 fim DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS servicos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 area_id INT NOT NULL,
 FOREIGN KEY (area_id) REFERENCES areas(id),
 nome VARCHAR(100) NOT NULL,
 duracao INT NOT NULL,
 preco decimal NOT NULL
);

CREATE TABLE IF NOT EXISTS agendamentos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NOT NULL,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
 profissional_id INT NOT NULL,
 FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
 servico_id INT NOT NULL,
 FOREIGN KEY (servico_id) REFERENCES servicos(id),
 status_id INT NOT NULL, 
 FOREIGN KEY (status_id) REFERENCES status_agendamento(id),
 inicio DATETIME NOT NULL,
 fim DATETIME NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
