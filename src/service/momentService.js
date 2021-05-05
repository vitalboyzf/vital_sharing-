const connection = require("../app/database");
class MomentService {
    async create(id, content) {
        const statement = `INSERT INTO moment (user_id,content) VALUES (?,?);`;
        const result = await connection.execute(statement, [id, content]);
        return result[0];
    }
    async getMomentById(id) {
        const statement = `
    SELECT
        m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user
    FROM moment m
        LEFT JOIN users u on m.user_id = u.id
    where m.id=?`;
        const result = await connection.execute(statement, [id]);
        return result[0][0];
    }
    async getMomentByIdDetail(id) {
        const statement = `
SELECT m.id                                    id,
        m.content                               content,
        m.createAt                              createTime,
        m.updateAt                              updateTime,
        json_object('id', u.id, 'name', u.name,'avatarUrl',u.avatar_url) author,
        json_arrayagg(
                json_object('id', c.id,
                            'content', c.content,
                            'commentId', c.comment_id,
                            'createTime', c.createAt,
                            'user', json_object('id', cu.id, 'name', cu.name,'avatarUrl',cu.avatar_url)
                    )
            )                                   comments,
            (select json_arrayagg(concat('http://localhost:8000/moment/images/',file.filename))
            from file
            where m.id = file.moment_id) pictures
 FROM moment m
          LEFT JOIN users u on m.user_id = u.id
          LEFT JOIN comment c on c.moment_id = m.id
          LEFT JOIN users cu on cu.id = c.user_id
 where m.id = ?;`;
        const result = await connection.execute(statement, [id]);
        return result[0][0];
    }
    async getListByPage(offset, limit) {
        const statement = `SELECT
        m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        json_object('id',u.id,'name',u.name,'avatarUrl',u.avatar_url)  author,
        (select count(*) from comment c where c.moment_id=m.id) commentCount,
        (select COUNT(*) from moment_label ml where ml.moment_id = m.id) labelCount,
        (select json_arrayagg(concat('http://localhost:8000/moment/images/',file.filename))
        from file
        where m.id = file.moment_id) pictures
        FROM moment m
        LEFT JOIN users u on m.user_id = u.id
        limit ?,?`;
        const result = await connection.execute(statement, [offset, limit]);
        return result[0];
    }
    async deleteById(id) {
        const statement = `DELETE FROM moment where id=?;`;
        const result = await connection.execute(statement, [id]);
        return result[0];
    }
    async updateMomentById(content, id) {
        const statement = `UPDATE moment set content = ? where id = ?;`;
        const result = await connection.execute(statement, [content, id]);
        return result[0];
    }
    async hasLabel(momentId, labelId) {
        const statement = `select * from moment_label where moment_id=? and label_id=?;`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result[0];
    }
    async addLabel(momentId, labelId) {
        const statement = `insert into moment_label(moment_id,label_id) values(?,?) `;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result;
    }
    async getFileByFilename(filename) {
        const statement = `select * from file where filename = ?`;
        const [result] = await connection.execute(statement, [filename]);
        return result;
    }
}
module.exports = new MomentService();