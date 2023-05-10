const Product = require("../product/product.model");
const ProductImage = require("../product/productImages/productImages.model");
const Category = require("./category.model");

async function getCategories(req, res) {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Subcategory,
                    as: "subcategories",
                    include: [
                        {
                            model: Product,
                            as: "products",
                            include: [
                                {
                                    model: ProductImage,
                                    as: "productImages",
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        res.status(200).send(categories);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

async function createCategory(req, res) {
    try {
        const { name, description, status, parent_id } = req.body;
        console.log(req.body);

        const existCategory = await Category.findOne({ where: { name } });
        if (existCategory) return res.status(400).send("Already exist");

        const category = await Category.create({
            name,
            description,
            status,
            parent_id,
            image: req.file.filename === undefined ? "" : req.file.filename,
            created_by: req.user.id,
        });

        res.status(201).send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getCategroyByID(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findOne({ where: { id } });

        if (!category) return res.status(404).send("Category not found!");

        res.status(200).send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}

async function updateCategory(req, res) {
    try {
        const { name, description, status, parent_id } = req.body;
        const { id } = req.params;

        const category = await Category.findOne({ where: { id } });
        if (!category) return res.status(404).send("Category not found");
        const catstatus = category.status;
        const updatedCategory = await category.update({
            name: name || category.name,
            description: description || category.description,
            status: status || category.status,
            parent_id: parent_id || category.parent_id,
            image: req.file ? req.file.filename : category.image,
            updated_by: req.user.id,
        });

        if (status !== catstatus) {
            await updateChildCategoryStatuses(category.id, status);
        }

        res.status(200).send(updatedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function updateChildCategoryStatuses(parentCategoryId, newStatus) {
    const childCategories = await Category.findAll({
        where: { parent_id: parentCategoryId },
    });
    console.log("-----------get all chiled-------------", childCategories);
    for (const childCategory of childCategories) {
        await childCategory.update({ status: newStatus });
        await updateChildCategoryStatuses(childCategory.id, newStatus);
        console.log("-----------update child status-------------");
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findOne({ where: { id } });
        if (!category) return res.status(404).send("Category not found!");

        await category.destroy();

        res.status(200).send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.getCategories = getCategories;
module.exports.getCategroyByID = getCategroyByID;
module.exports.createCategory = createCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
