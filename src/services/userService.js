const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const validateEmail = require("../utils/validateEmail");

class userService {
    static async getAllUsers() {
        return await userModel.findAll();
    }

    static async createUser(user) {
        if (!validateEmail(user.email)) {
            throw new Error("Formato de e-mail inválido.");
        }
        const existingUser = await userModel.findByEmail(user.email);
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

    static async registerUser(user) {
        const { nome, email, senha_hash, perfil } = user;
        const existing = await userModel.findByEmail(user.email);
        if (existing) {
            throw new Error("E-mail já cadastrado.");
        }
        const hashed = await bcrypt.hash(user.senha_hash, 10);
        user.senha_hash = hashed;
        const id = await userModel.create(user);
        return { message: "Usuário registrado com sucesso.", id };
    }

    static async loginUser({ email, senha_hash }) {
        const user = await userModel.findByEmail(email);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        const valid = await bcrypt.compare(senha_hash, user.senha_hash);
        if (!valid) {
            throw new Error("Senha inválida.");
        }
        const token = jwt.sign({ nome: user.nome, email: user.email, perfil: user.perfil }, process.env.JWT_SECRET, { expiresIn: "1h" }
        );
        return { token, user: { nome: user.nome, email: user.email, perfil: user.perfil }};
    }
}

module.exports = userService;