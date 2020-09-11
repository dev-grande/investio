DROP DATABASE IF EXISTS investio;
CREATE DATABASE investio;
\c investio;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  username VARCHAR(30),
  password VARCHAR(100)
);

CREATE TABLE raw_data (
  user_id INT,
  date DATE, 
  transaction_id NUMERIC,
  type VARCHAR(30),
  amount NUMERIC,
  symbol VARCHAR(10),
  quantity NUMERIC,
  price NUMERIC,
  commission NUMERIC,
  reg_fee NUMERIC,
  PRIMARY KEY (user_id, transaction_id),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE ROLE test_user WITH LOGIN PASSWORD 'test_password';
GRANT ALL PRIVILEGES ON DATABASE investio TO test_user;
GRANT CONNECT ON DATABASE investio TO test_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO test_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO test_user;
