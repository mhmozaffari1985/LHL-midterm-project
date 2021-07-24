-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  task_title VARCHAR(255) NOT NULL,
  task_description VARCHAR(255),
  deleted boolean NOT NULL DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  status_id INTEGER REFERENCES statuses(id) NOT NULL
);