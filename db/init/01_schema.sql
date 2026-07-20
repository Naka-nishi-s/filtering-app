CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
