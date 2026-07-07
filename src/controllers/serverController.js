const serverService = require("../services/serverService");

class serverController {
    static async home(req, res) {
        try {
            const resposta = await serverService.home();
            res.json(resposta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = serverController;