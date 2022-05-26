function buildTable(data) {
    var table = document.getElementById("animalTable");
    for(let i = 0; i < data.length; i ++)
    {
        let row = document.createElement("tr");
        var currItem = data[i];
        for(var key of Object.keys(currItem)) {
            let tabData = document.createElement("td");
            if(key == "monthsAvailable"){
                let months = "";
                let i = 0;
                while(i < currItem.monthsAvailable.length - 1) {
                    months += currItem.monthsAvailable[i] + ", ";
                    i++;
                }
                months += currItem.monthsAvailable[i];
                tabData.innerHTML = months
                row.appendChild(tabData);
                
            }
            else if(key == "timesAvailable") {
                tabData.innerHTML = formatTime(currItem.timesAvailable);
                row.appendChild(tabData);
            }
            else if(key == "pic") {
                let picData = document.createElement("img");
                picData.alt = currItem.name + " picture";
                picData.src = currItem.pic;
                tabData.innerHTML = (picData);
                row.appendChild(tabData);                
            }
            else {
                tabData.innerHTML = currItem[key];
                row.appendChild(tabData);
            }
            
        }
        table.appendChild(row);
    }
    
}

async function fetchAllAnimals() {
    const response = await fetch("/allAnimals").
    then(response=> response.json()).
    then(data => {
        buildTable(data);
    })
}

//Converts strings in format of military time (1230-1300) to standard format (12:30pm-1:00pm)
//Look into using regular expressions
//TODO make for multiple time frames
function formatTime(timeFrame) {
    var timeString = "";
    for(let i = 0; i < timeFrame.length; i++) {

        let tempString = "";
        let startTime = timeFrame[i].substring(0,4)
        if(startTime == "0000") {
            startTime = "12:00am";
        }
        else if(startTime == "1200") {
            startTime = "12:00pm";
        }
        else if(startTime < 1200) {
            startTime = (startTime.slice(0,2) + ":" + startTime.slice(2) + "am");
        }
        else {
            startTime = ("0" + (startTime.slice(0,2) - 12) + ":" + startTime.slice(2) + "pm");
        }
        
        tempString += startTime + "-";
        
        //Repeat process for ending time
        let endTime = timeFrame[i].substring(5);
        if(endTime == "0000") {
            endTime = "12:00am";
        }
        else if(endTime == "1200") {
            endTime = "12:00pm";
        }
        else if(endTime < 1200) {
            endTime = (endTime.slice(0,2) + ":" + endTime.slice(2) + "am");
        }
        else {
            endTime = ("0" + (endTime.slice(0,2) - 12) + ":" + endTime.slice(2) + "pm");
        }

        tempString += endTime;
        timeString += tempString + ", "
    }

    timeString = timeString.slice(0,-2); //Eliminate trailing comma
    return timeString;
}

// Function to sort the table based on the header that is clicked.
function sortTable(n) {
    var table = document.getElementById("animalTable"); // Retrieve the table information from the DOM
    var rows = table.rows; // Retrieve array of rows from the table.
    var switching = true; // Variable to determine when the sort is finished. Acts as a flag.
    var dir = "asc"; // Direction of the sort.
    var shouldSwitch; 
    var switchcount = 0;
    
    // While loop that operates until no more swapping is done. 
    while(switching) {

        switching = false; // Set flag to false.

        // Loop through all the rows, except for the first row containing headers.
        for(var i = 1; i < rows.length - 1; i++) {

            // Start by saying there whould be no switching.
            shouldSwitch = false;

            // Get the two pieces of table data that will be compared.
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];

            // If the direction is ascending, check to see if x > y.
            // If it is, then a switch needs to change and shouldSwitch is flipped to true.
            // Otherwise, if the direction is descending and x < y, a switch should also occur. 
            if(dir == "asc") {
                if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        // If the shouldSwitch flag has been set, perform the swtich and mark the switch complete.
        // If the intended direction is desc, then the flag will be flipped after the first iteration of the while loop finishes.
        if(shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); //Swap the elements
            switching = true; // Revert the flag back to true so the while loop can continue.
            switchcount++; // Increase this variable. This is used to determine if the direction needs to be changed.
        } else {
            if(switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}