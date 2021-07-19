import request from 'supertest';

import { Invoice } from '@models';
import invoices from './constants/invoice';

let server;

describe('/invoice/', () => {
	beforeEach(() => {
		server = require('src/server');
	});
	afterEach(async () => {
		await Invoice.deleteMany({});

		await server.close();
	});

	describe('POST /', () => {
		let payload;

		const exec = () => {
			return request(server).post('/invoice/').send(payload);
		};

		beforeEach(() => {
			payload = { ...invoices[0] };
		});

		it('should return 400 if some field are missing', async () => {
			delete payload.email;
			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('should return 200 if invoice created', async () => {
			const res = await exec();

			expect(res.status).toBe(200);

			const invoices = await Invoice.find({});
			expect(invoices).toHaveLength(1);
		});
	});

	describe('GET /', () => {
		let path;
		const exec = () => {
			return request(server).get(path);
		};

		beforeEach(() => {
			path = '/invoice/all';
		});

		it('should return 400 if param not valid', async () => {
			path = '/invoice/test';
			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('should return 404 if no invoice found', async () => {
			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.body).toHaveProperty('error');
		});

		it('should return 200 with all invoices', async () => {
			await Invoice.insertMany(invoices);
			const res = await exec();

			expect(res.status).toBe(200);
			expect(res.body.data).toHaveLength(invoices.length);
		});

		it('should return 200 with expired invoices', async () => {
			await Invoice.insertMany(invoices);

			path = '/invoice/expired';
			const res = await exec();

			expect(res.status).toBe(200);
			expect(res.body.data).toHaveLength(1);
		});
	});

	describe('put /', () => {
		let payload;
		const exec = () => {
			return request(server).put('/invoice/').send(payload);
		};

		it('should return 400 if payload is missing', async () => {
			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('should return 404 if no invoice found', async () => {
			payload = {
				id: '6075c3047b44770fd07e1225',
				amount: 20
			};
			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.body).toHaveProperty('error');
		});

		it('should return 400 if invoice already paid', async () => {
			const invoice = new Invoice({
				...invoices[0],
				status: 'paid'
			});
			await invoice.save();

			payload = {
				amount: 2,
				id: invoice.id
			};
			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.body.error).toBe('Invoice already Paid');
		});

		it('should return 400 if amount is higher than invoice', async () => {
			const invoice = new Invoice(invoices[0]);
			await invoice.save();

			payload = {
				amount: 1000000,
				id: invoice.id
			};
			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.body.error).toBe('amount is higher than total invoice');
		});

		it('should return 200 with status halfPaid', async () => {
			const invoice = new Invoice(invoices[0]);
			await invoice.save();

			const amount = 1;

			payload = {
				amount,
				id: invoice.id
			};

			const res = await exec();

			expect(res.status).toBe(200);

			const updatedInvoice = await Invoice.findById(invoice.id);
			expect(updatedInvoice.amountPaid).toBe(amount);
			expect(updatedInvoice.status).toBe('half paid');
		});

		it('should return 200 with status paid', async () => {
			const invoice = new Invoice({
				...invoices[1],
				task: [invoices[1].task[0]],
				item: []
			});
			await invoice.save();

			const amount = invoices[1].task[0].rate * invoices[1].task[0].hours;

			payload = {
				amount,
				id: invoice.id
			};

			const res = await exec();

			expect(res.status).toBe(200);

			const updatedInvoice = await Invoice.findById(invoice.id);
			expect(updatedInvoice.amountPaid).toBe(amount);
			expect(updatedInvoice.status).toBe('paid');
		});
	});
});
