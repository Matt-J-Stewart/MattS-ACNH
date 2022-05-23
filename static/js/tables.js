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