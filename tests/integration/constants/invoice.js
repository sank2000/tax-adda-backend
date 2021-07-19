/* eslint-disable quotes */
// prettier-ignore
const invoice = [
	{
		name: 'san',
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
		item: [
			{
				name: 'laptop',
				price: 30,
				qty: 5
			}
		],
		status: 'not paid',
		note: 'check book',
		dueDate: '2022-07-02',
		amountPaid: 0
	}
];

export default invoice;
