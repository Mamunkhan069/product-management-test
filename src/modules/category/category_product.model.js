const {Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/lib/sequelize");
const Category = require("./category.model");
const Product = require("../product/product.model");

const CategoryProduct = sequelize.define(
    "category-products",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        category_id: {
            type: DataTypes.UUID,
        },
        product_id: {
            type: DataTypes.UUID,
        },
    },
    {  
        tableName: "category-products",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Category.belongsToMany(Product, {
    through: CategoryProduct,
    foreignKey: "category_id",
    otherKey: "product_id",
    as: "products",
});

Product.belongsToMany(Category, {
    through: CategoryProduct,
    foreignKey: "product_id",
    otherKey: "category_id",
    as: "categories",
});

module.exports = CategoryProduct;


