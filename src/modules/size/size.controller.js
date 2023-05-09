const Size = require("./size.model");

async function getAllSizes(req, res) {
    try {
        const sizes = await Size.findAll();
        res.send(sizes);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function createSize(req, res) {
    try {
        const { name, status } = req.body;

        const existSize = await Size.findOne({ where: { name } });
        if (existSize) return res.status(400).send("Already exist");

        const size = await Size.create({
            name,
            status,
            created_by: req.user.id,
        });

        res.status(201).send(size);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getSizeById(req, res) {
    try {
        const { id } = req.params;

        const size = await Size.findOne({ where: { id } });
        if (!size) return res.status(404).send("Size not found");

        res.send(size);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function updateSize(req, res) {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const size = await Size.findOne({ where: { id } });
        if (!size) return res.status(404).send("Size not found");

        const updatedSize = await size.update({
            name,
            status,
            updated_by: req.user.id,
        });

        res.send(updatedSize);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function deleteSize(req, res) {
    try {
        const { id } = req.params;

        const size = await Size.findOne({ where: { id } });
        if (!size) return res.status(404).send("Size not found");

        await size.destroy();

        res.send("Size deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    getAllSizes,
    createSize,
    getSizeById,
    updateSize,
    deleteSize,
};
