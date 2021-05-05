const connection = require("../app/database");

class LabelService {
    async create(name) {
        const statement = `
        insert into label(name) values(?)
        `;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }
    async checkLabelExists(name) {
        const statement = `
         select * from label where name = ?;
         `;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }
    async getLabels(offset, limit) {
        const statement = `
        select * from label limit ?,?; `;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
}
module.exports = new LabelService();