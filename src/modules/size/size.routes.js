const AuthStrategy = require("../user/user-authentication.middleware");
const validate = require("../core/middlewires/validate");
const sizeValidationSchema = require("./size.schema");
const {
    getAllSizes,
    createSize,
    getSizeById,
    updateSize,
    deleteSize,
} = require("./size.controller");

module.exports = (app) => {
    app.route("/size")
        .get(getAllSizes)
        .post(AuthStrategy, validate(sizeValidationSchema), createSize);

    app.route("/size/:id")
        .get(getSizeById)
        .patch(AuthStrategy, updateSize)
        .delete(AuthStrategy, deleteSize);
};
