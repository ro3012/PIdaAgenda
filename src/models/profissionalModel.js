const db = require("../config/database");

class profissionalModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_profissionais");
        return rows;
    }

    static async findByNome(nomeProfissional) {
        const [rows] = await db.query("SELECT * FROM tb_profissionais WHERE nomeProfissional = ?", [nomeProfissional]);
        return rows[0];
    }

    static async create(user) {
        const { nomeProfissional, especialidade, telefone, ativo } = user;
        const [result] = await db.query("INSERT INTO tb_profissionais (nomeProfissional, especialidade, telefone, ativo) VALUES (?, ?, ?, ?)", [nomeProfissional, especialidade, telefone, ativo]);
        return result.insertId;
    }

    static async update(id, user) {
        const { nomeProfissional, especialidade, telefone, ativo } = user;
        const [result] = await db.query("UPDATE tb_profissionais SET nomeProfissional = ?, especialidade = ?, telefone = ?, ativo = ? WHERE id = ?", [nomeProfissional, especialidade, telefone, ativo, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_profissionais WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = profissionalModel;