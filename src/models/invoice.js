import { Schema, model } from 'mongoose';
import Joi from 'joi';

const InvoiceSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: Object, required: true },
		phoneNumber: { type: Number, min: 4444444444, max: 9999999999, required: true },
		email: { type: String, required: true },
		task: { type: Array, required: true },
		item: { type: Array },
		status: { type: String, required: true, default: 'not paid' },
		note: { type: String },
		dueDate: { type: Date },
		amountPaid: { type: Number, default: 0 }
	},
	{
		timestamps: true
	}
);

export default model('invoice', InvoiceSchema);

export const validateInvoice = data => {
	const schema = Joi.object({
		name: Joi.string().required(),
		address: Joi.object().required(),
		phoneNumber: Joi.number().min(4444444444).max(9999999999).required().messages({
			'number.min': '"Phone number" must be valid',
			'number.max': '"Phone number" must be valid'
		}),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),
		task: Joi.array().required(),
		item: Joi.array(),
		status: Joi.string(),
		note: Joi.string(),
		dueDate: Joi.date(),
		amountPaid: Joi.number()
	});

	return schema.validate(data);
};

export const validateUpdateInvoice = data => {
	const schema = Joi.object({
		id: Joi.string().required(),
		amount: Joi.number().required()
	});

	return schema.validate(data);
};

export const validateGetInvoice = data => {
	const schema = Joi.object({
		type: Joi.string().required().valid('all', 'expired').required().messages({
			'any.only': '{{#label}} must be valid'
		})
	});

	return schema.validate(data);
};
