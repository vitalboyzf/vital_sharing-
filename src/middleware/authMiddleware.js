const jwt = require("jsonwebtoken");
const {
    PUBLIC_KEY
} = require("../app/config");
const {
    NAME_OR_PASSWORD_IS_INCORRECT,
    USER_DOES_NOT_EXISTS,
    PASSWORD_IS_INCORRECT,
    UN_AUTHORIZATION,
    INADEQUATE_PERMISSIONS
} = require("../constant/errorTypes");
const {
    getUserByName
} = require("../service/userService");
const verifyUserNameAndPwd = require("../utils/verifyUserNameAndPwd");
const throwError = require("../utils/throwError");
const authService = require("../service/authService");
const md5Password = require("../utils/passwordHandle");

// 登录校验
const verifyLogin = async function (ctx, next) {
    // 获取用户名密码
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
    const user = result[0];
    // 用户不存在
    if (!user) {
        return throwError(ctx, USER_DOES_NOT_EXISTS);
    }
    // 校验密码，转化为md5
    // 密码不正确
    if (user.password !== md5Password(password)) {
        return throwError(ctx, PASSWORD_IS_INCORRECT);
    }
    // 校验完成，密码正确，将用户信息添加到状态中
    ctx.state.user = user;
    await next();
};
// 需要认证的操作
const verifyAuth = async function (ctx, next) {
    // 获取客户端带来的身份凭证token
    const authorization = ctx.headers.authorization;
    try {
        // 去掉开头的Bearer
        const token = authorization.replace(/Bearer\s+/, "");
        // 验证token 是否合法
        const user = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        });
        // 没有抛出异常，说明认证成功，可以进行下一步操作
        ctx.state.user = user;
    } catch (err) {
        return throwError(ctx, UN_AUTHORIZATION);
    }
    await next();
};

const verifyPermission = (tableName) => {
    return async function (ctx, next) {
        // 获取动态路由id
        const id = ctx.params.id;
        // 获取当前登录的用户的id
        const userId = ctx.state.user.id;
        // 查看当前登录的用户是否有权限操作目标数据
        const isPermission = await authService.checkAuth(tableName, id, userId);
        // 如果没有这个权限，抛出异常
        if (!isPermission) {
            return throwError(ctx, INADEQUATE_PERMISSIONS);
        }
        await next();
    };
};
module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
};