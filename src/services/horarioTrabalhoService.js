const horarioTrabalhoModel = require("../models/horarioTrabalhoModel");

class horarioTrabalhoService {
    static async getAllHorarios() {
        return await horarioTrabalhoModel.findAll();
    }

    static async createHorario(horario) {
        const existingHorario = await horarioTrabalhoModel.findByDiaSemana(horario.dia_semana);
        if (existingHorario) {
            throw new Error("Horário de trabalho já cadastrado.");
        }
        return await horarioTrabalhoModel.create(horario);
    }

    static async updateHorario(id, horario) {
        const updatedRows = await horarioTrabalhoModel.update(id, horario);
        if (updatedRows === 0) {
            throw new Error(`Horário de trabalho não encontrado.`);
        }
        return updatedRows;
    }

    static async deleteHorario(id) {
        const deletedRows = await horarioTrabalhoModel.delete(id);
        if (deletedRows === 0) {
            throw new Error(`Horário de trabalho não encontrado.`);
        }
        return deletedRows;
    }
}

module.exports = horarioTrabalhoService;