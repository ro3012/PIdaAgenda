const horarioBloqueadoService = require("../services/horarioBloqueadoService");

class horarioBloqueadoController {
    static async getAll(req, res) {
        try {
            const horarios = await horarioBloqueadoService.getAllHorarios();
            res.json(horarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const horario = await horarioBloqueadoService.createHorario(req.body);
            res.status(201).json({ message: `Horário bloqueado criado com sucesso.`, horario });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const horario = await horarioBloqueadoService.updateHorario(req.params.id, req.body);
            res.json({ message: `Horário bloqueado atualizado com sucesso.`, horario });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await horarioBloqueadoService.deleteHorario(req.params.id);
            res.json({ message: `Horário bloqueado deletado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = horarioBloqueadoController;