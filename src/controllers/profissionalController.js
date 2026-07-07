const profissionalService = require("../services/profissionalService");

class profissionalController {
    static async getAll(req, res) {
        try {
            const profissionais = await profissionalService.getAllProfissionais();
            res.json(profissionais);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await profissionalService.createProfissional(req.body);
            res.status(201).json({ message: `Profissional criado com sucesso.`, id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            await profissionalService.updateProfissional(id, req.body);
            res.json({ message: `Profissional atualizado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await profissionalService.deleteProfissional(id);
            res.json({ message: `Profissional deletado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = profissionalController;