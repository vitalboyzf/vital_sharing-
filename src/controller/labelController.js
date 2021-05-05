const labelService = require("../service/labelService");
const resultObj = require("../utils/resultCreator");

class LabelController {
    // 创建一个标签
    async create(ctx) {
        const {
            name
        } = ctx.request.body;
        const result = await labelService.create(name);
        ctx.body = resultObj(200, "添加标签成功", result);
    }
    // 获取标签列表
    async list(ctx) {
        const {
            offset = 0, limit = 10
        } = ctx.request.query;
        const result = await labelService.getLabels(offset, limit);
        ctx.body = resultObj(200, "查询成功", result, result.length);
    }
}
module.exports = new LabelController();