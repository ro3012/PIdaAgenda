const relatorioService = require("../services/relatorioService");

class relatorioController {
    static async getTotalAgendamentos(req, res) {
        try {
            const totalAgendamentos = await relatorioService.getTotalAgendamentos();
            res.json(totalAgendamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getServicosMaisSolicitados(req, res) {
        try {
            const servicosMaisSolicitados = await relatorioService.getServicosMaisSolicitados();
            res.json(servicosMaisSolicitados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProfissionaisMaisRequisitados(req, res) {
        try {
            const profissionaisMaisRequisitados = await relatorioService.getProfissionaisMaisRequisitados();
            res.json(profissionaisMaisRequisitados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getRelatorios(req, res) {
        try {
            const relatorios = await relatorioService.getRelatorios();
            res.json(relatorios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = relatorioController;