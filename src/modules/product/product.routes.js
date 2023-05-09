const {
    createProduct,
    getAllProducts,
    getProductsByStatus,
    searchProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("./product.controller");
const { uploadProductImages } = require("../../config/lib/multer");
const AuthStrategy = require("../user/user-authentication.middleware");
const validate = require("../core/middlewires/validate");
const { createProductSchema } = require("./product.schema");

module.exports = (app) => {
    app.route("/product")
        .post(
            AuthStrategy,
            uploadProductImages.array("images", 3),
            createProduct
        )
        .get(AuthStrategy, getAllProducts);

    app.route("/product/status/:status").get(AuthStrategy, getProductsByStatus);

    app.route("/product/search/:searchquery").get(AuthStrategy, searchProducts);

    app.route("/product/:id")
        .get(AuthStrategy, getProduct)
        .patch(AuthStrategy, updateProduct)
        .delete(AuthStrategy, deleteProduct);
};
