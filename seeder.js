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
    const Subcategory = require("./src/modules/subcategory/subcategory.model");
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
                name: "Men's Fashion",
                description: "T-Shirt, Polo Shirt, Pants",
                status: "1",
                image: "categoryImage1.jpg",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Women's Fashion",
                description: "Sharee, Lehenga, Scart etc",
                status: "1",
                image: "categoryImage2.jpg",
                created_by: userId,
                updated_by: userId,
            },
            {
                name: "Electronics",
                description: "TV, Blender, Mobile etc",
                status: "0",
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

    function subcategorySeeder(userId, callback) {
        Promise.all([
            Category.findOne({ where: { name: "Men's Fashion" } }),
            Category.findOne({ where: { name: "Women's Fashion" } }),
        ]).then((values) => {
            const [mensFashionCategory, womwnsFashionCategory] = values;

            const subcategories = [
                {
                    category_id: mensFashionCategory.id,
                    name: "T-shirt",
                    description: "Men t-shirt sub-category",
                    image: "shirt.jpg",
                    status: 1,
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    category_id: womwnsFashionCategory.id,
                    name: "Sharee",
                    description: "Women saree sub-category",
                    image: "sharee.jpg",
                    status: 0,
                    created_by: userId,
                    updated_by: userId,
                },
            ];

            Subcategory.destroy({ truncate: { cascade: true } }).then(() => {
                Subcategory.bulkCreate(subcategories, {
                    returning: true,
                    ignoreDuplicates: false,
                }).then(() => {
                    callback(null, userId);
                });
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
            Subcategory.findOne({ where: { name: "T-shirt" } }),
            Subcategory.findOne({ where: { name: "Sharee" } }),
            Brand.findOne({ where: { name: "Easy" } }),
            Color.findOne({ where: { name: "Red" } }),
            Size.findOne({ where: { name: "40" } }),
        ]).then((values) => {
            const [tshirtSubcategory, shareeSubcategory, brand, color, size] =
                values;

            const products = [
                {
                    sub_cat_id: tshirtSubcategory.id,
                    product_code: "1111",
                    name: "casual",
                    description: "Men casual t-shirt",
                    brand_id: brand.id,
                    color_id: color.id,
                    size_id: size.id,
                    status: 1,
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    sub_cat_id: shareeSubcategory.id,
                    product_code: "2222",
                    name: "jamdani",
                    description: "women samdani sharee ",
                    brand_id: brand.id,
                    color_id: color.id,
                    size_id: size.id,
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
                    image: "jamdanisharee1.jpg",
                    created_by: userId,
                    updated_by: userId,
                },
                {
                    product_id: productTwo.id,
                    image: "jamdanisharee2.jpg",
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

            Category.findOne({ where: { name: "Men's Fashion" } }),
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
            subcategorySeeder,
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
