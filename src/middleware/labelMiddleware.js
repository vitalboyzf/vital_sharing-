const labelService = require("../service/labelService");
// 查看标签是否存在中间件
const verifyLabelExists = async function (ctx, next) {
    let {
        labels
    } = ctx.request.body;
    const newLabels = [];
    if (!Array.isArray(labels)) labels = [labels];
    // 循环想要添加的标签
    for (const name of labels) {
        // 查看每个标签是否存在
        const [labelResult] = await labelService.checkLabelExists(name);
        const label = {
            name
        };
        // 如果当前标签不存在，创建新标签并添加到数据库
        if (!labelResult) {
            const result = await labelService.create(name);
            // 取出创建后的insertId
            label.id = result.insertId;
        } else {
            // 当前标签在数据库中存在，直接取出id
            label.id = labelResult.id;
        }
        // 保存到当前添加的标签列表
        newLabels.push(label);
    }
    // 将标签数组添加到状态中
    ctx.state.labels = newLabels;
    await next();
};
module.exports = {
    verifyLabelExists
};