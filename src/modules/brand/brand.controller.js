const Brand = require("./brand.model");

async function createBrand(req, res) {
    try {
        const { name, status } = req.body;
        console.log(req.body);

        const existBrand = await Brand.findOne({ where: { name } });
        if (existBrand) return res.status(400).send("Brand already exists");

        const brand = await Brand.create({
            name,
            status,
            created_by: req.user.id,
        });

        res.status(201).send(brand);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getAllBrands(req, res) {
    try {
        const brands = await Brand.findAll();
        res.status(200).send(brands);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

async function updateBrand(req, res) {
    try {
        const brandId = req.params.id;
        const { name, status } = req.body;

        const brand = await Brand.findOne({ where: { id: brandId } });

        if (!brand) {
            return res.status(404).send("Brand not found");
        }

        await brand.update({
            name,
            status,
            updated_by: req.user.id,
        });

        res.status(200).send(brand);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}
async function getSingleBrand(req, res) {
    try {
        const { id } = req.params;
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).send("Brand not found");
        }

        res.send(brand);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

async function deleteBrand(req, res) {
    try {
        const { id } = req.params;

        const brand = await Brand.findOne({ where: { id } });
        if (!brand) return res.status(404).send("Brand not found");

        await Brand.destroy({ where: { id } });

        res.status(200).send("Brand deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    createBrand,
    getAllBrands,
    updateBrand,
    getSingleBrand,
    deleteBrand,
};
