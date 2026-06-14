
-- Inserção de dados fictícios
USE agenda_api_db;

-- ÁREAS DO SALÃO
INSERT INTO areas (nome, descricao) VALUES 
('Cabelo', 'Cortes, coloração, escovas e tratamentos capilares.'),
('Estética Facial & Corporal', 'Limpeza de pele, massagens, drenagem e procedimentos estéticos.'),
('Manicure & Pedicure', 'Cuidados com as unhas das mãos e pés, alongamentos e esmaltação.');

-- STATUS DE AGENDAMENTO
INSERT INTO status_agendamento (nome, descricao) VALUES 
('Pendente', 'Aguardando confirmação do salão ou do cliente.'),
('Confirmado', 'Horário reservado e confirmado com o profissional.'),
('Cancelado', 'Agendamento cancelado pelo cliente ou pelo estabelecimento.'),
('Concluído', 'Atendimento realizado e finalizado.');

-- PROFISSIONAIS
INSERT INTO profissionais (nome, especialidade, telefone, ativo) VALUES 
('Marcos Oliver', 'Hair Stylist / Colorista', '(51) 98888-1111', TRUE),
('Beatriz Souza', 'Esteticista Avançada', '(51) 98888-2222', TRUE),
('Juliana Prado', 'Designer de Unhas / Manicure', '(51) 98888-3333', TRUE);

-- SERVIÇOS, Vinculados às suas respectivas áreas
-- id 1 Área= Cabelo
-- id 2 Área= Estética
-- id 3 Área= Manicure
INSERT INTO servicos (area_id, nome, duracao, preco) VALUES 
(1, 'Corte Feminino + Escova', 60, 150.00),
(1, 'Mechas / Luzes', 180, 450.00),
(2, 'Limpeza de Pele Profunda', 90, 130.00),
(2, 'Massagem Relaxante', 60, 110.00),
(3, 'Pé e Mão Simples', 60, 70.00),
(3, 'Alongamento em Gel', 120, 180.00);

-- Tipos de usuarios "Cliente" ou "Administrador".
INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES 
('Mariana Silva', 'mariana.cliente@email.com', '$2b$10$e0MYzX...', 'cliente'),
('Camila Rodrigues', 'camila.cliente@email.com', '$2b$10$e0MYzX...', 'cliente'),
('Roberto Almeida', 'roberto.admin@email.com', '$2b$10$e0MYzX...', 'administrador');

-- HORÁRIOS DE TRABALHO PADRÃO DE SEG A SEX!
-- Dia da semana 1 = Seg, ... 5 = Sex. 
INSERT INTO horarios_trabalho (profissional_id, dia_semana, inicio, fim) VALUES 
(1, 2, '2026-06-16 09:00:00', '2026-06-16 18:00:00'),
(2, 2, '2026-06-16 09:00:00', '2026-06-16 18:00:00'),
(3, 2, '2026-06-16 09:00:00', '2026-06-16 18:00:00');

-- BLOQUEIO DE HORÁRIO 
INSERT INTO horarios_bloqueados (profissional_id, inicio, fim, motivo) VALUES 
(1, '2026-06-16 12:00:00', '2026-06-16 13:00:00', 'Horário de Almoço do Profissional'),
(2, '2026-06-16 14:00:00', '2026-06-16 17:00:00', 'Treinamento de Novas Técnicas de Estética');

-- AGENDAMENTOS
INSERT INTO agendamentos (usuario_id, profissional_id, servico_id, status_id, inicio, fim) VALUES 
-- Mariana marcou Mechas com o Marcos (Serviço longo de 3h, já confirmado)
(1, 1, 2, 2, '2026-06-16 09:00:00', '2026-06-16 12:00:00'),

-- Camila marcou Pé e Mão com a Juliana
(2, 3, 5, 1, '2026-06-16 14:00:00', '2026-06-16 15:00:00');