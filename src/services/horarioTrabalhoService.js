const horarioTrabalhoModel = require("../models/horarioTrabalhoModel");

class horarioTrabalhoService {
    static async getAllHorarios() {
        return await horarioTrabalhoModel.findAll();
    }

    static async createHorario(horarioTrabalho) {
        const existingHorarioTrabalho = await horarioTrabalhoModel.findByProfissionalId(horarioTrabalho.profissional_id);
        if (existingHorarioTrabalho) {
            throw new Error("Horário de trabalho já cadastrado para este profissional.");
        }
        return await horarioTrabalhoModel.create(horarioTrabalho);
    }

    static async updateHorario(id, horarioTrabalho) {
        const existingHorarioTrabalho = await horarioTrabalhoModel.findById(id);
        if (!existingHorarioTrabalho) {
            throw new Error("Horário de trabalho não encontrado.");
        }
        return await horarioTrabalhoModel.update(id, horarioTrabalho);
    }

    static async deleteHorario(id) {
        const existingHorarioTrabalho = await horarioTrabalhoModel.findById(id);
        if (!existingHorarioTrabalho) {
            throw new Error("Horário de trabalho não encontrado.");
        }
        return await horarioTrabalhoModel.delete(id);
    }
}

module.exports = horarioTrabalhoService;