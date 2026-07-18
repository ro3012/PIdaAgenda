const db = require("../config/database");

class profissionalModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_profissionais");
        return rows;
    }

    static async findByNome(nome) {
        const [rows] = await db.query("SELECT * FROM tb_profissionais WHERE nome = ?", [nome]);
        return rows[0];
    }

    static async create(user) {
        const { nome, especialidade, telefone, ativo } = user;
        const [result] = await db.query("INSERT INTO tb_profissionais (nome, especialidade, telefone, ativo) VALUES (?, ?, ?, ?)", [nome, especialidade, telefone, ativo]);
        return result.insertId;
    }

    static async update(id, user) {
        const { nome, especialidade, telefone, ativo } = user;
        const [result] = await db.query("UPDATE tb_profissionais SET nome = ?, especialidade = ?, telefone = ?, ativo = ? WHERE id = ?", [nome, especialidade, telefone, ativo, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_profissionais WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = profissionalModel;