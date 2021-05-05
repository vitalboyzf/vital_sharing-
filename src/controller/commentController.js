const commentService = require("../service/commentService");
const resultObj = require("../utils/resultCreator");

class CommentController {
    async create(ctx) {
        const userId = ctx.state.user.id;
        const {
            content,
            momentId
        } = ctx.request.body;
        const result = await commentService.create(momentId, content, userId);
        ctx.body = resultObj(200, "添加一条评论", result);
    }
    async reply(ctx) {
        const userId = ctx.state.user.id;
        const momentId = ctx.params.id;
        const {
            content,
            commentId
        } = ctx.request.body;
        const result = await commentService.reply(momentId, content, userId, commentId);
        ctx.body = resultObj(200, "回复了一条评论", result);
    }
    async update(ctx) {
        const commentId = ctx.params.id;
        const content = ctx.request.body.content;
        const result = await commentService.update(commentId, content);
        ctx.body = resultObj(200, "修改成功", result);
    }
    async remove(ctx) {
        const commentId = ctx.params.id;
        const result = await commentService.remove(commentId);
        ctx.body = resultObj(200, "删除成功", result);
    }
    async list(ctx) {
        const momentId = ctx.params.id;
        const result = await commentService.getCommentsByMomentId(momentId);
        ctx.body = resultObj(200, "查询成功", result, result.length);
    }
}
module.exports = new CommentController();