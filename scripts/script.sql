CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS adresses;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS wishlists;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS comments;

CREATE TABLE user_roles (
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (id)
);
-- TODO: Insert roles

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role UUID NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_role_fkey FOREIGN KEY (role) REFERENCES user_roles (id)
);

CREATE TABLE adresses (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    CONSTRAINT adresses_pkey PRIMARY KEY (id),
    CONSTRAINT adresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255) NOT NULL,
    invoice JSON, -- TODO: Define invoice type
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE wishlists (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    list UUID[] NULL,
    CONSTRAINT wishlists_pkey PRIMARY KEY (id),
    CONSTRAINT wishlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
);

CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_ht DECIMAL(10, 2) NOT NULL,
    price_ttc DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    token VARCHAR(255) NOT NULL,
    category UUID NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_category_fkey FOREIGN KEY (category) REFERENCES categories (id)
);

CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    product_id UUID NOT NULL,
    comment TEXT NOT NULL,
    rating SMALLINT NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT comments_product_id_fkey FOREIGN KEY (product_id) REFERENCES products (id)
);