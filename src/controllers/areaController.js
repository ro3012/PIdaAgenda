const areaService = require("../services/areaService");

class areaController {
    static async getAll(req, res) {
        try {
            const areas = await areaService.getAllAreas();
            res.json(areas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await areaService.createArea(req.body);
            res.status(201).json({ message: `Área criada com sucesso.`, id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            await areaService.updateArea(id, req.body);
            res.json({ message: `Área atualizada com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await areaService.deleteArea(id);
            res.json({ message: `Área deletada com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = areaController;