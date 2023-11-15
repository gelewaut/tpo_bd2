const express = require("express");
const app = express();
const config = require('./config.json')

app.use(express.json()) // -> req.body

const mongoose = require('mongoose');

const db_url = `mongodb://${config.host}:${config.db_port}/${config.db_name}`

// Connect to MongoDB
mongoose.connect(db_url);

// Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a Mongoose Schema
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  nro_cliente: Number,
  nombre: String,
  apellido: String,
  direccion: String,
  activo: Number
});

const productSchema = new Schema({
  codigo_producto: Number,
  descripcion: String,
  marca: String,
  nombre: String,
  precio: Number,
  stock: Number
})

const Client = mongoose.model('Client', clientSchema);
const Product =  mongoose.model('Product', productSchema);

///////////////////CLIENTS

// Create client
app.post("/clients", async(req, res) => {
    try {
        const {nro_cliente, nombre, apellido, direccion,activo } = req.body; 
        const newClient = new Client({
            nro_cliente: nro_cliente,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            activo: activo
          });
        await newClient.save();
        res.json(newClient);
    } catch (err) {
        console.error(err.message);
        res.json();
    }
})

//Get a client with id
app.get("/clients/:nro_cliente", async (req, res) => {
    try {
        const { nro_cliente } = req.params;
        const client = await Client.find({ nro_cliente: nro_cliente });
        res.json(client)
    } catch (error) {
        console.error(error.message);
        res.json();
    }
})

// Update Client
app.put("/clients/:nro_cliente", async (req, res) => {
    try {
        const {nro_cliente} = req.params;
        const { nombre, apellido, direccion, activo } = req.body; 
        const updatedClient = await Client.updateOne(
            { nro_cliente: nro_cliente },
            { $set: { 
                nombre: nombre,
                apellido: apellido,
                direccion: direccion,
                activo: activo} },
          );
        res.json(updatedClient);
    } catch (err) {
        console.log(err.message);
        res.json();
    }
})

// Delete a client
app.delete("/clients/:nro_cliente", async (req, res) => {
    try {
        const { nro_cliente } = req.params;
        const client = await Client.deleteMany({ nro_cliente: nro_cliente });
        res.json(client);
    } catch (error) {
        console.error(error.message);
        res.json();
    }
})


//////// PRODUCTS

// Create product
app.post("/products", async(req, res) => {
    try {
        const {codigo_producto, marca, nombre, descripcion, precio, stock } = req.body; 
        const newProduct = new Product({
            codigo_producto: codigo_producto,
            marca: marca,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            stock: stock
        })
        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.json();
    }
})

// Update Product
app.put("/products/:codigo_producto", async (req, res) => {
    try {
        const {codigo_producto} = req.params;
        const { marca, nombre, descripcion, precio, stock } = req.body; 
        const newProduct = await Product.updateOne(
            { codigo_producto: codigo_producto },
            { $set: { 
                marca: marca,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock} },
          );
        res.json(newProduct);
    } catch (err) {
        console.log(err.message);
        res.json(err.message);
    }
})

//Get a product
app.get("/products/:codigo_producto", async (req, res) => {
    try {
        const { codigo_producto } = req.params;
        const newProduct = await Product.find({ codigo_producto: codigo_producto });
        res.json(newProduct);
    } catch (error) {
        console.error(error.message);
        res.json(error.message);
    }
})


app.listen(config.api_port, ()=> {
    console.log(`Server listening on port ${config.api_port}`)
});