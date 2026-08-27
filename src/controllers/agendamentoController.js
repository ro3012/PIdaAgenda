const agendamentoService = require("../services/agendamentoService");

class agendamentoController {
    static async getAll(req, res) {
        try {
            const agendamentos = await agendamentoService.getAllAgendamentos();
            res.json(agendamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getByUsuario(req, res) {
        try {
            const id = req.params.id;
            const agendamentos = await agendamentoService.getAgendamentosByUsuario(id);
            res.json(agendamentos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByProfissional(req, res) {
        try {
            const id = req.params.id;
            const agendamentos = await agendamentoService.getAgendamentosByProfissional(id);
            res.json(agendamentos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByUsuarioAndStatus(req, res) {
        try {
            const usuarioId = req.params.id;
            const statusId = req.params.statusId;
            const agendamentos = await agendamentoService.getAgendamentosByUsuarioAndStatus(usuarioId, statusId);
            res.json(agendamentos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByProfissionalAndStatus(req, res) {
        try {
            const profissionalId = req.params.id;
            const statusId = req.params.statusId;
            const agendamentos = await agendamentoService.getAgendamentosByProfissionalAndStatus(profissionalId, statusId);
            res.json(agendamentos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getByStatus(req, res) {
        try {
            const id = req.params.id;
            const agendamentos = await agendamentoService.getAgendamentosByStatus(id);
            res.json(agendamentos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await agendamentoService.createAgendamento(req.body);
            res.status(201).json({ message: `Agendamento criado com sucesso.`, id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            await agendamentoService.updateAgendamento(id, req.body);
            res.json({ message: `Agendamento atualizado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await agendamentoService.deleteAgendamento(id);
            res.json({ message: `Agendamento deletado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = agendamentoController;