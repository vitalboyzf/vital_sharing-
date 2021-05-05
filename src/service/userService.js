const connection = require("../app/database");
class UserService {
    async create(user) {
        const {
            name,
            password
        } = user;
        const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
        const result = await connection.execute(statement, [name, password]);
        return result[0];
    }
    async getUserByName(name) {
        const statement = `SELECT * FROM users WHERE name = ?;`;
        const result = await connection.execute(statement, [name]);
        return result[0];
    }
    // 设置头像的url地址
    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `update users set avatar_url = ? where id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result[0];
    }
    // 创建一个文件
    async createFile(filename, mimetype, size, userId, momentId) {
        const statement = `insert into file(filename,mime_type,size,user_id,moment_id) value(?,?,?,?,?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
        return result;
    }
}
module.exports = new UserService();