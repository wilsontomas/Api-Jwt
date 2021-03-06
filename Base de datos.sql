USE [Productos]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Producto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
	[Cantidad] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Roles](
	[IdRole] [int] IDENTITY(1,1) NOT NULL,
	[NombreRoll] [varchar](160) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdRole] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuarios](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Gmail] [varchar](150) NOT NULL,
	[Clave] [varchar](250) NOT NULL,
	[RoleId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Producto] ON 

INSERT [dbo].[Producto] ([Id], [Nombre], [Cantidad]) VALUES (2, N'Galletas', 2)
INSERT [dbo].[Producto] ([Id], [Nombre], [Cantidad]) VALUES (4, N'Arroz', 1)
INSERT [dbo].[Producto] ([Id], [Nombre], [Cantidad]) VALUES (5, N'Agua', 1)
INSERT [dbo].[Producto] ([Id], [Nombre], [Cantidad]) VALUES (6, N'Pan sobado', 100)
SET IDENTITY_INSERT [dbo].[Producto] OFF
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([IdRole], [NombreRoll]) VALUES (1, N'Usuario')
INSERT [dbo].[Roles] ([IdRole], [NombreRoll]) VALUES (2, N'Admin')
INSERT [dbo].[Roles] ([IdRole], [NombreRoll]) VALUES (3, N'Moderador')
SET IDENTITY_INSERT [dbo].[Roles] OFF
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([IdUsuario], [Gmail], [Clave], [RoleId]) VALUES (1, N'wlsonpumm@gmail.com', N'$2a$10$RQOjJAJdKE5c/EuvQqTPhuPhTtuoXRqKAspLFwxZE/zIJkJH3VzL2', 1)
INSERT [dbo].[Usuarios] ([IdUsuario], [Gmail], [Clave], [RoleId]) VALUES (2, N'Delarosa@gmail.com', N'$2a$10$O5L7r53Gf5DoBCMY2M9oTuhguR2qSjxuHzizQ/J55JNPD2TOFOAnW', 1)
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([IdRole])
GO
/****** Object:  StoredProcedure [dbo].[addUser]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[addUser]
(@Gmail varchar(150), @Clave varchar(250))
as begin set nocount on
 insert into Usuarios (Gmail, Clave, RoleId) values (@Gmail,@Clave,1)
end
GO
/****** Object:  StoredProcedure [dbo].[CreateProduct]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[CreateProduct]
(@Nombre varchar(150), @Cantidad int)
as begin
set nocount on
insert into Producto (Nombre,Cantidad) values (@Nombre,@Cantidad)
end
GO
/****** Object:  StoredProcedure [dbo].[DeleteProductById]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[DeleteProductById]
(@Id int)
as begin set nocount on
delete from Producto where Id = @Id
end
GO
/****** Object:  StoredProcedure [dbo].[EditProductById]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[EditProductById]
(@Id int, @Nombre varchar(150), @Cantidad int)
as begin set nocount on
update Producto set Nombre=@Nombre, Cantidad = @Cantidad where Id =  @Id 
end
GO
/****** Object:  StoredProcedure [dbo].[GetProducts]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetProducts]
as begin 
set nocount on
select p.Id, p.Nombre, p.Cantidad from Producto p
end
GO
/****** Object:  StoredProcedure [dbo].[GetProductsById]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetProductsById]
(@id int)
as begin
select p.Id, p.Nombre, p.Cantidad from Producto p where p.Id = @id
end
GO
/****** Object:  StoredProcedure [dbo].[verifyUser]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[verifyUser]
(@Gmail varchar(150))
as begin set nocount on
select us.IdUsuario, us.Gmail, us.Clave,us.RoleId from Usuarios us where Gmail = @Gmail
end
GO
/****** Object:  StoredProcedure [dbo].[verifyUserCount]    Script Date: 15/10/2021 4:43:19 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[verifyUserCount]
(@Gmail varchar(150))
as begin set nocount on
select COUNT(*) as conteo from Usuarios us where us.Gmail = @Gmail
end
GO
