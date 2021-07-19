/* eslint-disable quotes */
// prettier-ignore
const invoice = [
	{
		name: 'san',
		email: 'santhoshvelr@gmail.com',
		phoneNumber: '8638394728',
		address: {
			area: '171/9,Street',
			district: 'salem',
			pin_code: 636102
		},
		task: [
			{
				name: 'backend',
				rate: 30,
				hours: 5
			}
		],
		item: [
			{
				name: 'laptop',
				price: 5000,
				quantity: 1
			}
		],
		status: 'not paid',
		note: 'check book',
		dueDate: '2021-07-02',
		amountPaid: 0
	},
	{
		name: 'san2',
		email: 'santhoshvelr@gmail.com',
		phoneNumber: '8638394728',
		address: {
			area: '!71/9,kallanguthu',
			district: 'salem',
			pin_code: 636102
		},
		task: [
			{
				name: 'backend',
				rate: 30,
				hours: 5
			}
		],
		status: 'not paid',
		note: 'gPay',
		dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
	}
];

export default invoice;
