const { string, object } = require("yup");

const subcategorySchema = object().shape({
    name: string()
        .test("is-required", "Category name is required", function (value) {
            return value !== undefined;
        })
        .min(2, "Category name must be at least two characters long.")
        .max(30, "Category name must be at most 30 characters long.")
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),

    description: string()
        .test("is-required", "Description is required", function (value) {
            return value !== undefined;
        })
        .min(2, "Description must be at least two characters long.")
        .max(100, "Description must be at most 100 characters long.")
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
});

module.exports.subcategorySchema = subcategorySchema;
