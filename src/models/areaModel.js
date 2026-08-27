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

    static async findByNome(nomeArea) {
        const [rows] = await db.query("SELECT * FROM tb_areas WHERE nomeArea = ?", [nomeArea]);
        return rows[0];
    }

    static async create(area) {
        const { nomeArea, descricaoArea } = area;
        const [result] = await db.query("INSERT INTO tb_areas (nomeArea, descricaoArea) VALUES (?, ?)", [nomeArea, descricaoArea]);
        return result.insertId;
    }

    static async update(id, area) {
        const { nomeArea, descricaoArea} = area;
        const [result] = await db.query("UPDATE tb_areas SET nomeArea = ?, descricaoArea = ? WHERE id = ?", [nomeArea, descricaoArea, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_areas WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = areaModel;