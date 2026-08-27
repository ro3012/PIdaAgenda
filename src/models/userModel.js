const db = require("../config/database");

class userModel {
    static async findAll() {
        const [rows] = await db.query("SELECT * FROM tb_usuarios");
        return rows;
    }

    static async findByEmail(email) {
        const [rows] = await db.query("SELECT * FROM tb_usuarios WHERE email = ?", [email]);
        return rows[0];
    }

    static async create(user) {
        const { nome, email, senha_hash, perfil } = user;
        const [result] = await db.query("INSERT INTO tb_usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)", [nome, email, senha_hash, perfil]);
        return result.insertId;
    }

    static async update(id, user) {
        const { nome, email, senha_hash, perfil } = user;
        const [result] = await db.query("UPDATE tb_usuarios SET nome = ?, email = ?, senha_hash = ?, perfil = ? WHERE id = ?", [nome, email, senha_hash, perfil, id]);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query("DELETE FROM tb_usuarios WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = userModel;