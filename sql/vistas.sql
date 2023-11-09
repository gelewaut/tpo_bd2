--Vistas--

--1--
create or replace view facturas_fecha as
select nro_factura, fecha from e01_factura
order by fecha
;

--2--
create or replace view prod_sin_fact as
select codigo_producto, marca, nombre, descripcion
from e01_producto
where codigo_producto not in (select codigo_producto from e01_detalle_factura)
;