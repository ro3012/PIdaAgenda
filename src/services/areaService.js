const areaModel = require("../models/areaModel");

class areaService {
    static async getAllAreas() {
        return await areaModel.findAll();
    }

    static async createArea(area) {
        const existingArea = await areaModel.findByNome(area.nomeArea);
        if (existingArea) {
            throw new Error("Área já cadastrada.");
        }
        return await areaModel.create(area);
    }

    static async updateArea(id, area) {
        const updatedRows = await areaModel.update(id, area);
        if (updatedRows === 0) {
            throw new Error(`Área não encontrada.`);
        }
        return updatedRows;
    }

    static async deleteArea(id) {
        const deletedRows = await areaModel.delete(id);
        if (deletedRows === 0) {
            throw new Error(`Área não encontrada.`);
        }
        return deletedRows;
    }
}

module.exports = areaService;