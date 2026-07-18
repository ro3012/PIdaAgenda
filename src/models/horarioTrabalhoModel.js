const db = require("../config/database");

class horarioTrabalhoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_horarios_trabalho");
        return rows;
    }

    static async findByDiaSemana(dia_semana) {
        const [rows] = await db.query("SELECT * FROM tb_horarios_trabalho WHERE dia_semana = ?", [dia_semana]);
        return rows[0];
    }

    static async create(horario) {
        const { profissional_id, dia_semana, inicio, fim } = horario;
        const [result] = await db.query("INSERT INTO tb_horarios_trabalho (profissional_id, dia_semana, inicio, fim) VALUES (?, ?, ?, ?)", [profissional_id, dia_semana, inicio, fim]);
        return result.insertId;
    }

    static async update(id, horario) {
        const { profissional_id, dia_semana, inicio, fim } = horario;
        const [result] = await db.query("UPDATE tb_horarios_trabalho SET profissional_id = ?, dia_semana = ?, inicio = ?, fim = ? WHERE id = ?", [profissional_id, dia_semana, inicio, fim, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_horarios_trabalho WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = horarioTrabalhoModel;