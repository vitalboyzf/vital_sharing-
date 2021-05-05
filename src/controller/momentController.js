const momentService = require("../service/momentService");
const resultObj = require("../utils/resultCreator");
const fs = require("fs");
const path = require("path");
class MomentController {
    async create(ctx) {
        const {
            id: userId
        } = ctx.state.user;
        const content = ctx.request.body.content;
        const result = await momentService.create(userId, content);
        ctx.body = resultObj(200, "发布成功", result);
    }
    async detail(ctx) {
        const moment = await momentService.getMomentById(ctx.params.id);
        ctx.body = resultObj(200, "查询成功", moment);
    }
    async list(ctx) {
        const {
            offset = 0, limit = 10
        } = ctx.query;
        const result = await momentService.getListByPage(offset, limit);
        ctx.body = resultObj(200, "查询成功", result, result.length);
    }
    async deleteById(ctx) {
        const result = await momentService.deleteById(ctx.params.id);
        ctx.body = resultObj(200, "删除成功", result);

    }
    async update(ctx) {
        const id = ctx.params.id;
        const content = ctx.request.body.content;
        // 修改内容
        const result = await momentService.updateMomentById(content, id);
        ctx.body = resultObj(200, "修改成功", result);
    }
    async detailWithUserAndComment(ctx) {
        const moment = await momentService.getMomentByIdDetail(ctx.params.id);
        ctx.body = resultObj(200, "查询成功", moment);
    }
    // 给动态添加标签
    async addLabels(ctx) {
        // 获取需要添加的标签数组
        const labels = ctx.state.labels;
        // 获取动态id
        const momentId = ctx.params.id;
        // 遍历标签数组
        for (const label of labels) {
            // 查看当前moment_label是否存在 当前label和momentId的对应关系
            const isExists = await momentService.hasLabel(momentId, label.id);
            // 如果不存在，添加一条关系
            if (!isExists) {
                await momentService.addLabel(momentId, label.id);
            }
        }
        ctx.body = resultObj(200, "添加标签成功");
    }
    async fileInfo(ctx) {
        let {
            filename
        } = ctx.params;
        const {
            type
        } = ctx.query;
        const types = ["large", "middle", "small"];
        const fileInfo = await momentService.getFileByFilename(filename);
        // 根据type处理返回文件大小
        if (types.some(item => item === type)) {
            const [filenameNoExt, ext] = filename.split(".");
            filename = `${filenameNoExt}-${type}.${ext}`;
        }
        ctx.response.set("content-type", fileInfo.mimetype);

        // 读取图片数据返回给客服端
        ctx.body = fs.createReadStream(`./uploads/picture/${filename}`);
    }
}
module.exports = new MomentController();