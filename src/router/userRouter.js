const Router = require("koa-router");
const UserController = require("../controller/userController");
const {
    verifyUser,
    handlePassword
} = require("../middleware/userMiddleware");
const userRouter = new Router({
    prefix: "/user"
});
// 添加用户，首先进行 校验注册用户名密码是否合法，再将密码进行md5加密，最后在进行create操作
userRouter.post("/", verifyUser, handlePassword, UserController.create);
userRouter.get("/:id/avatar", UserController.avatarInfo);
module.exports = userRouter;