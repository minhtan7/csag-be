const mongoose = require('mongoose');
const Form = require('./Models/Form');
const User = require('./Models/User');
const Order = require('./Models/Order');
require('dotenv').config();
const faker = require('faker/locale/vi');
const bcrypt = require('bcryptjs');

//constants
const CITY = 'Ho Chi Minh City';
const mongoURI = process.env.MONGODB_URI;
const USER_NUM = 30;
const STARTING_PHONE_NUM = ['090', '093', '097', '035', '036', '037'];
/*
geo range

10.7400 -> 10.8100 = 700
106.6000 -> 106.7000 =1000
*/

//global variables

mongoose
	.connect(mongoURI, {
		// some options to deal with deprecated warning
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`Mongoose connected to ${mongoURI}`);
		generateData();
	})
	.catch((err) => console.log(err));

const generateGeo = () => {
	return {
		lng: (Math.random() * 700) / 10000 + 10.74,
		lat: (Math.random() * 1000) / 10000 + 106.6,
	};
};

const generateName = () => {
	let name = faker.name.findName();
	let splits = name.split(' ');
	splits.unshift(splits.splice(splits.length - 1, 1)[0]);
	name = splits.join(' ');
	return name;
};

const generatePhone = () => {
	return faker.random.arrayElement(STARTING_PHONE_NUM) + Math.floor(Math.random() * 10000000);
};

const generateUsers = async (num, roles) => {
	let users = [];

	for (let i = 0; i < num; i++) {
		const phones = users.map((item) => item.phone);
		const emails = users.map((item) => item.email);
		let newPhone = phones[0] || generatePhone();
		let newEmail = emails[0] || faker.internet.email();
		while (phones.length > 0 && phones.includes(newPhone)) {
			newPhone = generatePhone();
		}
		while (emails.length > 0 && emails.includes(newEmail)) {
			newEmail = faker.internet.email();
		}
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash('123', salt);
		users.push({
			name: generateName(),
			password,
			email: newEmail,
			role: faker.random.arrayElement(roles),
			phone: newPhone,
			address: 'To be added',
			geocode: generateGeo(),
			city: 'Ho Chi Minh City',
		});
	}
	console.log('Creating users...');
	await Promise.all(
		users.map(async (item) => {
			console.log(item);
			let user = await User.create({ ...item });
			console.log(`User ${user.name} created!`);
		})
	);
};

const generateData = async () => {
	// await User.collection.drop();
	await Order.collection.drop();
	// await Form.collection.drop();
	// await generateUsers(2500,  ['giver', 'recipient']); //no shipper
	// await generateUsers(200, ['shipper']);
	// await generateForm(2000);
	await generateOrder(200);
};

const generateForm = async (num) => {
	const types = ['give', 'need'];
	const statuses = ['ongoing', 'done'];
	let forms = [];
	const users = await User.find();
	const givers = users.filter((item) => item.role === 'giver');
	const recipients = users.filter((item) => item.role === 'recipient');
	for (let i = 0; i < num; i++) {
		const type = faker.random.arrayElement(types);
		let userId;
		if (type === 'give') {
			userId = faker.random.arrayElement(givers)._id;
		} else {
			userId = faker.random.arrayElement(recipients)._id;
		}
		forms.push({
			type,
			userId,
			items: generateItem(faker.random.number({ min: 1, max: 5 })),
			note: faker.lorem.paragraph(10),
			status: faker.random.arrayElement(statuses),
		});
	}
	await Promise.all(
		forms.map(async (item, index) => {
			console.log(item);
			let form = await Form.create({ ...item });
			console.log(`Form #${index + 1} created!`);
		})
	);
};

const generateItem = (num) => {
	const menu = {
		food: {
			items: [
				{ type: 'ramen', text: 'Mì gói', unit: 'thùng', max: 3 },
				{ type: 'rice', text: 'Gạo', unit: 'kg', max: 10 },
				{ type: 'milk', text: 'Sữa', unit: 'hộp/lon', notePlaceholder: 'Ví dụ: sữa tươi, sữa đặc, sữa bột...' },
				{ type: 'egg', text: 'Trứng', unit: 'quả', max: 30 },
				{ type: 'vegetable', text: 'Rau củ', unit: 'kg', max: 5 },
				{ type: 'spice', text: 'Gia vị', unit: 'phần', notePlaceholder: 'Ví dụ: muối, đường, bột ngọt,...' },
				// { type: 'other', text: 'Khác', unit: '' },
			],
			text: 'Lương thực, thực phẩm',
		},
		household: {
			items: [
				{ type: 'clothing', text: 'Quần áo', unit: 'bộ', notePlaceholder: 'Ví dụ: quần áo trẻ em 2 tuổi.' },
				{ type: 'stove', text: 'Bếp', unit: 'chiếc', notePlaceholder: 'Ví dụ: Bếp điện, bếp gas mini.' },
				// { type: 'other', text: 'Khác', unit: '' },
			],

			text: 'Đồ dùng gia đình',
		},
		medical: {
			items: [
				{ type: 'mask', text: 'Khẩu trang', unit: 'chiếc' },
				{ type: 'disinfectant', text: 'Cồn khử trùng', unit: 'chai' },
				// { type: 'other', text: 'Khác', unit: '' },
			],

			text: 'Đồ dùng y tế',
		},
	};
	let items = [];
	while (items.length < num) {
		const names = items.map((item) => item.name);
		let name;
		let category;
		let item;
		while (!name || names.includes(name)) {
			category = faker.random.arrayElement(Object.keys(menu));
			item = faker.random.arrayElement(menu[category].items);
			name = item.text;
		}
		items.push({ category, name, quantity: faker.random.number({ min: 1, max: 5 }), unit: item.unit });
	}
	return items;
};

const generateOrder = async (num) => {
	const deliveryMethods = ['recipient', 'giver', 'shipper'];
	const statuses = ['pending', 'pickup', 'delivering', 'done'];
	const statuses_2 = ['pending', 'done'];
	const shippers = await User.find({ role: 'shipper' });
	const forms = await Form.find();
	const givers = await User.find({ role: 'giver' });
	const recipients = await User.find({ role: 'recipient' });
	const selectedForms = faker.random.arrayElements(forms, num);
	await Promise.all(
		selectedForms.map(async (item, index) => {
			let order = {};
			console.log('Creating order #' + (index + 1));
			order.deliveryMethod = faker.random.arrayElement(deliveryMethods);
			if (order.deliveryMethod === 'shipper') {
				order.status = faker.random.arrayElement(statuses);
			} else {
				order.status = faker.random.arrayElement(statuses_2);
			}
			order.status = faker.random.arrayElement(statuses);
			order.form = item._id;
			if (item.type === 'give') {
				order.from = item.userId;
				order.to = faker.random.arrayElement(recipients);
			} else {
				order.to = item.userId;
				order.from = faker.random.arrayElement(givers);
			}
			if (order.deliveryMethod === 'shipper' && order.status !== 'pending') {
				order.shipperId = faker.random.arrayElement(shippers);
			}
			Order.create(order);
		})
	);
};
