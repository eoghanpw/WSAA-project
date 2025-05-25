# spending_tracker_doa.py
# MySQL Query Functions
# Author: Eoghan Walsh

# Import PyMySQL and config file
import pymysql
import pymysql.cursors
from mysqlcfg import mysql as cfg


# Function to connect to the mysql database
# https://pymysql.readthedocs.io/en/latest/user/examples.html#examples
def connect():
    connection = pymysql.connect(host=cfg["host"],
                                 user=cfg["user"],
                                 password=cfg["password"],
                                 database=cfg["database"],
                                 cursorclass=pymysql.cursors.DictCursor)

    return connection


# Fuction to get all spending
def get_all_spending():
    conn = connect()
    # SQL query
    sql = """
    SELECT * FROM spending_data data
    INNER JOIN spending_tags tags
    ON data.tag = tags.tag_id
    ORDER BY data.date
    """
    # Create cursor to run sql query
    with conn.cursor() as cursor:
        cursor.execute(sql)
        # Return all records
        return cursor.fetchall()


# Fuction to get all spending by tag
def get_all_spending_by_tag():
    conn = connect()
    # SQL query
    sql = """
    SELECT tags.tag_name, ROUND(SUM(data.cost),2) AS total_spending
    FROM spending_data data
    INNER JOIN spending_tags tags
    ON data.tag = tags.tag_id
    GROUP BY tags.tag_id
    ORDER BY tags.tag_id
    """
    # Create cursor to run sql query
    with conn.cursor() as cursor:
        cursor.execute(sql)
        # Return all records
        return cursor.fetchall()


# Fuction to get spending by month
def get_spending_by_month(month):
    conn = connect()
    sql = """
    SELECT * FROM spending_data data
    INNER JOIN spending_tags tags
    ON data.tag = tags.tag_id
    WHERE MONTHNAME(data.date) = %s
    ORDER BY data.date
    """
    values = month
    with conn.cursor() as cursor:
        cursor.execute(sql, values)
        return cursor.fetchall()


# Fuction to get monthly spending by tag
def get_monthly_spending_by_tag(month):
    conn = connect()
    sql = """
    SELECT tags.tag_name, ROUND(SUM(data.cost),2) AS total_spending
    FROM spending_data data
    INNER JOIN spending_tags tags
    ON data.tag = tags.tag_id
    WHERE MONTHNAME(data.date) = %s
    GROUP BY tags.tag_id
    ORDER BY tags.tag_id
    """
    values = month
    with conn.cursor() as cursor:
        cursor.execute(sql, values)
        return cursor.fetchall()


# Function to add new expense
def add_new_expense(expense):
    conn = connect()
    sql = """
    INSERT INTO spending_data (date, description, tag, cost)
        VALUES (%s, %s, %s, %s)
    """
    values = (expense.get("date"), expense.get("description"),
              expense.get("tag"), expense.get("cost"))
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        new_id = cursor.lastrowid
        expense["id"] = new_id
        return expense


# Function to update expense
def update_expense(expense, id):
    conn = connect()
    sql = """
    UPDATE spending_data
    SET date = %s, description = %s, tag = %s, cost = %s
    WHERE id = %s
    """
    values = (expense.get("date"), expense.get("description"),
              expense.get("tag"), expense.get("cost"), id)
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        return expense


# Function to delete expense
def delete_expense(id):
    conn = connect()
    sql = """
    DELETE FROM spending_data
    WHERE id = %s
    """
    values = id
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        return True


# Fuction to get budget
def get_budget_by_month(month):
    conn = connect()
    sql = """
    SELECT * FROM budget
    WHERE budget_month = %s
    ORDER BY budget_id
    """
    values = month
    with conn.cursor() as cursor:
        cursor.execute(sql, values)
        return cursor.fetchall()


# Fuction to get budget by month
def get_budget():
    conn = connect()
    sql = """
    SELECT * FROM budget
    ORDER BY budget_id
    """
    with conn.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()


# Function to update budget
def update_budget(budget, id):
    conn = connect()
    sql = """
    UPDATE budget
    SET amount = %s
    WHERE budget_id = %s
    """
    values = (budget.get("amount"), id)
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        return budget
