# rest_server.py
# Author: Eoghan Walsh

from flask import Flask, request, jsonify, abort  # render_template url_for, redirect
from flask_cors import CORS, cross_origin
import spending_tracker_dao as dao

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__, static_url_path="", static_folder="staticpages")


# Index
@app.route("/")
@cross_origin()
def index():
    return ("Spending Tracker")


# Get all spending
@app.route("/spending", methods=["GET"])
@cross_origin()
def get_all_spending():
    return jsonify(dao.get_all_spending())


# Get all spending by tag
@app.route("/spending/tags", methods=["GET"])
@cross_origin()
def get_all_spending_by_tag():
    return jsonify(dao.get_all_spending_by_tag())


# Get spending by month
@app.route("/spending/<month>", methods=["GET"])
@cross_origin()
def get_spending_by_month(month):
    return jsonify(dao.get_spending_by_month(month))


# Get monthly spending by tag
@app.route("/spending/tags/<month>", methods=["GET"])
@cross_origin()
def get_monthly_spending_by_tag(month):
    return jsonify(dao.get_monthly_spending_by_tag(month))


# Create expense
@app.route("/spending", methods=["POST"])
@cross_origin()
def add_expense():
    expense_json = request.json
    new_expense = {}
    if expense_json["date"] == "":
        print("missing date")
        abort(400)
    new_expense["date"] = expense_json["date"]
    if expense_json["description"] == "":
        print("missing description")
        abort(400)
    new_expense["description"] = expense_json["description"]
    if expense_json["tag"] is None:
        print("missing tag")
        abort(400)
    new_expense["tag"] = expense_json["tag"]
    if expense_json["cost"] is None:
        print("missing cost")
        abort(400)
    new_expense["cost"] = expense_json["cost"]
    return jsonify(dao.add_new_expense(new_expense))


# Update expense
@app.route("/spending/<int:id>", methods=["PUT"])
@cross_origin()
def update_expense(id):
    expense_json = request.json
    updated_expense = {}
    updated_expense["date"] = expense_json["date"]
    updated_expense["description"] = expense_json["description"]
    updated_expense["tag"] = expense_json["tag"]
    updated_expense["cost"] = expense_json["cost"]
    return jsonify(dao.update_expense(updated_expense, id))


# Delete expense
@app.route("/spending/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_expense(id):
    return jsonify(dao.delete_expense(id))


# Get budget
@app.route("/budget", methods=["GET"])
@cross_origin()
def get_budget():
    return jsonify(dao.get_budget())


# Get budget by month
@app.route("/budget/<month>", methods=["GET"])
@cross_origin()
def get_budget_by_month(month):
    return jsonify(dao.get_budget_by_month(month))


# Update budget
@app.route("/budget/<int:id>", methods=["PUT"])
@cross_origin()
def update_budget(id):
    budget_json = request.json
    updated_budget = {}
    updated_budget["amount"] = budget_json["amount"]
    return jsonify(dao.update_budget(updated_budget, id))


if __name__ == "__main__":
    app.run(debug=True)
