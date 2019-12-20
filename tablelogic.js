window.onload = function () {

    let memberCollection = senateData.results[0].members;


    this.createTable(memberCollection)


}

function createTable (memberCollection) {

    const tbody = document.getElementById("table-data");

    for (i = 0; i < memberCollection.length; i++) {


        let tr = document.createElement("TR")

        tbody.appendChild(tr)

        let a = document.createElement("a")
        a.href = memberCollection[i].url
        a.innerHTML = `${memberCollection[i].first_name} ${(memberCollection[i].middle_name || " ")}  ${memberCollection[i].last_name}`
       

        tr.insertCell().appendChild(a) 
        tr.insertCell().innerHTML = memberCollection[i].party
        tr.insertCell().innerHTML = memberCollection[i].state
        tr.insertCell().innerHTML = memberCollection[i].seniority
        tr.insertCell().innerHTML = memberCollection[i].votes_with_party_pct


        

    }

    
}