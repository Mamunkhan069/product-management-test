const { string, object, number, boolean } = require("yup");

const createProductSchema = object().shape({
    product_code: string()
        .required("Product code is required.")
        .test(
            "is-alphanumeric",
            "Product code must contain only letters and numbers.",
            (value) => /^[a-zA-Z0-9]+$/.test(value)
        ),
    name: string()
        .min(2, "Product name must be at least two characters long.")
        .max(50, "Product name must be at most 50 characters long.")
        .required("Product name is required.")
        .test(
            "is-valid",
            "Product name must not contain invalid characters.",
            (value) => /^[a-zA-Z0-9 _-]+$/.test(value)
        ),
    description: string()
        .min(2, "Product description must be at least two characters long.")
        .max(100, "Product description must be at most 100 characters long.")
        .required("Product description is required.")
        .test(
            "is-valid",
            "Product description must not contain invalid characters.",
            (value) => /^[a-zA-Z0-9 _-]+$/.test(value)
        ),
    price: number()
        .min(0, "Price must be at least 0.")
        .max(1000000, "Price must be at most 1,000,000.")
        .required("Price is required.")
        .test(
            "is-valid",
            "Price must contain only numbers and decimal point.",
            (value) => /^\d+(\.\d{1,2})?$/.test(value)
        ),
    discount: number()
        .min(0, "Discount must be at least 0.")
        .max(100, "Discount must be at most 100.")
        .test(
            "is-valid",
            "Discount must contain only numbers and decimal point.",
            (value) => /^\d+(\.\d{1,2})?$/.test(value)
        ),
    status: boolean().required("Status is required."),
});

module.exports = createProductSchema;
