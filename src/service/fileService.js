const connection = require("../app/database");
class FileService {
    async createAvatar(filename, mimetype, size, id) {
        const statement = `insert into avatar(filename,mime_type,size,user_id) values(?,?,?,?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, id]);
        return result;
    }
    async getAvatarByUserId(userId) {
        const statement = `select * from avatar where user_id = ?`;
        const [result] = await connection.execute(statement, [userId]);
        return result[0];
    }
}
module.exports = new FileService();