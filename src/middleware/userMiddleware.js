const {
    NAME_OR_PASSWORD_IS_INCORRECT,
    USER_ALREADY_EXISTS
} = require("../constant/errorTypes");
const {
    getUserByName
} = require("../service/userService");
const md5Password = require("../utils/passwordHandle");
const throwError = require("../utils/throwError");
const verifyUserNameAndPwd = require("../utils/verifyUserNameAndPwd");


// 校验注册用户名密码是否合法
const verifyUser = async (ctx, next) => {
    const {
        name,
        password
    } = ctx.request.body;
    // 判断用户名密码是否为空
    if (!verifyUserNameAndPwd(name, password)) {
        return throwError(ctx, NAME_OR_PASSWORD_IS_INCORRECT);
    }
    // 验证是否已经存在用户
    const result = await getUserByName(name);
    // 已经存在这个用户
    if (result.length) {
        return throwError(ctx, USER_ALREADY_EXISTS);
    }
    await next();
};
const handlePassword = async (ctx, next) => {
    // 密码加密处理
    ctx.request.body.password = md5Password(ctx.request.body.password);
    await next();
};
module.exports = {
    verifyUser,
    handlePassword
};