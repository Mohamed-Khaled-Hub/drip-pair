CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    founded DATE,
    links JSONB,
    founder VARCHAR(255)
  );

CREATE TABLE shoes (
    id SERIAL PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    brand_id INT REFERENCES brands (id) ON DELETE CASCADE,
    price DECIMAL(10, 2),
    sizes INTEGER[],
    colors JSONB
  );

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    NAME JSONB NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL,
    address TEXT,
    dob DATE,
    phone VARCHAR(20),
    cart JSONB,
    last_logged_in TIMESTAMP,
    logged_in TIMESTAMP,
    ip JSONB
  );