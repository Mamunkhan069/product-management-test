const sequelize = require("../../config/lib/sequelize");
const { DataTypes, UUID, FLOAT } = require("sequelize");
const Color = require("../../modules/color/color.model");
const Size = require("../../modules/size/size.model");
const Brand = require("../brand/brand.model");

const Product = sequelize.define(
    "products",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        product_code: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        brand_id: {
            type: DataTypes.UUID,
        },
        color_id: {
            type: DataTypes.UUID,
        },
        size_id: {
            type: DataTypes.UUID,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        discount: {
            type: DataTypes.FLOAT,
        },
        status: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        created_by: {
            allowNull: true,
            type: DataTypes.UUID,
        },
        updated_by: {
            allowNull: true,
            type: DataTypes.UUID,
        },
    },
    {
        tableName: "products",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Brand.hasMany(Product, {
    as: "products",
    foreignKey: "brand_id",
});

Color.hasMany(Product, {
    as: "products",
    foreignKey: "color_id",
});

Size.hasMany(Product, {
    as: "products",
    foreignKey: "size_id",
});

module.exports = Product;
