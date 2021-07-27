-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS task_category CASCADE;

CREATE TABLE task_category (
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);
