CREATE TABLE tblCliente (
codigo_cliente int PRIMARY KEY NOT NULL AUTO_INCREMENT,
nmCliente VARCHAR(150), 
CPF varchar(12), 
idade int, 
sexo CHAR(1),
dtNascimento DATETIME, 
nmRua VARCHAR(250),
nmCidade varchar(100),
nrEndereco VARCHAR(25),
cep varchar(10),
nrDDD varchar(10),
nrTelefone varchar(20)
);

CREATE TABLE tblLogin(
codigo_login int PRIMARY KEY NOT NULL AUTO_INCREMENT,
email varchar(200),
senha varchar(200),
tipo int not null,
codigo_cliente int not null,
FOREIGN KEY (codigo_cliente) REFERENCES tblCliente(codigo_cliente)
);

CREATE TABLE tblStatus(
codigo_status int primary key not null auto_increment,
tpStatus varchar(250)
);

CREATE TABLE tblQuarto (
codigo_quarto int PRIMARY KEY NOT NULL AUTO_INCREMENT, 
nrQuarto int, 
andarQ int,
tpQuarto varchar(100),
dsQuarto varchar(250), 
vlQuarto decimal,
codigo_status int not null,
FOREIGN KEY (codigo_status) REFERENCES tblStatus(codigo_status)
);

CREATE TABLE tblPagamento (
codigo_pagamento int primary key not null auto_increment,
tpPagamento varchar(100)
);

CREATE TABLE tblReserva(
codigo_reserva int primary key not null auto_increment, 
DataEntrada datetime,
DataSaida datetime,
vlQuarto decimal,
codigo_cliente int not null,
codigo_quarto int not null,
codigo_pagamento int not null,
codigo_status int not null,
FOREIGN KEY (codigo_cliente) REFERENCES tblCliente(codigo_cliente),
FOREIGN KEY (codigo_quarto) REFERENCES tblQuarto(codigo_quarto),
FOREIGN KEY (codigo_pagamento) REFERENCES tblPagamento(codigo_pagamento),
FOREIGN KEY (codigo_status) REFERENCES tblStatus(codigo_status)
);
