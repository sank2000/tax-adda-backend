import { Invoice } from '@models';
import { sendSuccess } from 'src/helpers';

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
