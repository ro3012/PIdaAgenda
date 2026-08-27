const db = require("../config/database");

class agendamentoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_agendamentos");
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT * FROM tb_agendamentos WHERE id = ?", [id]);
        return rows[0];
    }

    static async findByProfissionalAndData(profissionalId, dataInicio, dataFim) {
        const [rows] = await db.query(
            "SELECT * FROM tb_agendamentos WHERE profissional_id = ? AND data_hora_inicio >= ? AND data_hora_inicio < ?",
            [profissionalId, dataInicio, dataFim]
        );
        return rows;
    }

    static async findByUsuario(usuarioId) {
        const [rows] = await db.query(
            "SELECT * FROM tb_agendamentos WHERE usuario_id = ? ORDER BY data_hora_inicio ASC",
            [usuarioId]
        );
        return rows;
    }

    static async findByProfissional(profissionalId) {
        const [rows] = await db.query(
            "SELECT * FROM tb_agendamentos WHERE profissional_id = ? ORDER BY data_hora_inicio ASC",
            [profissionalId]
        );
        return rows;
    }

    static async findByStatus(statusId) {
        const [rows] = await db.query(
            "SELECT * FROM tb_agendamentos WHERE status_id = ? ORDER BY data_hora_inicio ASC",
            [statusId]
        );
        return rows;
    }

    static async findByUsuarioAndStatus(usuarioId, statusId) {
        const [rows] = await db.query(
            "SELECT * FROM tb_agendamentos WHERE usuario_id = ? AND status_id = ? ORDER BY data_hora_inicio ASC",
            [usuarioId, statusId]
        );
        return rows;
    }

    static async findByProfissionalAndStatus(profissionalId, statusId) {
        const [rows] = await db.query(
            "SELECT * FROM tb_agendamentos WHERE profissional_id = ? AND status_id = ? ORDER BY data_hora_inicio ASC",
            [profissionalId, statusId]
        );
        return rows;
    }

    static async findOverlappingByProfissional(profissionalId, dataInicio, dataFim) {
        const [rows] = await db.query(
            "SELECT * FROM tb_agendamentos WHERE profissional_id = ? AND status_id != 3 AND data_hora_inicio < ? AND data_hora_fim > ?",
            [profissionalId, dataFim, dataInicio]
        );
        return rows;
    }

    static async findByNome(nomeArea) {
        const [rows] = await db.query("SELECT * FROM tb_areas WHERE nomeArea = ?", [nomeArea]);
        return rows[0];
    }

    static async create(agendamento) {
        const { usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim, criado_em } = agendamento;
        const [result] = await db.query("INSERT INTO tb_agendamentos (usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)", [usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim, criado_em]);
        return result.insertId;
    }

    static async update(id, agendamento) {
        const { usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim, criado_em } = agendamento;
        const [result] = await db.query("UPDATE tb_agendamentos SET usuario_id = ?, profissional_id = ?, servico_id = ?, status_id = ?, data_hora_inicio = ?, data_hora_fim = ?, criado_em = ? WHERE id = ?", [usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim, criado_em, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_agendamentos WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = agendamentoModel;