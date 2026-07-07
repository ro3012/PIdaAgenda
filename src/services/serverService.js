class serverService {
    static async home() {
        return { message: `Agenda funcionando!` };
    }
}

module.exports = serverService;