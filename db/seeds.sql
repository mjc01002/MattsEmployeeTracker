INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Legal'),
  ('Finance'),
  ('Management');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Engineer', '150000', 001),
  ('Sales Person', '75000', 002),
  ('Lawyer', '250000', 003),
  ('Accountant', '100000', 004),
  ('Manager', '200000', 005);

INSERT INTO employee
  (first_name, last_name, title)
VALUES
  ('James', 'Fraser', 'Engineer'),
  ('Jack', 'London', 'Sales Person'),
  ('Robert', 'Bruce', 'Lawyer'),
  ('Peter', 'Greenaway', 'Accountant'),
  ('Derek', 'Jarman', 'Manager'),
  ('Paolo', 'Pasolini', 'Engineer'),
  ('Heathcote', 'Williams', 'Engineer'),
  ('Sandy', 'Powell', 'Sales Person'),
  ('Emil', 'Zola', 'Engineer');