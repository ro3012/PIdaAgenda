const relatorioModel = require("../models/relatorioModel");

class relatorioService {
    static async getTotalAgendamentos() {
        const totalAgendamentos = await relatorioModel.findTotalAgendamentos();
        return {
            totalAgendamentos: Number(totalAgendamentos.totalAgendamentos)
        };
    }

    static async getServicosMaisSolicitados() {
        return await relatorioModel.findServicosMaisSolicitados();
    }

    static async getProfissionaisMaisRequisitados() {
        return await relatorioModel.findProfissionaisMaisRequisitados();
    }

    static async getRelatorios() {
        const [totalAgendamentos, servicosMaisSolicitados, profissionaisMaisRequisitados] = await Promise.all([
            relatorioModel.findTotalAgendamentos(),
            relatorioModel.findServicosMaisSolicitados(),
            relatorioModel.findProfissionaisMaisRequisitados()
        ]);

        return {
            totalAgendamentos: Number(totalAgendamentos.totalAgendamentos),
            servicosMaisSolicitados,
            profissionaisMaisRequisitados
        };
    }
}

module.exports = relatorioService;