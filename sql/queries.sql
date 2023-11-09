--Queries--

-- 1 --
select e01c.nro_cliente, string_agg(concat(codigo_area, '-' ,nro_telefono), ',') as telefonos
from e01_telefono join e01_cliente e01c on e01c.nro_cliente = e01_telefono.nro_cliente
where nombre = 'Wanda' and apellido = 'Baker'
group by e01c.nro_cliente
;

--2--
select distinct e01c.nro_cliente, nombre, apellido
from e01_factura join e01_cliente e01c on e01c.nro_cliente = e01_factura.nro_cliente
;

--3--
select nro_cliente, nombre, apellido from e01_cliente
where nro_cliente not in (select distinct nro_cliente from e01_factura)
;

--4--
select distinct e01df.codigo_producto, marca, nombre, descripcion
from e01_producto join e01_detalle_factura e01df on e01_producto.codigo_producto = e01df.codigo_producto
order by e01df.codigo_producto
;

--5--
select e01c.nro_cliente, nombre, apellido, direccion, activo,
       string_agg(concat(codigo_area, '-' ,nro_telefono), ',') as telefonos
from e01_telefono join e01_cliente e01c on e01c.nro_cliente = e01_telefono.nro_cliente
group by e01c.nro_cliente, nombre, apellido, direccion, activo
;

--6--
select e01_cliente.nro_cliente, count(e01f.nro_cliente) as cant_fact
from e01_cliente left outer join e01_factura e01f on e01_cliente.nro_cliente = e01f.nro_cliente
group by e01_cliente.nro_cliente
;

--7--
select nro_factura
from e01_factura join e01_cliente e01c on e01_factura.nro_cliente = e01c.nro_cliente
where nombre = 'Pandora' and apellido = 'Tate'
;

--8--
select nro_factura
from e01_detalle_factura join e01_producto e01p on e01p.codigo_producto = e01_detalle_factura.codigo_producto
where marca = 'In Faucibus Inc.'
;

--9--
select concat(codigo_area, '-' ,nro_telefono) as telefono, e01c.nro_cliente, nombre, apellido, direccion, activo
from e01_telefono join e01_cliente e01c on e01c.nro_cliente = e01_telefono.nro_cliente
;

--10--
select nombre, apellido, coalesce(suma, 0) as total_con_iva  from e01_cliente
left join (select nro_cliente, sum(total_con_iva) as suma
            from e01_factura
            group by nro_cliente)
as aux on e01_cliente.nro_cliente = aux.nro_cliente
;