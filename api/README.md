# Ejecutar la API

### Requisitos:

- Node
- Postgres

## Ejecución

```
npm install
node index
```

## Archivos de configuracion (db.js)
configurar los datos de la base de datos en el archivo db.js en la carpeta api
los campos a configurar son:
- user: usuario de postgres
- password: contraseña de postgres
- database: nombre de la bd donde se encuentran las tablas (e01_cliente y e01_producto)
- host: localhost
- db_port: por default el de postgres es el 5432
- api_port: puerto por el cual escucha la api


## La Api Soporta:  
Clientes:  
- Post -> /clients con un cuerpo json con los atributos (nro_cliente, nombre, apellido, direccion,activo)
- Put -> /clients/:nro_cliente con un cuerpo json con los atributos (nombre, apellido, direccion, activo)
- Get -> /clients/:nro_cliente
- Delete -> /clients/:nro_cliente  

Productos:
- Post -> /products con un cuerpo json con los atributos (codigo_producto, marca, nombre, descripcion, precio, stock)
- Put -> /products/:codigo_producto con un cuerpo json con los atributos (marca, nombre, descripcion, precio, stock)
- Get -> /products/:codigo_producto