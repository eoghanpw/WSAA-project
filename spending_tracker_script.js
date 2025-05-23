        // Function to show all spending on button click
        // https://how.dev/answers/how-to-display-a-table-on-button-click-in-javascript
        function showAllSpendingTable() {
            var table = document.getElementById("spendingTable");
            if (table.style.display === "none" || table.style.display === "") {
                table.style.display = "table"; // Show the table if it's hidden
                showViewTotalsBudget();
                showSearch();
                clearTable();
                getAll(processGetResponse);
                getAllTags(processGetTagResponse);
                getBudget(processGetTotalBudgetResponse);
            } else {
                clearTable();
                getAll(processGetResponse);
                getAllTags(processGetTagResponse);
                getBudget(processGetTotalBudgetResponse);
                //table.style.display = "none"; // Hide the table if it's visible
            }
        }

        function showAllSpendingButton() {
          document.getElementById("button-getAll").addEventListener("click", clearSearch(), showAllSpendingTable());
        }

        // Function to show monthly spending on button click
        // https://how.dev/answers/how-to-display-a-table-on-button-click-in-javascript
        function showMonthlySpendingTable(month) {
            var table = document.getElementById("spendingTable");
            if (table.style.display === "none" || table.style.display === "") {
                table.style.display = "table"; // Show the table if it's hidden
                showViewTotalsBudget();
                showSearch();
                clearTable();
                getByMonth(month, processGetResponse);
                getByMonthTags(month, processGetTagResponse);
                getBudgetMonth(month, processGetBudgetResponse);
            } else {
                clearTable();
                getByMonth(month, processGetResponse);
                getByMonthTags(month, processGetTagResponse);
                getBudgetMonth(month, processGetBudgetResponse);
            }
        }
        function showMonthlySpendingButton(month) {
          document.getElementById("button-getMonthly").addEventListener("click", clearSearch(), showMonthlySpendingTable(month));
        }

        // Function to clear the table
        // https://codeforgeek.com/remove-all-rows-from-table-in-javascript/
        // https://www.youtube.com/watch?v=qBg8IB3u28s
        function clearTable() {
            const spendingTable = document.querySelector('#spendingTable tbody');
            spendingTable.innerHTML = "";
            const tagTable = document.querySelector('#tagTable tbody');
            tagTable.innerHTML = "";
            const budgetTable = document.querySelector('#budgetTable tbody');
            budgetTable.innerHTML = "";
        }

        // Function to filter table in search bar
        //https://www.w3schools.com/howto/howto_js_filter_table.asp
        //https://hakk.dev/blog/posts/html-table-filter/
        function searchTable() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("tableSearch");
            filter = input.value.toUpperCase();
            table = document.getElementById("spendingTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td");
              for (var j = 0; j < td.length; j++) {
                txtValue = td[j].textContent || td[j].innerText;
                  if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                  } else {
                    tr[i].style.display = "none";
                  }
                }
            }
        }
        // Function to clear the search input
        // https://www.geeksforgeeks.org/html-clearing-the-input-field/
        function clearSearch() {
          document.getElementById("tableSearch").value = "";
        }

        // Function to display search input
        // https://www.w3schools.com/HOWTO/howto_js_toggle_hide_show.asp
        function showSearch() {
          var showSearch = document.getElementById("tableSearch");
          if (showSearch.style.display === "none") {
            showSearch.style.display = "block";
          } else {
              showSearch.style.display = "none";
            }
        }

        // Function to display view totals button
        function showViewTotalsBudget() {
          var viewTotals = document.getElementById("button-viewTotalsBudget");
          if (viewTotals.style.display === "none") {
            viewTotals.style.display = "block";
          } else {
              viewTotals.style.display = "none";
            }
        }

        // Function to display add expense form
        function showAddExpense() {
           document.getElementById("spendingBody").style.display = "none";
           document.getElementById("addExpenseForm").style.display = "block";
        }

        // function to process the get response and populate the spending table
        function processGetResponse(result) {
            console.log("in process")
            for (expense of result){
                displayExpense = {}
                displayExpense.id = expense.id
                displayExpense.date = expense
                displayExpense.description = expense.description
                displayExpense.tag_name = expense.tag_name
                displayExpense.cost = expense.cost 
                addExpenseToTable(displayExpense)
            }
        }

        // function to populate rows of the spending table
        function addExpenseToTable(expense) {
            // Add data rows to body of table
            // https://stackoverflow.com/a/18333693
            var tableBody = document.querySelector('#spendingTable tbody');
            var rowElement = tableBody.insertRow(-1)
            
            rowElement.setAttribute('id',expense.id)
            
            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = expense.id
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = expense.date.date.split(" 00:")[0] //https://www.geeksforgeeks.org/how-to-remove-time-from-date-using-javascript/
            var cell3 = rowElement.insertCell(2);
            cell3.innerHTML = expense.description
            var cell4 = rowElement.insertCell(3);
            cell4.innerHTML = expense.tag_name
            var cell5 = rowElement.insertCell(4);
            cell5.innerHTML = expense.cost.toLocaleString() //https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
            var cell6 = rowElement.insertCell(5);
            cell6.innerHTML = '<button class="btn btn-secondary" onclick="showUpdate(this)">Update</button>'
            var cell7 = rowElement.insertCell(6);
            cell7.innerHTML =
              '<div class="dropdown">'+
                '<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">'+
                  'Delete'+
                '</button>'+
                '<ul class="dropdown-menu">'+
                  '<li><button class="dropdown-item" onclick="doDelete(this)">Confirm</button></li>'+
                  '<li><button class="dropdown-item" href="#">Cancel</button></li>'+
                '</ul>'+
              '</div>'
              //'<button class="btn btn-secondary" onclick="doDelete(this)">Delete</button>'
        }
        
        // function to process the get tags response and populate the table
        function processGetTagResponse(result) {
            console.log("in process", result)
            sum = 0
            for (tag of result){
                displayTag = {}
                displayTag.tag_name = tag.tag_name
                displayTag.total_spending = tag.total_spending
                addTagToTable(displayTag)
                sum = sum + tag.total_spending
            }
            total = {}
            total.tag_name = "Total"
            total.total_spending = sum
            addTagToTable(total)
            //document.getElementById('outputSpent').innerHTML = total.total_spending
        }

        // function to populate rows of the tag table
        function addTagToTable(tag) {
            // Add data rows to body of table
            // https://stackoverflow.com/a/18333693
            var tableBody = document.querySelector('#tagTable tbody');
            var rowElement = tableBody.insertRow(-1);

            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = tag.tag_name
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = tag.total_spending.toLocaleString()
            document.getElementById('outputSpent').innerHTML = tag.total_spending
        }

        // function to process the get budget response and populate the table
        function processGetBudgetResponse(result) {
            console.log("in process", result)
            for (budget of result){
                displayBudget = {}
                displayBudget.budget_month = budget.budget_month
                displayBudget.amount = budget.amount
                addBudgetToTable(displayBudget)
            }
        }

        // function to process the get total budget response and populate the table
        function processGetTotalBudgetResponse(result) {
            console.log("in process", result)
            sum = 0
            for (budget of result){
              sum = sum + budget.amount
            }
            total_budget = {}
            total_budget.budget_month = "Full Year"
            total_budget.amount = sum
            addBudgetToTable(total_budget)
            //document.getElementById('outputBudget').innerHTML = total_budget.amount

        }

        // function to populate rows of the budget table
        function addBudgetToTable(budget) {
            // Add data rows to body of table
            // https://stackoverflow.com/a/18333693
            var tableBody = document.querySelector('#budgetTable tbody');
            var rowElement = tableBody.insertRow(-1)

            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = budget.budget_month
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = budget.amount.toLocaleString()
            document.getElementById('outputBudget').innerHTML = budget.amount.toFixed(2)
        }

        // functions to create new expense
        function addExpenseForm() {
          var addExpenseForm = document.getElementById('addExpenseForm');
          var expense = {}
        	expense.date = addExpenseForm.querySelector('input[id="date"]').value
        	expense.description = addExpenseForm.querySelector('input[id="description"]').value
        	expense.tag = parseInt(addExpenseForm.querySelector('select[id="tag"]').value)
        	expense.cost = parseFloat(addExpenseForm.querySelector('input[id="cost"]').value)
        	console.log(JSON.stringify(expense))
          return expense
        }
        function processAddExpenseResult(result) {
          newExpense = addExpenseForm(result)
          cancelCreate();
          showAllSpendingButton();
          addExpenseSuccessAlert();
        }
        function doCreate() {
          expense = addExpenseForm()
          if (expense.date === "") {
            alert("Select date");
            return;
          }
          if (expense.description === "") {
            alert("Enter description");
            return;
          }
          if (isNaN(expense.tag)) {
            alert("Select tag");
            return;
          }
          if (isNaN(expense.cost)) {
            alert("Enter cost");
            return;
          }
          console.log(expense)
          addExpense(expense, processAddExpenseResult);
        }

        // Function to clear the add expense form
        function clearExpenseForm() {
          var addExpenseForm = document.getElementById('addExpenseForm');
          addExpenseForm.querySelector('input[id="date"]').value = ""
        	addExpenseForm.querySelector('input[id="description"]').value = ""
        	addExpenseForm.querySelector('select[id="tag"]').value = "Choose tag..."
        	addExpenseForm.querySelector('input[id="cost"]').value = ""
        }

        // Function to get remaining budget
        function showRemainingBudget() {
          var budget = parseFloat(document.getElementById('outputBudget').innerHTML);
          var spent = parseFloat(document.getElementById('outputSpent').innerHTML);
          var remaining = budget - spent;
          document.getElementById('outputRemaining').innerHTML = remaining.toLocaleString();
        }

        // Function to delete expense
        function doDelete(buttonElement) {
          console.log("in delete")
          var tableElement = document.getElementById('spendingTable')
          var rowElement = buttonElement.parentNode.parentNode.parentNode.parentNode.parentNode;
          console.log(rowElement)
          // I need the book id
          id = rowElement.getAttribute("id")
          console.log("deleting "+id)
          deleteExpense(id, doNothing)
          
          index = rowElement.rowIndex
          tableElement.deleteRow(index);
          
        }

        // Default function for callback
        function doNothing(result){
            console.log("nothing:"+result)
            return "done"
        }

        function showUpdate(buttonElement){
           document.getElementById("spendingBody").style.display = "none"
           document.getElementById("updateExpenseForm").style.display = "block"

           rowElement= buttonElement.parentNode.parentNode
           expense = getExpenseFromRow(rowElement)
           console.log(expense)
           expense2 = {}
           expense2.id = expense.id
           expense2.date = convertDate(expense.date)
           expense2.description = expense.description
           expense2.tag = convertTags(expense.tag)
           expense2.cost = expense.cost
           console.log("updating")
           console.log(expense2)
           populateFormWithExpense(expense2)
            
        }

        function cancelUpdate(){
            document.getElementById("spendingBody").style.display = "block";
            document.getElementById("updateExpenseForm").style.display = "none";
        }

        function cancelCreate(){
            document.getElementById("spendingBody").style.display = "block";
            document.getElementById("addExpenseForm").style.display = "none";
            clearExpenseForm();
        }
        
        // Function to display spending body
        function showSpendingBody() {
          hideStartButton();
          var spendingBody = document.getElementById("spendingBody");
          if (spendingBody.style.display === "none") {
            spendingBody.style.display = "block";
          } else {
              spendingBody.style.display = "none";
            }
        }
        // Function to hide start button button
        function hideStartButton() {
          var startButton = document.getElementById("button-start");
          if (startButton.style.display === "none") {
            startButton.style.display = "block";
          } else {
              startButton.style.display = "none";
            }
        }
  
        function getExpenseFromForm(){
          var form = document.getElementById('updateExpenseForm')
       	  var expense = {}
        	expense.id = form.querySelector('input[id="id"]').value
        	expense.date = form.querySelector('input[id="date"]').value
        	expense.description = form.querySelector('input[id="description"]').value
        	expense.tag = parseInt(form.querySelector('select[id="tag"]').value)
          expense.cost = parseFloat(form.querySelector('input[id="cost"]').value)
        	//console.log(JSON.stringify(book))
            return expense
        }

        function populateFormWithExpense(expense){
       		var form = document.getElementById('updateExpenseForm')
        	form.querySelector('input[id="id"]').disabled = true
       		form.querySelector('input[id="id"]').value = expense.id
       		form.querySelector('input[id="date"]').value = expense.date
        	form.querySelector('input[id="description"]').value = expense.description
          form.querySelector('select[id="tag"]').value = expense.tag
          form.querySelector('input[id="cost"]').value = expense.cost
        }

        function getExpenseFromRow(rowElement) {
            var expense ={}
            expense.id  = rowElement.cells[0].firstChild.textContent
            expense.date = rowElement.cells[1].firstChild.textContent
            expense.description = rowElement.cells[2].firstChild.textContent
            expense.tag = rowElement.cells[3].firstChild.textContent
            expense.cost = rowElement.cells[4].firstChild.textContent
            return expense
        }

        function doUpdate(){
            expense= getExpenseFromForm()
            console.log(expense)
            if (expense.date === "") {
              alert("Select date");
              return;
            }
            if (expense.description === "") {
              alert("Enter description");
              return;
            }
            if (isNaN(expense.tag)) {
              alert("Select tag");
              return;
            }
            if (isNaN(expense.cost)) {
              alert("Enter cost");
              return;
            }
            updateExpense(expense, processUpdateExpenseResult)
           
            //showViewall()
            //clearForm()
        }

        function processUpdateExpenseResult(result) {
          updatedExpense = getExpenseFromForm(result)
          cancelUpdate();
          showAllSpendingButton();
          updateExpenseSuccessAlert();
        }

        function addExpenseSuccessAlert(){
            document.getElementById("addExpenseSuccess").style.display = "block"
        }

        function updateExpenseSuccessAlert(){
            document.getElementById("updateExpenseSuccess").style.display = "block"
        }

        function convertDate(date) {
           const day = date.slice(5, 7)
           const month = date.slice(8, 11)
           const year = date.slice(12, 16)
           const monthNumber = convertMonth(month)

           newDate = year+"-"+monthNumber+"-"+day
           return newDate
        }
        function convertMonth(month) {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          
          const index = months.indexOf(month);

          return (index +1).toString().padStart(2, 0)

        }
        function convertTags(tag) {
          const tags = ["Household", "Leisure", "Loans", "Savings", "Transport", "Other"];
          const index = tags.indexOf(tag);

          return (index + 1)

        }
