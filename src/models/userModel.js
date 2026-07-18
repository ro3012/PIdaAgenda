const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class UserModel {
    // Busca todos os usuários
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM tb_usuarios');
        return rows;
    }
    // Busca um usuário pelo email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM tb_usuarios WHERE email = ?',
            [email]);
        return rows[0];
    }
    //cria um novo usuário
    static async create(user) {
        const { nome, email, senha_hash, perfil } = user;
        const [result] = await db.query('INSERT INTO tb_usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)', [nome, email, senha_hash, perfil]);
        return result.insertId; // Retorna o ID do usuário criado
    }
    // Atualiza um usuário existente
    static async update(id, user) {
        const { nome, email, senha_hash, perfil } = user;
        const [result] = await db.query('UPDATE tb_usuarios SET nome = ?, email = ?, senha_hash = ?, perfil = ? WHERE id = ?', [nome, email, senha_hash, perfil, id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
    // Deleta um usuário pelo ID
    static async delete(id) {
        const [result] = await db.query('DELETE FROM tb_usuarios WHERE id = ?', [id]);
        return result.affectedRows; // Retorna o número de linhas afetadas
    }
}
module.exports = UserModel;
// Exporta a classe UserModel para ser usada nos services