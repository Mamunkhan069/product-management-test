const Product = require("./product.model");
const ProductImage = require("./productImages/productImages.model");
const { Op } = require("sequelize");

async function createProduct(req, res) {
    try {
        const {
            sub_cat_id,
            product_code,
            name,
            description,
            price,
            discount,
            status,
            brand_id,
            color_id,
            size_id,
        } = req.body;
        const existingProduct = await Product.findOne({
            where: { product_code },
        });
        if (existingProduct) {
            return res
                .status(400)
                .send("Product with this code already exists.");
        }

        const product = await Product.create({
            sub_cat_id,
            product_code,
            name,
            description,
            price,
            discount,
            status,
            brand_id,
            color_id,
            size_id,
            created_by: req.user.id,
            updated_by: req.user.id,
        });

        const images = req.ImagefileNames;
        const productImages = images.map((image) => ({
            product_id: product.id,
            image,
        }));

        req.ImagefileNames.splice(0, images.length);

        await ProductImage.bulkCreate(productImages);

        return res.status(201).send(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error!");
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    as: "productImages",
                },
            ],
        });
        return res.status(200).send(products);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to get products." });
    }
}

const getProductsByStatus = async (req) => {
    try {
        const products = await Product.findAll({
            where: { status: req.params.status },
            include: [
                {
                    model: ProductImage,
                    as: "productImages",
                },
            ],
        });
        return products;
    } catch (error) {
        console.error(error);
    }
};

async function getProduct(req, res) {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId, {
            include: [
                {
                    model: ProductImage,
                    as: "productImages",
                },
            ],
        });

        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }

        return res.status(200).send(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to get product." });
    }
}

async function searchProducts(req, res) {
    try {
        const searchquery = req.params.searchquery;
        if (searchquery === "undefined") {
            return res.status(400).send({ message: "give a search query" });
        }
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${searchquery}%`,
                        },
                    },
                    {
                        product_code: {
                            [Op.like]: `%${searchquery}%`,
                        },
                    },
                    {
                        description: {
                            [Op.like]: `%${searchquery}%`,
                        },
                    },
                ],
            },
        });
        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).send(products);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to search products." });
    }
}

async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const {
            sub_cat_id,
            product_code,
            name,
            description,
            price,
            discount,
            status,
            brand_id,
            color_id,
            size_id,
        } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }

        product.sub_cat_id = sub_cat_id;
        product.product_code = product_code;
        product.name = name;
        product.description = description;
        product.price = price;
        product.discount = discount;
        product.status = status;
        product.brand_id = brand_id;
        product.color_id = color_id;
        product.size_id = size_id;
        product.updated_by = req.user.id;

        await product.save();

        const images = req.ImagefileNames;
        const productImages = images.map((image) => ({
            product_id: productId,
            image,
        }));

        req.ImagefileNames.splice(0, images.length);

        await ProductImage.destroy({ where: { product_id: productId } });
        await ProductImage.bulkCreate(productImages);

        return res.status(200).send(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to update product." });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }

        await Product.destroy({ where: { id: productId } });

        await ProductImage.destroy({ where: { product_id: productId } });

        return res
            .status(200)
            .send({ message: "Product deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to delete product." });
    }
}

module.exports.createProduct = createProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProductsByStatus = getProductsByStatus;
module.exports.searchProducts = searchProducts;
