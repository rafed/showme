create database if not exists showme;
use showme;

drop table Rating;
drop table Citation_snippet;
drop table Edge;
drop table Author;
drop table Node;
drop table User;

create table if not exists User(
	email varchar(150),
	password varchar (65) not null,
	created datetime not null,

	primary key(email)
);

create table if not exists Node(
	id bigint not null AUTO_INCREMENT,
	title varchar (400),
	journal varchar (150),
	volume varchar (10),
	pages varchar (10),
	year year,
	-- pdfLink varchar (200),

	primary key (id)
);

create table if not exists Author(
	id bigint not null AUTO_INCREMENT,
	name varchar (100),
	node_id bigint (30),

	primary key (id),  
	foreign key (node_id) references Node(id)
);

create table if not exists Edge(
	id bigint AUTO_INCREMENT,
	sourcenode_id bigint (20),
	targetnode_id bigint (20),

	primary key (id),
	foreign key (sourcenode_id) references Node(id),
	foreign key (targetnode_id) references Node(id)	
);

create table if not exists Citation_snippet(
	id bigint not null AUTO_INCREMENT,
	edge_id bigint (30),
	text text,

	primary key (id),
	foreign key (edge_id) references Edge(id)
);

create table if not exists Rating(
	email_id varchar (150),
	edge_id bigint (50),
	value tinyint,

	primary key (email_id, edge_id),
	foreign key (email_id) references User(email),
	foreign key (edge_id) references Edge(id)
);
