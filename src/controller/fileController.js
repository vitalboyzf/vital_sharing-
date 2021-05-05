const path = require("path");

const {
    APP_PORT,
    APP_HOST
} = require("../app/config");
const fileService = require("../service/fileService");
const userService = require("../service/userService");
const resultObj = require("../utils/resultCreator");

class FileController {
    async saveAvatarInfoAuto(ctx) {
        const {
            mimetype,
            filename,
            size
        } = ctx.req.file;
        const id = ctx.state.user.id;
        // 保存到数据库中
        const result = await fileService.createAvatar(filename, mimetype, size, id);
        // 将图片地址保存到user表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
        await userService.updateAvatarUrlById(avatarUrl, id);
        ctx.body = resultObj(200, "头像添加成功", result);
    }
    async savePictureInfo(ctx) {
        const files = ctx.req.files;
        const userId = ctx.state.user.id;
        for (const file of files) {
            const {
                mimetype,
                filename,
                size
            } = file;
            const momentId = ctx.query.momentId;
            await userService.createFile(filename, mimetype, size, userId, momentId);
            ctx.body = resultObj(200, "图片上传成功");
        }
    }
}
module.exports = new FileController();