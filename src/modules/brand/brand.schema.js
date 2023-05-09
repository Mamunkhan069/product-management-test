const { string, object, number } = require("yup");

const brandValidationSchema = object({
    name: string().trim().required().min(2).max(50),
    status: number().integer().oneOf([0, 1]).default(1),
});

module.exports = brandValidationSchema;
