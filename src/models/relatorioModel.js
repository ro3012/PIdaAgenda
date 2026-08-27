const db = require("../config/database");

class relatorioModel {
    static async findTotalAgendamentos() {
        const [rows] = await db.query("SELECT COUNT(*) AS totalAgendamentos FROM tb_agendamentos");
        return rows[0];
    }

    static async findServicosMaisSolicitados() {
        const [rows] = await db.query(
            `SELECT s.id AS servico_id, s.nome, COUNT(a.id) AS totalSolicitacoes
             FROM tb_agendamentos a
             INNER JOIN tb_servicos s ON s.id = a.servico_id
             GROUP BY s.id, s.nome
             ORDER BY totalSolicitacoes DESC, s.nome ASC`
        );
        return rows;
    }

    static async findProfissionaisMaisRequisitados() {
        const [rows] = await db.query(
            `SELECT p.id AS profissional_id, p.nome, COUNT(a.id) AS totalSolicitacoes
             FROM tb_agendamentos a
             INNER JOIN tb_profissionais p ON p.id = a.profissional_id
             GROUP BY p.id, p.nome
             ORDER BY totalSolicitacoes DESC, p.nome ASC`
        );
        return rows;
    }
}

module.exports = relatorioModel;