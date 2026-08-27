const statusAgendamentoService = require("../services/statusAgendamentoService");

class statusAgendamentoController {
    static async getAll(req, res) {
        try {
            const statusAgendamentos = await statusAgendamentoService.getAllStatusAgendamentos();
            res.json(statusAgendamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getStatusAgendamentoPorId(req, res) {
        try {
            const id = req.params.id;
            const statusAgendamento = await statusAgendamentoService.getStatusAgendamentoPorId(id);
            res.json(statusAgendamento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const id = await statusAgendamentoService.createStatusAgendamento(req.body);
            res.status(201).json({ message: `Status de agendamento criado com sucesso.`, id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            await statusAgendamentoService.updateStatusAgendamento(id, req.body);
            res.json({ message: `Status de agendamento atualizado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            await statusAgendamentoService.deleteStatusAgendamento(id);
            res.json({ message: `Status de agendamento deletado com sucesso.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = statusAgendamentoController;