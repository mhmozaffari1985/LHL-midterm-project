-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS task_category CASCADE;

CREATE TABLE task_category (
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INTEGER REFERENCES tasks(id) NOT NULL,
  category_id INTEGER REFERENCES categories(id) NOT NULL
);