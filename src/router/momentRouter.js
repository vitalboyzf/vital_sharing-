const Router = require("koa-router");
const MomentController = require("../controller/momentController");
const {
    verifyLabelExists
} = require("../middleware/labelMiddleware");
const {
    verifyAuth,
    verifyPermission
} = require("../middleware/authMiddleware");
const momentRouter = new Router({
    prefix: "/moment"
});
// 添加一条动态，首先需要进行登录认证
momentRouter.post("/", verifyAuth, MomentController.create);
// 根据id获取一条动态
momentRouter.get("/:id", MomentController.detail);
// 根据id获取一条动态存在评论以及用户信息
momentRouter.get("/detail/:id", MomentController.detailWithUserAndComment);
// 获取动态列表 分页query offset=0&limit=10
momentRouter.get("/", MomentController.list);
// 修改一条动态 进行登录认证（查看是否登录） 并进行操作权限认证（操作的目标数据是否属于登录用户）
momentRouter.patch("/:id", verifyAuth, verifyPermission("moment"), MomentController.update);
// 删除一条动态 进行登录认证（查看是否登录） 并进行操作权限认证（操作的目标数据是否属于登录用户）
momentRouter.delete("/:id", verifyAuth, verifyPermission("moment"), MomentController.deleteById);
// 为动态添加标签 进行登录认证（查看是否登录） 并进行操作权限认证（操作的目标数据是否属于登录用户） 并查看当前标签是否已经存在
momentRouter.post("/:id/labels", verifyAuth, verifyPermission("moment"), verifyLabelExists, MomentController.addLabels);
// 根据文件名查看动态的配图
momentRouter.get("/images/:filename", MomentController.fileInfo);
module.exports = momentRouter;