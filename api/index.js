const express = require("express");
const app = express();
const pool = require("./db");
const config = require('./config.json')

app.use(express.json()) // -> req.body

///////////////////CLIENTS

// Create client
app.post("/clients", async(req, res) => {
    try {
        const {nro_cliente, nombre, apellido, direccion,activo } = req.body; 
        const newClient = 
            await pool.query("INSERT INTO E01_CLIENTE (nro_cliente,nombre,apellido,direccion,activo) "+ 
            "VALUES ($1,$2,$3,$4,$5) RETURNING *", 
            [nro_cliente, nombre, apellido, direccion, activo]);
        res.json(newClient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.json();
    }
})

//Get a client with id
app.get("/clients/:nro_cliente", async (req, res) => {
    try {
        const { nro_cliente } = req.params;
        const client = 
            await pool.query(
                "SELECT * FROM E01_CLIENTE WHERE nro_cliente = $1 ",
                [nro_cliente]);

        res.json(client.rows[0]);
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
        const updateClient = await pool.query(
            "update e01_cliente " +
            "set (nombre,apellido,direccion,activo) = ($1,$2,$3,$4) " +
            "where nro_cliente = $5 returning *",
            [nombre, apellido, direccion, activo, nro_cliente]
        )
        res.json(updateClient.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.json();
    }
})

// Delete a client
app.delete("/clients/:nro_cliente", async (req, res) => {
    try {
        const { nro_cliente } = req.params;
        const deleteClient = 
            await pool.query(
                "DELETE FROM e01_cliente WHERE nro_cliente = $1 ",
                [nro_cliente]);

        res.json("CLIENTE ELIMINADO EXITOSAMENTE");
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
        const newProduct = 
            await pool.query("INSERT INTO e01_producto (codigo_producto, marca, nombre, descripcion, precio, stock) "+ 
            "VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", 
            [codigo_producto, marca, nombre, descripcion, precio, stock]);
        res.json(newProduct.rows[0]);
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
        const updateClient = await pool.query(
            "update e01_producto " +
            "set (marca, nombre, descripcion, precio, stock) = ($1,$2,$3,$4,$5) " +
            "where codigo_producto = $6 RETURNING *",
            [marca, nombre, descripcion, precio, stock, codigo_producto]
        )
        res.json(updateClient.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.json();
    }
})

//Get a product
app.get("/products/:codigo_producto", async (req, res) => {
    try {
        const { codigo_producto } = req.params;
        const client = 
            await pool.query(
                "SELECT * FROM e01_producto WHERE codigo_producto = $1 ",
                [codigo_producto]);

        res.json(client.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.json();
    }
})


app.listen(config.api_port, ()=> {
    console.log(`Server listening on port ${config.api_port}`)
});