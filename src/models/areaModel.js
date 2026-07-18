const db = require("../config/database");


class areaModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_areas");
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT * FROM tb_areas WHERE id = ?", [id]);
        return rows[0];
    }

    static async findByNome(nome) {
        const [rows] = await db.query("SELECT * FROM tb_areas WHERE nome = ?", [nome]);
        return rows[0];
    }

    static async create(area) {
        const { nome, descricao } = area;
        const [result] = await db.query("INSERT INTO tb_areas (nome, descricao) VALUES (?, ?)", [nome, descricao]);
        return result.insertId;
    }

    static async update(id, area) {
        const { nome, descricao} = area;
        const [result] = await db.query("UPDATE tb_areas SET nome = ?, descricao = ? WHERE id = ?", [nome, descricao, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_areas WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = areaModel;