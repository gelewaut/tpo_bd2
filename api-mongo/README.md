# Ejecutar la API

### Requisitos:

- Node
- MongoDB

## Ejecución

```
npm install
node index
```

## Archivos de configuracion (config.json)
configurar los datos de la base de datos en el json de config.json los campos a configurar son:
- api_port: puerto por el cual escucha la api
- database: nombre de la bd donde se encuentran las colecciones
- host: localhost
- db_port: por default el de mongo es el 27017


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