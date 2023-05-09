const AuthStrategy = require("../user/user-authentication.middleware");
const validate = require("../core/middlewires/validate");
const brandValidationSchema = require("./brand.schema");
const {
    getAllBrands,
    createBrand,
    getSingleBrand,
    updateBrand,
    deleteBrand,
} = require("./brand.controller");

module.exports = (app) => {
    app.route("/brand")
        .get(getAllBrands)
        .post(AuthStrategy, validate(brandValidationSchema), createBrand);

    app.route("/brand/:id")
        .get(getSingleBrand)
        .patch(AuthStrategy, updateBrand)
        .delete(AuthStrategy, deleteBrand);
};
