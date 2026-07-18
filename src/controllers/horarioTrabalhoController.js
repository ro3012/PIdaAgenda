const horarioTrabalhoService = require("../services/horarioTrabalhoService");

class horarioTrabalhoController {
    static async getAll(req, res) {
        try {
            const horarios = await horarioTrabalhoService.getAllHorarios();
            res.json(horarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await horarioTrabalhoService.createHorario(req.body);
            res.status(201).json({ message: `Horário de trabalho criado com sucesso.`, id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await horarioTrabalhoService.createHorario(req.body);
            res.status(201).json({ message: `Horário de trabalho criado com sucesso.`, id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            await horarioTrabalhoService.updateHorario(id, req.body);
            res.json({ message: `Horário de trabalho atualizado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await horarioTrabalhoService.deleteHorario(id);
            res.json({ message: `Horário de trabalho deletado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = horarioTrabalhoController;