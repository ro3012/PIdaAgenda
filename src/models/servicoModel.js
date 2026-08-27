const db = require("../config/database");

class servicoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_servicos");
        return rows;
    }

    static async findByArea(area_id) {
        const [rows] = await db.query("SELECT * FROM tb_servicos WHERE area_id = ?", [area_id]);
        return rows;
    }

    static async findByServico(nomeServico) {
        const [rows] = await db.query("SELECT * FROM tb_servicos WHERE nomeServico = ?", [nomeServico]);
        return rows[0];
    }

    static async create(servico) {
        const { area_id, nomeServico, duracao_min, preco } = servico;
        const [result] = await db.query("INSERT INTO tb_servicos (area_id, nomeServico, duracao_min, preco) VALUES (?, ?, ?, ?)", [area_id, nomeServico, duracao_min, preco]);
        return result.insertId;
    }

    static async update(id, servico) {
        const { area_id, nomeServico, duracao_min, preco } = servico;
        const [result] = await db.query("UPDATE tb_servicos SET area_id = ?, nomeServico = ?, duracao_min = ?, preco = ? WHERE id = ?", [area_id, nomeServico, duracao_min, preco, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_servicos WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = servicoModel;