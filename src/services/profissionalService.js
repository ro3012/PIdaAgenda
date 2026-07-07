const profissionalModel = require("../models/profissionalModel");

class profissionalService {
    static async getAllProfissionais() {
        return await profissionalModel.findAll();
    }

    static async createProfissional(profissional) {
        const existingProfissional = await profissionalModel.findByNome(profissional.nomeProfissional);
        if (existingProfissional) {
            throw new Error("Profissional já cadastrado.");
        }
        return await profissionalModel.create(profissional);
    }

    static async updateProfissional(id, profissional) {
        const updatedRows = await profissionalModel.update(id, profissional);
        if (updatedRows === 0) {
            throw new Error(`Profissional não encontrado.`);
        }
        return updatedRows;
    }

    static async deleteProfissional(id) {
        const deletedRows = await profissionalModel.delete(id);
        if (deletedRows === 0) {
            throw new Error(`Profissional não encontrado.`);
        }
        return deletedRows;
    }
}

module.exports = profissionalService;