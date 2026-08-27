const horarioBloqueadoModel = require("../models/horarioBloqueadoModel");

class horarioBloqueadoService {
    static async getAllHorarios() {
        return await horarioBloqueadoModel.findAll();
    }

    static async createHorario(horarioBloqueado) {
        const existingHorarioBloqueado = await horarioBloqueadoModel.findByProfissionalId(horarioBloqueado.profissional_id);
        if (existingHorarioBloqueado) {
            throw new Error("Horário bloqueado já cadastrado para este profissional.");
        }
        return await horarioBloqueadoModel.create(horarioBloqueado);
    }

    static async updateHorario(id, horarioBloqueado) {
        const existingHorarioBloqueado = await horarioBloqueadoModel.findById(id);
        if (!existingHorarioBloqueado) {
            throw new Error("Horário bloqueado não encontrado.");
        }
        return await horarioBloqueadoModel.update(id, horarioBloqueado);
    }

    static async deleteHorario(id) {
        const existingHorarioBloqueado = await horarioBloqueadoModel.findById(id);
        if (!existingHorarioBloqueado) {
            throw new Error("Horário bloqueado não encontrado.");
        }
        return await horarioBloqueadoModel.delete(id);
    }
}

module.exports = horarioBloqueadoService;