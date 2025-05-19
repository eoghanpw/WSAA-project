        // Function to show all spending on button click
        // https://how.dev/answers/how-to-display-a-table-on-button-click-in-javascript
        function showAllSpendingTable() {
            var table = document.getElementById("spendingTable");
            if (table.style.display === "none" || table.style.display === "") {
                table.style.display = "table"; // Show the table if it's hidden
                showSearch();
                clearTable();
                getAll(processGetResponse);
                getAllTags(processGetTagResponse);
            } else {
                clearTable();
                getAll(processGetResponse);
                getAllTags(processGetTagResponse);
                //table.style.display = "none"; // Hide the table if it's visible

            }
        }
 //       function showAllTagTable() {
 //           var table = document.getElementById("tagTable");
 //           if (table.style.display === "none" || table.style.display === "") {
 //               table.style.display = "table"; // Show the table if it's hidden
 //               getAllTags(processGetTagResponse)
 //           } else {
 //               getAllTags(processGetTagResponse)
 //               //table.style.display = "none"; // Hide the table if it's visible
//
 //           }
 //       }
        function showAllSpendingButton() {
          document.getElementById("button-getAll").addEventListener("click", clearSearch(), showAllSpendingTable());
        }

        // Function to show monthly spending on button click
        // https://how.dev/answers/how-to-display-a-table-on-button-click-in-javascript
        function showMonthlySpendingTable(month) {
            var table = document.getElementById("spendingTable");
            if (table.style.display === "none" || table.style.display === "") {
                table.style.display = "table"; // Show the table if it's hidden
                showSearch();
                clearTable();
                getByMonth(month, processGetResponse);
                getByMonthTags(month, processGetTagResponse);
            } else {
                clearTable();
                getByMonth(month, processGetResponse);
                getByMonthTags(month, processGetTagResponse);
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

        // function to process the get response and populate the table
        function processGetResponse(result){
            console.log("in process")
            for (expense of result){
                displayExpense = {}
                displayExpense.id = expense.id
                displayExpense.date = expense.date.split(" 00:")[0] //https://www.geeksforgeeks.org/how-to-remove-time-from-date-using-javascript/
                displayExpense.description = expense.description
                displayExpense.tag_name = expense.tag_name
                displayExpense.cost = expense.cost.toFixed(2) //https://www.w3schools.com/js/js_number_methods.asp
                addExpenseToTable(displayExpense)
            }
        }

        // function to populate rows of the table
        function addExpenseToTable(expense){
            // Add data rows to body of table
            // https://stackoverflow.com/a/18333693
            var tableBody = document.querySelector('#spendingTable tbody');
            var rowElement = tableBody.insertRow(-1)
            
            rowElement.setAttribute('id',expense.id)
            
            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = expense.id
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = expense.date
            var cell3 = rowElement.insertCell(2);
            cell3.innerHTML = expense.description
            var cell4 = rowElement.insertCell(3);
            cell4.innerHTML = expense.tag_name
            var cell5 = rowElement.insertCell(4);
            cell5.innerHTML = expense.cost
            var cell6 = rowElement.insertCell(5);
            cell6.innerHTML = '<button class="btn btn-secondary" onclick="showUpdate(this)">Update</button>'
            var cell7 = rowElement.insertCell(6);
            cell7.innerHTML = '<button class="btn btn-secondary" onclick=doDelete(this)>Delete</button>'
        }
        
        // function to process the get tags response and populate the table
        function processGetTagResponse(result){
            console.log("in process")
            for (tag of result){
                displayTag = {}
                displayTag.tag_name = tag.tag_name
                displayTag.total_spending = tag.total_spending
                addTagToTable(displayTag)
            }
        }

        // function to populate rows of the table
        function addTagToTable(tag){
            // Add data rows to body of table
            // https://stackoverflow.com/a/18333693
            var tableBody = document.querySelector('#tagTable tbody');
            var rowElement = tableBody.insertRow(-1)
            
            //rowElement.setAttribute('id',expense.id)
            
            var cell1 = rowElement.insertCell(0);
            cell1.innerHTML = tag.tag_name
            var cell2 = rowElement.insertCell(1);
            cell2.innerHTML = tag.total_spending
        }