const statusAgendamentoModel = require("../models/statusAgendamentoModel");

class statusAgendamentoService {
    static async getAllStatusAgendamentos() {
        return await statusAgendamentoModel.findAll();
    }

    static async getStatusAgendamentoPorId(id) {
        const statusAgendamento = await statusAgendamentoModel.findById(id);
        if (!statusAgendamento) {
            throw new Error(`Status de agendamento com ID ${id} não encontrado.`);
        }
        return statusAgendamento;
    }

    static async createStatusAgendamento(status) {
        const existingStatus = await statusAgendamentoModel.findByNome(status.nomeStatus);
        if (existingStatus) {
            throw new Error("Status de agendamento já cadastrado.");
        }
        return await statusAgendamentoModel.create(status);
    }

    static async updateStatusAgendamento(id, status) {
        const updatedRows = await statusAgendamentoModel.update(id, status);
        if (updatedRows === 0) {
            throw new Error(`Status de agendamento não encontrado.`);
        }
        return updatedRows;
    }

    static async deleteStatusAgendamento(id) {
        const deletedRows = await statusAgendamentoModel.delete(id);
        if (deletedRows === 0) {
            throw new Error(`Status de agendamento não encontrado.`);
        }
        return deletedRows;
    }
}

module.exports = statusAgendamentoService;