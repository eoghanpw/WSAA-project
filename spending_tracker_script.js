        // Function to show all spending on button click
        // https://how.dev/answers/how-to-display-a-table-on-button-click-in-javascript
        function showAllSpendingTable() {
            var table = document.getElementById("spendingTable");
            if (table.style.display === "none" || table.style.display === "") {
                table.style.display = "table"; // Show the table if it's hidden
                showViewTagsBudget();
                showSearch();
                clearSearch();
                clearTable();
                getAll(processGetResponse);
                getAllTags(processGetTagResponse);
                getBudget(processGetTotalBudgetResponse);
            } else {
                clearSearch();
                clearTable();
                getAll(processGetResponse);
                getAllTags(processGetTagResponse);
                getBudget(processGetTotalBudgetResponse);
            }
        }
        // Show all spending button
        function showAllSpendingButton() {
          document.getElementById("button-getAll").addEventListener("click", showAllSpendingTable());
        }

        // Function to show monthly spending on button click
        // https://how.dev/answers/how-to-display-a-table-on-button-click-in-javascript
        function showMonthlySpendingTable(month) {
            var table = document.getElementById("spendingTable");
            if (table.style.display === "none" || table.style.display === "") {
                table.style.display = "table"; // Show the table if it's hidden
                showViewTagsBudget();
                showSearch();
                clearSearch();
                clearTable();
                getByMonth(month, processGetResponse);
                getByMonthTags(month, processGetTagResponse);
                getBudgetMonth(month, processGetBudgetResponse);
            } else {
                clearSearch();
                clearTable();
                getByMonth(month, processGetResponse);
                getByMonthTags(month, processGetTagResponse);
                getBudgetMonth(month, processGetBudgetResponse);
            }
        }
        // Show monthly spending button
        function showMonthlySpendingButton(month) {
          document.getElementById("button-getMonthly").addEventListener("click", showMonthlySpendingTable(month));
        }

        // Function to clear the spending, tag, and budget tables
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

        // Function to display the secondary view tags, budget and balance buttons
        function showViewTagsBudget() {
          var viewTagsBudget = document.getElementById("button-viewTagsBudget");
          if (viewTagsBudget.style.display === "none") {
            viewTagsBudget.style.display = "block";
          } else {
              viewTagsBudget.style.display = "none";
            }
        }

        // Function to process the getAll ajax call response and populate the spending table
        function processGetResponse(result) {
            console.log("process getAll", result);
            for (expense of result){
                displayExpense = {}
                displayExpense.id = expense.id
                displayExpense.date = expense
                displayExpense.description = expense.description
                displayExpense.tag_name = expense.tag_name
                displayExpense.cost = expense.cost 
                addExpenseToTable(displayExpense);
            }
        }

        // Function to populate rows of the spending table
        function addExpenseToTable(expense) {
            // Add data rows to body of table
            // https://stackoverflow.com/a/18333693
            var tableBody = document.querySelector('#spendingTable tbody');
            var rowElement = tableBody.insertRow(-1);
            
            rowElement.setAttribute('id',expense.id);
            
            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = expense.id
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = expense.date.date.split(" 00:")[0] // Format date for table. Ref: https://www.geeksforgeeks.org/how-to-remove-time-from-date-using-javascript/
            var cell3 = rowElement.insertCell(2);
            cell3.innerHTML = expense.description
            var cell4 = rowElement.insertCell(3);
            cell4.innerHTML = expense.tag_name
            var cell5 = rowElement.insertCell(4);
            cell5.innerHTML = expense.cost.toLocaleString() // Format cost for table. https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
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
        }
        
        // Function to process the getAllTags ajax call response and populate the table
        function processGetTagResponse(result) {
            console.log("process getAllTags", result);
            sum = 0
            for (tag of result){
                displayTag = {}
                displayTag.tag_name = tag.tag_name
                displayTag.total_spending = tag.total_spending
                addTagToTable(displayTag)
                sum = sum + tag.total_spending;
            }
            // Add total row to end of table
            total = {}
            total.tag_name = "Total"
            total.total_spending = sum
            addTagToTable(total);
        }

        // Function to populate rows of the tag table
        function addTagToTable(tag) {
            // Add data rows to body of table
            // https://stackoverflow.com/a/18333693
            var tableBody = document.querySelector('#tagTable tbody');
            var rowElement = tableBody.insertRow(-1);

            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = tag.tag_name
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = tag.total_spending.toLocaleString()
            // Send total spending to outputSpent to calculate balance with view balance button
            document.getElementById('outputSpent').innerHTML = tag.total_spending
        }

        // Function to process the getBudgetMonth ajax call response and populate the table
        function processGetBudgetResponse(result) {
            console.log("process getBudgetMonth", result)
            for (budget of result){
                displayBudget = {}
                displayBudget.budget_month = budget.budget_month
                displayBudget.amount = budget.amount
                addBudgetToTable(displayBudget);
            }
        }

        // Function to process the getBudget ajax call response and populate the table
        function processGetTotalBudgetResponse(result) {
            console.log("processGetBuget", result)
            sum = 0
            for (budget of result){
              sum = sum + budget.amount
            }
            // Total budget for year
            total_budget = {}
            total_budget.budget_month = "Full Year"
            total_budget.amount = sum
            addBudgetToTable(total_budget)
        }

        // Function to populate rows of the budget table
        function addBudgetToTable(budget) {
            var tableBody = document.querySelector('#budgetTable tbody');
            var rowElement = tableBody.insertRow(-1);

            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = budget.budget_month
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = budget.amount.toLocaleString()
            // Send total budget to outputBudget to calculate balance with view balance button
            document.getElementById('outputBudget').innerHTML = budget.amount
        }

        // Function to process the getBudget ajax call response and populate the update budget table
        function processGetUpdateBudgetResponse(result) {
            console.log("process getBudget for update table", result)
            for (budget of result){
                displayBudget = {}
                displayBudget.budget_id = budget.budget_id
                displayBudget.budget_month = budget.budget_month
                displayBudget.amount = budget.amount
                addUpdateBudgetToTable(displayBudget)
            }
        }

        // Function to populate rows of the update budget table
        function addUpdateBudgetToTable(budget) {
            var tableBody = document.querySelector('#updateBudgetTable tbody');
            var rowElement = tableBody.insertRow(-1);

            rowElement.setAttribute('id',budget.budget_id)

            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = budget.budget_id
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = budget.budget_month
            var cell3 = rowElement.insertCell(2);
            cell3.innerHTML = budget.amount.toLocaleString()
            var cell4 = rowElement.insertCell(3);
            cell4.innerHTML = '<input class="form-control" type="number" placeholder="Enter updated budget..."></input>'
            var cell5 = rowElement.insertCell(4);
            cell5.innerHTML = '<button class="btn btn-secondary" onclick="doBudgetUpdate(this)">Update</button>'
        }
        // Function to get updated budget from row
        function getBudgetFromRow(rowElement) {
            while (isNaN(parseFloat(rowElement.querySelector('input').value))) {
              (alert("Input update amount"));
              return;
            }
            var budget ={}
            budget.budget_id  = rowElement.cells[0].firstChild.textContent
            budget.budget_month = rowElement.cells[1].firstChild.textContent
            budget.amount = parseFloat(rowElement.querySelector('input').value)
            return budget;
        }
        // Function to update the budget
        function doBudgetUpdate(buttonElement){
            var rowElement = buttonElement.parentNode.parentNode;
            var budget = getBudgetFromRow(rowElement);
            if (budget === undefined) {
              console.log("update amount not entered");
              return;
            } else {
                console.log("updating budget", budget);
                updateBudget(budget, doNothing);
                cancelUpdateBudget();
                showAllSpendingButton();
                updateBudgetSuccessAlert();
            }
        }
        
        // Clear update budget table
        function clearUpdateBudgetTable() {
          document.querySelector('#updateBudgetTable tbody').innerHTML = ""
        }

        // Function to display update budget form
        function showUpdateBudget() {
           getBudget(processGetUpdateBudgetResponse);
           document.getElementById("spendingBody").style.display = "none";
           document.getElementById("updateBudgetForm").style.display = "block";
        }

        // Function to display hide budget form
        function cancelUpdateBudget() {
           document.getElementById("spendingBody").style.display = "block";
           document.getElementById("updateBudgetForm").style.display = "none";
           clearUpdateBudgetTable();
        }

        // Function for add expense button to display add expense form
        function showAddExpense() {
           document.getElementById("spendingBody").style.display = "none";
           document.getElementById("addExpenseForm").style.display = "block";
        }

        // functions to create new expense
        function addExpenseForm() {
          var addExpenseForm = document.getElementById('addExpenseForm');
          var expense = {}
        	expense.date = addExpenseForm.querySelector('input[id="addExpenseDate"]').value
        	expense.description = addExpenseForm.querySelector('input[id="addExpenseDescription"]').value
        	expense.tag = parseInt(addExpenseForm.querySelector('select[id="addExpenseTag"]').value)
        	expense.cost = parseFloat(addExpenseForm.querySelector('input[id="addExpenseCost"]').value)
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
          addExpenseForm.querySelector('input[id="addExpenseDate"]').value = ""
        	addExpenseForm.querySelector('input[id="addExpenseDescription"]').value = ""
        	addExpenseForm.querySelector('select[id="addExpenseTag"]').value = ""
        	addExpenseForm.querySelector('input[id="addExpenseCost"]').value = ""
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
        	expense.id = form.querySelector('input[id="updateExpenseId"]').value
        	expense.date = form.querySelector('input[id="updateExpenseDate"]').value
        	expense.description = form.querySelector('input[id="updateExpenseDescription"]').value
        	expense.tag = parseInt(form.querySelector('select[id="updateExpenseTag"]').value)
          expense.cost = parseFloat(form.querySelector('input[id="updateExpenseCost"]').value)
        	//console.log(JSON.stringify(book))
            return expense
        }

        function populateFormWithExpense(expense){
       		var form = document.getElementById('updateExpenseForm')
        	form.querySelector('input[id="updateExpenseId"]').disabled = true
       		form.querySelector('input[id="updateExpenseId"]').value = expense.id
       		form.querySelector('input[id="updateExpenseDate"]').value = expense.date
        	form.querySelector('input[id="updateExpenseDescription"]').value = expense.description
          form.querySelector('select[id="updateExpenseTag"]').value = expense.tag
          form.querySelector('input[id="updateExpenseCost"]').value = expense.cost
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

        function updateBudgetSuccessAlert(){
            document.getElementById("updateBudgetSuccess").style.display = "block"
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
        function returnHome() {
          location.reload();
        }
