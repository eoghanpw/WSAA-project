# rest_server.py
# Author: Eoghan Walsh

from flask import Flask, request, jsonify  # url_for, redirect, abort
import budget_planner_dao as sql

app = Flask(__name__, static_url_path="", static_folder="staticpages")


@app.route("/")
def index():
    return "Hello"


# Get all expenses
@app.route("/expenses", methods=["GET"])
def get_all_expenses():
    # return "Get all expenses"
    return jsonify(sql.get_all_expenses())


# Search expense by id
@app.route("/expenses/<int:id>", methods=["GET"])
def search_expenses(id):
    return f"Searching expense {id}"


# Create expense
@app.route("/expenses", methods=["POST"])
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
def delete_expense(id):
    return jsonify(sql.delete_expense(id))


if __name__ == "__main__":
    app.run(debug=True)
