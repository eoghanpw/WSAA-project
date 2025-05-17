import pymysql
import pymysql.cursors
from config import mysql as cfg


def connect():
    connection = pymysql.connect(host=cfg["host"],
                                 user=cfg["user"],
                                 password=cfg["password"],
                                 database=cfg["database"],
                                 cursorclass=pymysql.cursors.DictCursor)

    return connection


# Fuction to get spending by tag
def get_spending_by_tag(tag):
    conn = connect()
    sql = """
    SELECT * FROM spending_data data
    INNER JOIN spending_tags tags
    ON data.tag = tags.tag_id
    WHERE data.tag = %s
    ORDER BY data.date
    """
    values = tag
    with conn.cursor() as cursor:
        cursor.execute(sql, values)
        print(cursor.fetchall())
        return cursor.fetchall()


if __name__ == '__main__':
    get_spending_by_tag(1)
