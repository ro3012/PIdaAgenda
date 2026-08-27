const db = require("../config/database");

class horarioTrabalhoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_horarios_trabalho");
        return rows;
    }

    static async create(horarioTrabalho) {
        const { profissional_id, dia_semana, hora_inicio, hora_fim } = horarioTrabalho;
        const [result] = await db.query("INSERT INTO tb_horarios_trabalho (profissional_id, dia_semana, hora_inicio, hora_fim) VALUES (?, ?, ?, ?)", [profissional_id, dia_semana, hora_inicio, hora_fim]);
        return result.insertId;
    }

    static async findByProfissionalId(profissionalId) {
        const [rows] = await db.query("SELECT * FROM tb_horarios_trabalho WHERE profissional_id = ?", [profissionalId]);
        return rows[0];
    }

    static async findByProfissionalAndDia(profissionalId, diaSemana) {
        const [rows] = await db.query("SELECT * FROM tb_horarios_trabalho WHERE profissional_id = ? AND dia_semana = ?", [profissionalId, diaSemana]);
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT * FROM tb_horarios_trabalho WHERE id = ?", [id]);
        return rows[0];
    }

    static async update(id, horarioTrabalho) {
        const { profissional_id, dia_semana, hora_inicio, hora_fim } = horarioTrabalho;
        await db.query("UPDATE tb_horarios_trabalho SET profissional_id = ?, dia_semana = ?, hora_inicio = ?, hora_fim = ? WHERE id = ?", [profissional_id, dia_semana, hora_inicio, hora_fim, id]);
        return await this.findById(id);
    }

    static async delete(id) {
        await db.query("DELETE FROM tb_horarios_trabalho WHERE id = ?", [id]);
    }

}

module.exports = horarioTrabalhoModel;