const fs = require("fs");
const fileService = require("../service/fileService");
const userService = require("../service/userService");
const resultObj = require("../utils/resultCreator");

class UserController {
    async create(ctx) {
        await userService.create(ctx.request.body);
        ctx.body = resultObj(200, "添加用户成功");
    }
    async avatarInfo(ctx) {
        const userId = ctx.params.id;
        const avatarInfo = await fileService.getAvatarByUserId(userId);
        ctx.response.set("content-type", avatarInfo.mime_type);
        ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`);
    }
}
module.exports = new UserController();