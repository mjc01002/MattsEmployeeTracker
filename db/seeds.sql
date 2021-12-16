INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Legal'),
  ('Finance'),
  ('Management');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Engineer', '150000', 1),
  ('Sales Person', '75000', 2),
  ('Lawyer', '250000', 3),
  ('Accountant', '100000', 4),
  ('Manager', '200000', 5);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 5),
  ('Jack', 'London',  2, 5),
  ('Robert', 'Bruce', 3, 5),
  ('Peter', 'Greenaway', 4, 5),
  ('Derek', 'Jarman', 5, null),
  ('Paolo', 'Pasolini', 1, 5),
  ('Heathcote', 'Williams', 1, 5),
  ('Sandy', 'Powell', 2, 5),
  ('Emil', 'Zola', 1, 5);
  