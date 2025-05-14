# expenses_doa.py
# MySQL Query Functions
# Author: Eoghan Walsh

# Import PyMySQL and config file
import pymysql
import pymysql.cursors
from config import mysql as cfg


# Function to connect to the mysql database
# https://pymysql.readthedocs.io/en/latest/user/examples.html#examples
def connect():
    connection = pymysql.connect(host=cfg["host"],
                                 user=cfg["user"],
                                 password=cfg["password"],
                                 database=cfg["database"],
                                 cursorclass=pymysql.cursors.DictCursor)

    return connection


# Fuction to get all expenses
def get_all_expenses():
    conn = connect()
    # SQL query
    sql = """
    SELECT * FROM expenses_data exp
    INNER JOIN expense_tags tag
    ON exp.expense_tag = tag.tag_id
    ORDER BY exp.date
    """
    # Create cursor to run sql query
    with conn.cursor() as cursor:
        cursor.execute(sql)
        # Return all records
        return cursor.fetchall()


# Fuction to get expense by id
def get_expense_by_id(id):
    conn = connect()
    sql = """
    SELECT * FROM expenses_data exp
    INNER JOIN expense_tags tag
    ON exp.expense_tag = tag.tag_id
    WHERE exp.expense_id = %s
    """
    values = id
    with conn.cursor() as cursor:
        cursor.execute(sql, values)
        return cursor.fetchall()


# Fuction to get expenses by date
def get_expenses_by_date(start_date, end_date):
    conn = connect()
    sql = """
    SELECT * FROM expenses_data exp
    INNER JOIN expense_tags tag
    ON exp.expense_tag = tag.tag_id
    WHERE exp.date BETWEEN %s and %s
    ORDER BY exp.date
    """
    values = (start_date, end_date)
    with conn.cursor() as cursor:
        cursor.execute(sql, values)
        return cursor.fetchall()


# Fuction to search expenses by description
def search_expenses_by_desc(desc):
    conn = connect()
    sql = """
    SELECT * FROM expenses_data exp
    INNER JOIN expense_tags tag
    ON exp.expense_tag = tag.tag_id
    WHERE exp.description LIKE %s
    ORDER BY exp.date
    """
    with conn.cursor() as cursor:
        cursor.execute(sql, "%" + desc + "%")
        return cursor.fetchall()


# Function to add new expense
def add_new_expense(expense):
    conn = connect()
    sql = """
    INSERT INTO expenses_data (date, description, expense_tag, cost)
        VALUES (%s, %s, %s, %s)
    """
    values = (expense.get("date"), expense.get("description"),
              expense.get("expense_tag"), expense.get("cost"))
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        new_id = cursor.lastrowid
        expense["expense_id"] = new_id
        return expense


# Function to update expense
def update_expense(id, expense):
    conn = connect()
    sql = """
    UPDATE expenses_data
    SET date = %s, description = %s, expense_tag = %s, cost = %s
    WHERE expense_id = %s
    """
    values = (expense.get("date"), expense.get("description"),
              expense.get("expense_tag"), expense.get("cost"), id)
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        return expense


# Function to delete expense
def delete_expense(id):
    conn = connect()
    sql = """
    DELETE FROM expenses_data
    WHERE expense_id = %s
    """
    values = (id)
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        return True
