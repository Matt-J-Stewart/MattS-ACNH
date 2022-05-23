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