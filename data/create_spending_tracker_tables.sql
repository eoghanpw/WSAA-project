
CREATE DATABASE IF NOT EXISTS spending_tracker;
USE spending_tracker;

CREATE TABLE IF NOT EXISTS spending_tags (
    tag_id INT NOT NULL PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

INSERT INTO spending_tags (tag_id, tag_name) VALUES
(1, 'Household'),
(2, 'Leisure'),
(3, 'Loans'),
(4, 'Savings'),
(5, 'Transport'),
(6, 'Other');

CREATE TABLE IF NOT EXISTS spending_data (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    description VARCHAR(50) NOT NULL,
    tag INT NOT NULL,
    cost FLOAT NOT NULL,
    FOREIGN KEY (tag) REFERENCES spending_tags(tag_id)
);

CREATE TABLE IF NOT EXISTS budget (
    budget_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    budget_month VARCHAR(50) NOT NULL,
    amount FLOAT NOT NULL
);

INSERT INTO budget (budget_id, budget_month, amount) VALUES
(1, 'January', 3000),
(2, 'February', 3000),
(3, 'March', 3000),
(4, 'April', 3000),
(5, 'May', 3000),
(6, 'June', 3000),
(7, 'July', 3000),
(8, 'August', 3000),
(9, 'September', 3000),
(10, 'October', 3000),
(11, 'November', 3000),
(12, 'December', 3000);
