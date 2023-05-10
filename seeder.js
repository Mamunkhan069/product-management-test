const path = require("path");
const async = require("async");
const { values } = require("lodash");

async function init() {
    const config = require("./src/config");
    config.initEnvironmentVariables();

    const sequelize = require("./src/config/lib/sequelize");

    await sequelize.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );

    const User = require("./src/modules/user/user.model");
    const Category = require("./src/modules/category/category.model");
    const Brand = require("./src/modules/brand/brand.model");
    const Color = require("./src/modules/color/color.model");
    const Size = require("./src/modules/size/size.model");
    const Product = require("./src/modules/product/product.model");
    const ProductImage = require("./src/modules/product/productImages/productImages.model");
    const CategoryProduct = require("./src/modules/category/category_product.model");

    await sequelize.sync();

    function userSeeder(callback) {
        User.findOrCreate({
            where: { email: "admin@ecommerce.com" },
            defaults: {
                firstName: "System",
                lastName: "Admin",
                password: "P@ssword123",
            },
        }).then((users) => {
            callback(null, users[0].id);
        });
    }

    function categorySeeder(userId, callback) {
        const categories = [
            {
                name: "cloths",
                description: "T-Shirt, Polo Shirt, Pants",
                status: "1",
                parent_id: null,
                image: "categoryImage1.jpg",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Footware",
                description: "sandal, shues, nagra",
                status: "1",
                parent_id: null,
                image: "categoryImage2.jpg",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Electronics",
                description: "TV, Blender, Mobile etc",
                status: "0",
                parent_id: null,
                image: "categoryImage3.jpg",
                created_by: userId,
                updated_by: userId,
            },
        ];

        Category.destroy({ truncate: { cascade: true } }).then(() => {
            Category.bulkCreate(categories, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function brandSeeder(userId, callback) {
        const brands = [
            {
                name: "Easy",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Bay",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Bata",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
        ];

        Brand.destroy({ truncate: { cascade: true } }).then(() => {
            Brand.bulkCreate(brands, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function colorSeeder(userId, callback) {
        const colors = [
            {
                name: "Red",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Blue",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Black",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
        ];

        Color.destroy({ truncate: { cascade: true } }).then(() => {
            Color.bulkCreate(colors, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function sizeSeeder(userId, callback) {
        const sizes = [
            {
                name: "40",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "41",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "42",
                status: 1,
                created_by: userId,
                updated_by: userId,
            },
        ];

        Size.destroy({ truncate: { cascade: true } }).then(() => {
            Size.bulkCreate(sizes, {
                returning: true,
                ignoreDuplicates: false,
            }).then(() => {
                callback(null, userId);
            });
        });
    }

    function productSeeder(userId, callback) {
        Promise.all([
            Brand.findOne({ where: { name: "Easy" } }),
            Color.findOne({ where: { name: "Red" } }),
            Size.findOne({ where: { name: "40" } }),
        ]).then((values) => {
            const [brand, color, size] = values;

            const products = [
                {
                    product_code: "1111",
                    name: "casual shirt",
                    description: "Men casual t-shirt",
                    brand_id: brand.id,
                    color_id: color.id,
                    size_id: size.id,
                    price: 1000,
                    discount: 5,
                    status: 1,
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    product_code: "2222",
                    name: "casual shues",
                    description: "mens casual shues ",
                    brand_id: brand.id,
                    color_id: color.id,
                    size_id: size.id,
                    price: 1000,
                    discount: 5,
                    status: 0,
                    created_by: userId,
                    updated_by: userId,
                },
            ];

            Product.destroy({ truncate: { cascade: true } }).then(() => {
                Product.bulkCreate(products, {
                    returning: true,
                    ignoreDuplicates: false,
                }).then(() => {
                    callback(null, userId);
                });
            });
        });
    }

    function productImageSeeder(userId, callback) {
        Promise.all([
            Product.findOne({ where: { product_code: "1111" } }),
            Product.findOne({ where: { product_code: "2222" } }),
        ]).then((values) => {
            const [productOne, productTwo] = values;

            const productImages = [
                {
                    product_id: productOne.id,
                    image: "casualshirt1.jpg",
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    product_id: productOne.id,
                    image: "casualshirt2.jpg",
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    product_id: productTwo.id,
                    image: "casualshue1.jpg",
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    product_id: productTwo.id,
                    image: "casualshue2.jpg",
                    created_by: userId,
                    updated_by: userId,
                },
            ];

            ProductImage.destroy({ truncate: { cascade: true } }).then(() => {
                ProductImage.bulkCreate(productImages, {
                    returning: true,
                    ignoreDuplicates: false,
                }).then(() => {
                    callback(null, userId);
                });
            });
        });
    }

    function categoryProductSeeder(userId, callback) {
        Promise.all([
            Product.findOne({ where: { product_code: "1111" } }),
            Product.findOne({ where: { product_code: "2222" } }),

            Category.findOne({ where: { name: "cloths" } }),
        ]).then((values) => {
            const [product1, product2, category] = values;

            const categoryProducts = [
                {
                    category_id: category.id,
                    product_id: product1.id,
                },
                {
                    category_id: category.id,
                    product_id: product2.id,
                },
            ];

            CategoryProduct.destroy({ truncate: { cascade: true } }).then(
                () => {
                    CategoryProduct.bulkCreate(categoryProducts, {
                        returning: true,
                        ignoreDuplicates: false,
                    }).then(() => {
                        callback(null, userId);
                    });
                }
            );
        });
    }

    async.waterfall(
        [
            userSeeder,
            categorySeeder,
            brandSeeder,
            colorSeeder,
            sizeSeeder,
            productSeeder,
            productImageSeeder,
            categoryProductSeeder,
        ],
        (err) => {
            if (err) console.error(err);
            else console.log("DB seed completed");
            process.exit();
        }
    );
}

init();
