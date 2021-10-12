create database Productos
use Productos

create table Producto(
Id int identity(1,1) not null primary key,
Nombre varchar(150) not null,
Cantidad int not null 
)
create table Roles(
IdRole int identity(1,1) not null primary key,
NombreRoll varchar(160)
)
create table Usuarios(
IdUsuario int identity(1,1) not null primary key,
Gmail varchar(150) not null,
Clave varchar(250) not null,
RoleId int foreign key references Roles(IdRole)
)

select * from Roles

create procedure dbo.GetProducts
as begin 
set nocount on
select p.Id, p.Nombre, p.Cantidad from Producto p
end

create procedure dbo.GetProductsById
(@id int)
as begin
select p.Id, p.Nombre, p.Cantidad from Producto p where p.Id = @id
end

create procedure dbo.CreateProduct
(@Nombre varchar(150), @Cantidad int)
as begin
set nocount on
insert into Producto (Nombre,Cantidad) values (@Nombre,@Cantidad)
end

create procedure EditProductById
(@Id int, @Nombre varchar(150), @Cantidad int)
as begin set nocount on
update Producto set Nombre=@Nombre, Cantidad = @Cantidad where Id =  @Id 
end

Create procedure dbo.DeleteProductById
(@Id int)
as begin set nocount on
delete from Producto where Id = @Id
end

