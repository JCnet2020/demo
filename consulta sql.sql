


USE DBPRUEBA;

CREATE TABLE PROVEEDORES(
COD_PROVEEDOR INT IDENTITY(1,1) NOT NULL,
PROVEEDOR VARCHAR(200) NULL,
DIRECCION VARCHAR(200) NULL,
TELEFONO VARCHAR(200) NULL
);
ALTER TABLE PROVEEDORES
	ADD CONSTRAINT PK_TABLE_1 PRIMARY KEY(COD_PROVEEDOR);


create procedure sp_listar
as
begin
	select * from PROVEEDORES
end

create procedure sp_listar_by_codigo
@codigo_proveedor int
as
begin
	select * from PROVEEDORES where COD_PROVEEDOR = @codigo_proveedor;
end

create procedure sp_agregar
@proveedor varchar(200),
@direccion varchar(200),
@telefono varchar(200)
as
begin
	insert into PROVEEDORES values (@proveedor,@direccion,@telefono);
end

create procedure sp_actualizar
@cod_proveedor int,
@proveedor varchar(200),
@direccion varchar(200),
@telefono varchar(200)
as
begin
	update PROVEEDORES
	set PROVEEDOR = @proveedor,
	    DIRECCION = @direccion,
		TELEFONO = @telefono
		where COD_PROVEEDOR = @cod_proveedor;
end


create procedure sp_eliminar
@cod_proveedor int
as
begin
	delete from PROVEEDORES where COD_PROVEEDOR = @cod_proveedor;
end