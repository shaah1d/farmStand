const mongoose = require('mongoose');

const product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() =>
        console.log("CONNECTING TO MONGODB"))
    .catch((err) => {
        console.log("ERROR 404")
    })


const seedProducts = [
    { name: 'Tomato', price: 2.5, category: 'Vegetables' },
    { name: 'Apple', price: 1.0, category: 'Fruits' },
    { name: 'Milk', price: 3.0, category: 'Dairy' },
    { name: 'Broccoli', price: 1.8, category: 'Vegetables' },
    { name: 'Banana', price: 0.8, category: 'Fruits' }
];

product.insertMany(seedProducts).then((p)=> {console.log(p)})