const Router = require("koa-router");
const labelController = require("../controller/labelController");

const {
    verifyAuth
} = require("../middleware/authMiddleware");

const labelRouter = new Router({
    prefix: "/label"
});
// 添加一个标签
labelRouter.post("/", verifyAuth, labelController.create);
// 分页获取标签
labelRouter.get("/", labelController.list);

module.exports = labelRouter;