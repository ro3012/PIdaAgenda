const servicoService = require("../services/servicoService");

class servicoController {
    static async getAll(req, res) {
        try {
            const servicos = await servicoService.getAllServicos();
            res.json(servicos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getServicosPorArea(req, res) {
        try {
            const areaId = req.params.area_id;
            const servicos = await servicoService.getServicosPorArea(areaId);
            res.json(servicos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await servicoService.createServico(req.body);
            res.status(201).json({ message: `Serviço criado com sucesso.`, id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            await servicoService.updateServico(id, req.body);
            res.json({ message: `Serviço atualizado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await servicoService.deleteServico(id);
            res.json({ message: `Serviço deletado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = servicoController;