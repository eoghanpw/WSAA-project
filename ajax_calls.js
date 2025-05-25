// ajax functions
function getAll(callback) {
    console.log("getAll in process");
    $.ajax({ 
        "url": "http://127.0.0.1:5000/spending", 
        "method": "GET", 
        "data": "", 
        "dataType": "JSON", 
        "success": function(result) {
            console.log("getAll success", result);
            callback(result);
        }, 
        "error": function(xhr,status,error) { 
            console.log("error: "+status+" msg:"+error); 
        } 
    }); 
}
function getAllTags(callback) {
    console.log("getAllTags in process");
    $.ajax({ 
        "url": "http://127.0.0.1:5000/spending/tags", 
        "method": "GET", 
        "data": "", 
        "dataType": "JSON", 
        "success": function(result) {
            console.log("getAllTags success");
            callback(result);
        }, 
        "error": function(xhr,status,error) { 
            console.log("error: "+status+" msg:"+error); 
        } 
    }); 
}
function getByMonth(month, callback) {
    console.log("getByMonth in process", month);
    $.ajax({ 
        "url": "http://127.0.0.1:5000/spending/"+ encodeURI(month), 
        "method": "GET", 
        "data": "", 
        "dataType": "JSON", 
        "success": function(result) {
            console.log("getByMonth success", result);
            callback(result);
        }, 
        "error": function(xhr, status, error) { 
            console.log("error: "+status+" msg:"+error);
        } 
    }); 
}
function getByMonthTags(month, callback) {
    console.log("getByMonthTags in process", month);
    $.ajax({ 
        "url": "http://127.0.0.1:5000/spending/tags/"+ encodeURI(month), 
        "method": "GET", 
        "data": "", 
        "dataType": "JSON", 
        "success": function(result) {
            console.log("getByMonthTags in process", result);
            callback(result);
        }, 
        "error": function(xhr,status,error) { 
            console.log("error: "+status+" msg:"+error); 
        } 
    }); 
}
function addExpense(expense, callback) {
    console.log("addExpense in process", expense);
    $.ajax({
        "url": "http://127.0.0.1:5000/spending",
        "method": "POST",
        "data": JSON.stringify(expense),
        "dataType": "JSON",
        "contentType": "application/json; charset=utf-8",
        "success": function(result) {
            console.log("addExpense success", result);
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("error: "+status+" msg:"+error);
        }
    });
}
function getBudget(callback) {
    console.log("getBudget in process");
    $.ajax({ 
        "url": "http://127.0.0.1:5000/budget", 
        "method": "GET", 
        "data": "", 
        "dataType": "JSON", 
        "success": function(result) {
            console.log("getBudget success", result);
            callback(result);
        }, 
        "error": function(xhr,status,error) { 
            console.log("error: "+status+" msg:"+error); 
        } 
    }); 
}
function getBudgetMonth(month, callback) {
    console.log("getBudgetMonth in process", month);
    $.ajax({ 
        "url": "http://127.0.0.1:5000/budget/"+ encodeURI(month), 
        "method": "GET", 
        "data": "", 
        "dataType": "JSON", 
        "success":function(result) {
            console.log("getBudgetMonth success", result);
            callback(result);
        }, 
        "error":function(xhr,status,error) { 
            console.log("error: "+status+" msg:"+error); 
        } 
    }); 
}
function deleteExpense(id, callback) {
    console.log("deleteExpense in process: id", id);
    $.ajax({
        "url": "http://127.0.0.1:5000/spending/"+ encodeURI(id),
        "method":"DELETE",
        "data": "",
        "dataType": "JSON",
        "contentType": "application/json; charset=utf-8",
        "success": function(result) {
            console.log("deleteExpense success", result);
            callback(result);
        },
        "error": function(xhr,status,error) {
            console.log("error: "+status+" msg:"+error);
        }
    });
}
function updateExpense(expense, callback) {
    console.log("updateExpense in process", expense);
    $.ajax({
        "url": "http://127.0.0.1:5000/spending/"+ encodeURI(expense.id),
        "method": "PUT",
        "data": JSON.stringify(expense),
        "dataType": "JSON",
        "contentType": "application/json; charset=utf-8",
        "success": function(result) {
            console.log("updateExpense success", result);
            callback(result);
        },
        "error": function(xhr,status,error) {
            console.log("error: "+status+" msg:"+error);
        }
    });
}
function updateBudget(budget, callback) {
    console.log("updateBudget in process", budget);
    $.ajax({
        "url": "http://127.0.0.1:5000/budget/"+ encodeURI(budget.budget_id),
        "method": "PUT",
        "data": JSON.stringify(budget),
        "dataType": "JSON",
        "contentType": "application/json; charset=utf-8",
        "success": function(result) {
            console.log("updateBudget success", result);
            callback(result)   
        },
        "error": function(xhr,status,error) {
            console.log("error: "+status+" msg:"+error);
        }
    });
}
