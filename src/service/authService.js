const connection = require("../app/database");
class AuthService {
    // 查看当前登录的用户是否有权限操作数据
    async checkAuth(tableName, id, userId) {
        // 需要权限操作的表都有user_id这个字段，查看目标表的目标数据user_id是否为当前用户
        const statement = `select * from ${tableName} where id = ? and user_id = ?`;
        const [result] = await connection.execute(statement, [id, userId]);
        return result.length !== 0;
    }
}
module.exports = new AuthService();