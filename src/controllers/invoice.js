import { Invoice } from '@models';
import { sendFailure, sendSuccess } from 'src/helpers';

/**
 *
 * New Invoice
 *
 * @route: /invoice/new
 * @method: POST
 * @requires: body
 * @returns: 'Invoice created successfully' | 'Could not add the invoice'
 *
 */

export const createInvoice = async (req, res) => {
	const { body } = req;

	const invoice = new Invoice({ ...body });
	await invoice.save();

	return sendSuccess(res, { message: 'Invoice created successfully', data: invoice });
};

export const getInvoice = async (req, res) => {
	const { type } = req.params;
	let invoices;
	if (type === 'expired') {
		invoices = await Invoice.find({
			dueDate: { $lt: new Date() }
		});
	} else {
		invoices = await Invoice.find({});
	}

	if (invoices.length === 0) {
		return sendFailure(res, { error: 'No Invoices Found' }, 404);
	}

	return sendSuccess(res, { data: invoices });
};

export const updateInvoice = async (req, res) => {
	const {
		body: { id, amount }
	} = req;

	const invoice = await Invoice.findById(id);

	if (!invoice) {
		return sendFailure(res, { error: 'Invoice not found' }, 404);
	}

	let amountToPay = 0;
	invoice.task.forEach(item => {
		amountToPay += item.rate * item.hours;
	});

	if (invoice.item) {
		invoice.item.forEach(item => {
			amountToPay += item.price * item.quantity;
		});
	}

	//remaining of already paid amount
	amountToPay -= invoice.amountPaid;

	if (invoice.status === 'paid') {
		return sendFailure(res, { error: 'Invoice already Paid' });
	}

	if (amountToPay < amount) {
		return sendFailure(res, {
			error: 'amount is higher than total invoice',
			maxAmount: amountToPay
		});
	} else if (amountToPay > amount) {
		invoice.status = 'half paid';
	} else {
		invoice.status = 'paid';
	}

	invoice.amountPaid += amount;
	await invoice.save();

	return sendSuccess(res, { message: 'Invoice updated successfully', data: invoice });
};
