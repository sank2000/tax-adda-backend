import j2s from 'joi-to-swagger';

import { invoiceSchema, validateUpdateSchema } from '@models';
import invoice from 'tests/integration/constants/invoice';

const { swagger: invoiceSchemaGen } = j2s(invoiceSchema);
const { swagger: validateUpdateSchemaGen } = j2s(validateUpdateSchema);

export default {
	'/invoice/all': {
		get: {
			tags: ['invoice'],
			summary: 'get all the invoice',
			description: 'get all the invoice',
			responses: {
				200: {
					description: 'All invoices'
				},
				404: {
					description: 'No Invoices Found'
				}
			}
		}
	},
	'/invoice/expired': {
		get: {
			tags: ['invoice'],
			summary: 'get all the expired invoices',
			description: 'get all expired invoices',
			responses: {
				200: {
					description: 'All expired invoices'
				},
				404: {
					description: 'No Invoices Found'
				}
			}
		}
	},
	'/invoice/': {
		post: {
			tags: ['invoice'],
			summary: 'create an invoices',
			description: 'create a new invoice for client',
			parameters: [
				{
					in: 'body',
					name: 'body',
					description: 'invoice object that needs to be created',
					required: false,
					schema: {
						...invoiceSchemaGen,
						example: invoice[0]
					}
				}
			],
			responses: {
				200: {
					description: 'created successfully'
				},
				400: {
					description: 'Missing fields'
				}
			}
		},
		put: {
			tags: ['invoice'],
			summary: 'update an invoices',
			description: 'update an invoice of amount and status',
			parameters: [
				{
					in: 'body',
					name: 'body',
					description: 'object with amount and id',
					required: false,
					schema: {
						...validateUpdateSchemaGen,
						example: {
							id: '60f5583c5c61c0927485a89d',
							amount: 20
						}
					}
				}
			],
			responses: {
				200: {
					description: 'updated successfully'
				},
				400: {
					description: 'Missing fields'
				}
			}
		}
	}
};
