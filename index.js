const express = require('express');
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() =>
        console.log("CONNECTING TO MONGODB"))
    .catch((err) => {
        console.log("ERROR 404")
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/products', async (req,res) => {
   const products = await product.find({})
    res.render('products/index', {products: products});
})
app.get('/products/new', (req,res) => {
    res.render('products/new')
  })
  app.post('/products', async (req,res) => {
  const newProduct = new product(req.body)
  await newProduct.save();
    res.redirect('products')
  })
app.get('/products/:id', async(req,res) => {
    const { id } = req.params;
  const foundProduct = await product.findById(id);
 res.render('products/details', {foundProduct: foundProduct})
 
})
app.get('/products/:id/edit', async (req,res) => {
    const { id } = req.params;
    const foundProduct = await product.findById(id);
 res.render('products/edit',  {foundProduct: foundProduct})
})
app.put('/products/:id', async(req,res) => {
    const { id } = req.params;
  const foundProduct = await product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
  res.redirect(`/products/${foundProduct._id}`);
})
app.delete('/products/:id', async(req,res) => {
    const { id } = req.params;
    const foundProduct = await product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})