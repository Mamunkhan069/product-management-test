const Color = require("./color.model");

async function createColor(req, res) {
    try {
        const { name, status } = req.body;

        const existColor = await Color.findOne({ where: { name } });
        if (existColor) return res.status(400).send("Already exist");

        const color = await Color.create({
            name,
            status,
            created_by: req.user.id,
        });

        res.status(201).send(color);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getAllColors(req, res) {
    try {
        const colors = await Color.findAll();
        res.send(colors);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function updateColor(req, res) {
    try {
        const { name, status } = req.body;
        const { colorId } = req.params;

        const color = await Color.findByPk(colorId);
        if (!color) return res.status(404).send("Color not found");

        const existColor = await Color.findOne({ where: { name } });
        if (existColor && existColor.id !== colorId)
            return res.status(400).send("Already exist");

        await color.update({
            name,
            status,
            updated_by: req.user.id,
        });

        res.send(color);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getColor(req, res) {
    try {
        const { colorId } = req.params;

        const color = await Color.findByPk(colorId);
        if (!color) return res.status(404).send("Color not found");

        res.send(color);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

// Delete a color
async function deleteColor(req, res) {
    try {
        const { colorId } = req.params;

        const color = await Color.findByPk(colorId);
        if (!color) return res.status(404).send("Color not found");

        await color.destroy();

        res.send("Color deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    createColor,
    getAllColors,
    updateColor,
    getColor,
    deleteColor,
};
