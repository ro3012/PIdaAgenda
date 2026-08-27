const slotsService = require("../services/slotsService");

class slotsController {
    static async consultarDisponibilidade(req, res) {
        try {
            const { profissional_id, data } = req.query;
            if (!profissional_id || !data) {
                return res.status(400).json({ error: "Os parâmetros profissional_id e data são obrigatórios." });
            }

            const slots = await slotsService.consultarDisponibilidade(profissional_id, data);
            return res.json(slots);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = slotsController;