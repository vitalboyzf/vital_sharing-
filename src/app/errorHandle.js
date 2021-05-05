const {
    NAME_OR_PASSWORD_IS_INCORRECT,
    USER_ALREADY_EXISTS,
    USER_DOES_NOT_EXISTS,
    PASSWORD_IS_INCORRECT,
    UN_AUTHORIZATION,
    INADEQUATE_PERMISSIONS,
    MOMENT_DOES_NOT_EXISTS
} = require("../constant/errorTypes");
const resultObj = require("../utils/resultCreator");
// 错误处理函数 err:错误信息对象 ctx:koa上下文对象
module.exports = (err, ctx) => {
    let status, message;
    switch (err.message) {
        case NAME_OR_PASSWORD_IS_INCORRECT:
            status = 400;
            message = "用户名或者密码不合法！用户名由1-10个字符，密码由6-16个数字字母下划线组成！";
            break;
        case USER_ALREADY_EXISTS:
            status = 409;
            message = "用户名已经存在";
            break;
        case USER_DOES_NOT_EXISTS:
            status = 400;
            message = "用户名不存在";
            break;
        case PASSWORD_IS_INCORRECT:
            status = 400;
            message = "密码错误";
            break;
        case UN_AUTHORIZATION:
            status = 401;
            message = "token无效";
            break;
        case INADEQUATE_PERMISSIONS:
            status = 403;
            message = "没有权限";
            break;
        case MOMENT_DOES_NOT_EXISTS:
            status = 409;
            message = "动态不存在";
            break;
        default:
            status = 404;
            message = "NOT FOUND";
            console.log(err);
    }
    ctx.status = status;
    ctx.body = resultObj(status, message);
};