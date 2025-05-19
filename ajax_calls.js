function getAll(callback){ 
    $.ajax({ 
        "url": "http://127.0.0.1:5000/spending", 
        "method":"GET", 
        "data":"", 
        "dataType": "JSON", 
        "success":function(result){ 
            callback(result) 
  
        }, 
        "error":function(xhr,status,error){ 
            console.log("error: "+status+" msg:"+error); 
        } 
    }); 
}
function getByMonth(month, callback){ 
    $.ajax({ 
        "url": "http://127.0.0.1:5000/spending/"+encodeURI(month), 
        "method":"GET", 
        "data":"", 
        "dataType": "JSON", 
        "success":function(result){ 
            callback(result) 
  
        }, 
        "error":function(xhr,status,error){ 
            console.log("error: "+status+" msg:"+error); 
        } 
    }); 
}
function addExpense(expense, callback){
    console.log(JSON.stringify(expense));
    $.ajax({
        "url": "http://127.0.0.1:5000/spending",
        "method":"POST",
        "data":JSON.stringify(expense),
        "dataType": "JSON",
        contentType: "application/json; charset=utf-8",
        "success":function(result){
            //console.log(result);
            callback(result)  
        },
        "error":function(xhr,status,error){
            console.log("error: "+status+" msg:"+error);
        }
    });
}