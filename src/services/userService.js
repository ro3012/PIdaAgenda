const userModel = require("../models/userModel");

const validateEmail = require("../utils/validateEmail");

class userService {
    static async getAllUsers() {
        return await userModel.findAll();
    }

    static async createUser(user) {
        if (!validateEmail(user.emailUsuario)) {
            throw new Error("Formato de e-mail inválido.");
        }
        const existingUser = await userModel.findByEmail(user.emailUsuario);
        if (existingUser) {
            throw new Error("E-mail já cadastrado.");
        }
        return await userModel.create(user);
    }

    static async updateUser(id, user) {
        const updatedRows = await userModel.update(id, user);
        if (updatedRows === 0) {
            throw new Error(`Usuário não encontrado.`);
        }
        return updatedRows;
    }

    static async deleteUser(id) {
        const deletedRows = await userModel.delete(id);
        if (deletedRows === 0) {
            throw new Error(`Usuário não encontrado.`);
        }
        return deletedRows;
    }
}

module.exports = userService;