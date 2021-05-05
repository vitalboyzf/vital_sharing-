const path = require("path");
const Router = require("koa-router");
const {
    verifyAuth
} = require("../middleware/authMiddleware");
const {
    saveAvatarInfoAuto,
    savePictureInfo
} = require("../controller/fileController");
const {
    avatarHandler,
    pictureHandler,
    pictureResize
} = require("../middleware/fileMiddleware");
const uploadRouter = new Router({
    prefix: "/upload"
});
uploadRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfoAuto);
uploadRouter.post("/picture", verifyAuth, pictureHandler, pictureResize, savePictureInfo);
module.exports = uploadRouter;