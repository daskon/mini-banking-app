import Joi from "joi";

export const transferSchema = Joi.object({
    beneficiaryAccNo: Joi.number().min(8).required(),
    amount: Joi.number().greater(0).required(),
    description: Joi.string().max(100).allow("").required(),
    beneficiaryBankName: Joi.string().required(),
    fromAccountId: Joi.number().required(),
});