module.exports = function throwError(ctx, message) {
    const error = new Error(message);
    ctx.app.emit("error", error, ctx);
};