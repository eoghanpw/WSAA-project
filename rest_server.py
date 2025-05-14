# rest_server.py
# Author: Eoghan Walsh

from flask import Flask, request, jsonify  # url_for, redirect, abort
from flask_cors import CORS, cross_origin
import budget_planner_dao as sql

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__, static_url_path="", static_folder="staticpages")


@app.route("/")
@cross_origin()
def index():
    return "Hello"


# Get all expenses
@app.route("/expenses", methods=["GET"])
@cross_origin()
def get_all_expenses():
    # return "Get all expenses"
    return jsonify(sql.get_all_expenses())


# Search expense by id
@app.route("/expenses/<int:id>", methods=["GET"])
@cross_origin()
def get_expense_by_id(id):
    # return f"Searching expense {id}"
    return jsonify(sql.get_expense_by_id(id))


# Search expense by date
@app.route("/expenses/<start_date>/<end_date>", methods=["GET"])
@cross_origin()
def get_expenses_by_date(start_date, end_date):
    # return f"Searching expense {id}"
    return jsonify(sql.get_expenses_by_date(start_date, end_date))


# Search expense by description
@app.route("/expenses/<desc>", methods=["GET"])
@cross_origin()
def search_expenses_by_desc(desc):
    # return f"Searching expense {id}"
    return jsonify(sql.search_expenses_by_desc(desc))


# Create expense
@app.route("/expenses", methods=["POST"])
@cross_origin()
def add_expense():
    expense_json = request.json
    new_expense = {}
    new_expense["date"] = expense_json["date"]
    new_expense["description"] = expense_json["description"]
    new_expense["expense_tag"] = expense_json["expense_tag"]
    new_expense["cost"] = expense_json["cost"]
    return jsonify(sql.add_new_expense(new_expense))


# Update expense
@app.route("/expenses/<int:id>", methods=["PUT"])
@cross_origin()
def update_expense(id):
    expense_json = request.json
    updated_expense = {}
    updated_expense["date"] = expense_json["date"]
    updated_expense["description"] = expense_json["description"]
    updated_expense["expense_tag"] = expense_json["expense_tag"]
    updated_expense["cost"] = expense_json["cost"]
    return jsonify(sql.update_expense(id, updated_expense))


# Delete expense
@app.route("/expenses/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_expense(id):
    return jsonify(sql.delete_expense(id))


if __name__ == "__main__":
    app.run(debug=True)
