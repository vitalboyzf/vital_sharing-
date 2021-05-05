const jwt = require("jsonwebtoken");
const {
    PRIVATE_KEY
} = require("../app/config");
const resultObj = require("../utils/resultCreator");

class AuthController {
    // 登录授权，将认证token返回给客户端
    async login(ctx) {
        const {
            id,
            name
        } = ctx.state.user;
        const token = jwt.sign({
            id,
            name
        }, PRIVATE_KEY, {
            expiresIn: "2 days",
            algorithm: "RS256"
        });
        ctx.body = resultObj(200, "登录成功", token);
    }
}
module.exports = new AuthController();