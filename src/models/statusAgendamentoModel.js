const db = require("../config/database");

class statusAgendamentoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_status_agendamento");
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT * FROM tb_status_agendamento WHERE id = ?", [id]);
        return rows[0];
    }

    static async findByNome(nomeStatus) {
        const [rows] = await db.query("SELECT * FROM tb_status_agendamento WHERE nomeStatus = ?", [nomeStatus]);
        return rows[0];
    }

    static async create(status) {
        const { nomeStatus, descricaoStatus } = status;
        const [result] = await db.query("INSERT INTO tb_status_agendamento (nomeStatus, descricaoStatus) VALUES (?, ?)", [nomeStatus, descricaoStatus]);
        return result.insertId;
    }

    static async update(id, status) {
        const { nomeStatus, descricaoStatus} = status;
        const [result] = await db.query("UPDATE tb_status_agendamento SET nomeStatus = ?, descricaoStatus = ? WHERE id = ?", [nomeStatus, descricaoStatus, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_status_agendamento WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = statusAgendamentoModel;