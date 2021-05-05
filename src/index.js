const app = require("./app");
const config = require("./app/config");
const bodyParse = require("koa-body");
const path = require("path");
const koaStatic = require("koa-static");
const errorHandle = require("./app/errorHandle");
// 执行数据库连接
require("./app/database");
app.use(koaStatic(path.resolve(__dirname, "./public")));
// 解析body中间件
app.use(bodyParse());
// 注册路由中间件
require("./router")(app);
// 错误处理
app.on("error", errorHandle);
// 监听端口
app.listen(config.APP_PORT, () => {
    console.log("server at " + config.APP_PORT);
});