const multer = require("koa-multer");
const Jimp = require("jimp");
const path = require("path");
const avatarUpload = multer({
    dest: path.resolve(__dirname, "../../uploads/avatar")
});
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../uploads/picture"),
    filename(ctx, file, cb) {
        const filenameArr = file.originalname.split(".");
        cb(null, Date.now() + "." + filenameArr[filenameArr.length - 1]);
    }
});
const avatarHandler = avatarUpload.single("avatar");
const pictureHandler = multer({
    storage
}).array("picture", 9);
const pictureResize = async function (ctx, next) {
    const files = ctx.req.files;
    for (const file of files) {
        const [filename, ext] = file.filename.split(".");
        console.log(`${file.destination}/${filename}-large.${ext}`);
        Jimp.read(file.path).then(image => {
            image.resize(1280, Jimp.AUTO).write(`${file.destination}/${filename}-large.${ext}`);
            image.resize(640, Jimp.AUTO).write(`${file.destination}/${filename}-middle.${ext}`);
            image.resize(320, Jimp.AUTO).write(`${file.destination}/${filename}-small.${ext}`);
        });
    }
    await next();
};
module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
};