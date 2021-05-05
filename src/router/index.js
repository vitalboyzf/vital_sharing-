const fs = require("fs");
// 查看所有路由文件
const files = fs.readdirSync(__dirname).filter(file => file !== "index.js");
// 动态注册路由
module.exports = function (app) {
    files.forEach(file => {
        const router = require("./" + file);
        app.use(router.routes());
        app.use(router.allowedMethods());
    });
};