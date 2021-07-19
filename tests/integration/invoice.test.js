import request from 'supertest';

import { Invoice } from '@models';
import invoice from './constants/invoice';

let server;

describe('/invoice/', () => {
	beforeEach(() => {
		server = require('src/server');
	});
	afterEach(async () => {
		await Invoice.deleteMany({});

		await server.close();
	});

	describe('POST /new', () => {
		let payload;

		const exec = () => {
			return request(server).post('/invoice/new').send(payload);
		};

		beforeEach(() => {
			payload = { ...invoice[0] };
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
});
