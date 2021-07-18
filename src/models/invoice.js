import { Schema, model } from 'mongoose';
import Joi from 'joi';

const InvoiceSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: Object, required: true },
		phoneNumber: { type: Number, min: 4444444444, max: 9999999999, required: true },
		email: { type: String, required: true, unique: true },
		task: { type: Array, required: true },
		item: { type: Array, required: true },
		status: { type: String, required: true },
		note: { type: String, required: true },
		dueDate: { type: Date, required: true },
		amountPaid: { type: Number, required: true, default: 0 }
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
			'number.min': '"Mobile number" must be valid',
			'number.max': '"Mobile number" must be valid'
		}),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required(),
		task: Joi.array().required(),
		item: Joi.array().required(),
		status: Joi.string().required(),
		note: Joi.string().required(),
		dueDate: Joi.date().required(),
		amountPaid: Joi.number().required()
	});

	return schema.validate(data);
};
