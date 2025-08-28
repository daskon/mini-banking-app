import Joi from "joi";

export const transferSchema = Joi.object({
    beneficiaryAccNo: Joi.string()
        .pattern(/^\d{8,}$/)
        .required()
        .messages({
        "string.pattern.base": "Beneficiary account number must be at least 8 digits",
        }),
    amount: Joi.number()
        .greater(0)
        .required()
        .messages({
        "number.greater": "Transfer amount must be greater than 0",
        }),
    description: Joi.string().max(100).allow("").optional(),
});