const AuthStrategy = require("../user/user-authentication.middleware");
const validate = require("../core/middlewires/validate");
const colorValidationSchema = require("./color.schema");
const {
    getAllColors,
    createColor,
    getColor,
    updateColor,
    deleteColor,
} = require("./color.controller");

module.exports = (app) => {
    app.route("/color")
        .get(getAllColors)
        .post(AuthStrategy, validate(colorValidationSchema), createColor);

    app.route("/color/:id")
        .get(getColor)
        .patch(AuthStrategy, updateColor)
        .delete(AuthStrategy, deleteColor);
};
