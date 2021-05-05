const Router = require("koa-router");
const {
    login
} = require("../controller/authController");
const {
    verifyLogin
} = require("../middleware/authMiddleware");
const router = new Router({
    prefix: "/login"
});
// 登录授权
router.post("/", verifyLogin, login);

module.exports = router;