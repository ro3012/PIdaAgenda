const db = require("../config/database");

class horarioBloqueadoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_horarios_bloqueados");
        return rows;
    }

    static async create(horarioBloqueado) {
        const { profissional_id, inicio, fim, motivo } = horarioBloqueado;
        const [result] = await db.query("INSERT INTO tb_horarios_bloqueados (profissional_id, inicio, fim, motivo) VALUES (?, ?, ?, ?)", [profissional_id, inicio, fim, motivo]);
        return result.insertId;
    }

    static async findByProfissionalId(profissionalId) {
        const [rows] = await db.query("SELECT * FROM tb_horarios_bloqueados WHERE profissional_id = ?", [profissionalId]);
        return rows[0];
    }

    static async findByProfissionalAndData(profissionalId, dataInicio, dataFim) {
        const [rows] = await db.query(
            "SELECT * FROM tb_horarios_bloqueados WHERE profissional_id = ? AND inicio >= ? AND inicio < ?",
            [profissionalId, dataInicio, dataFim]
        );
        return rows;
    }

    static async findOverlappingByProfissional(profissionalId, inicio, fim) {
        const [rows] = await db.query(
            "SELECT * FROM tb_horarios_bloqueados WHERE profissional_id = ? AND inicio < ? AND fim > ?",
            [profissionalId, fim, inicio]
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT * FROM tb_horarios_bloqueados WHERE id = ?", [id]);
        return rows[0];
    }

    static async update(id, horarioBloqueado) {
        const { profissional_id, inicio, fim, motivo } = horarioBloqueado;
        await db.query("UPDATE tb_horarios_bloqueados SET profissional_id = ?, inicio = ?, fim = ?, motivo = ? WHERE id = ?", [profissional_id, inicio, fim, motivo, id]);
        return await this.findById(id);
    }

    static async delete(id) {
        await db.query("DELETE FROM tb_horarios_bloqueados WHERE id = ?", [id]);
    }

}

module.exports = horarioBloqueadoModel;