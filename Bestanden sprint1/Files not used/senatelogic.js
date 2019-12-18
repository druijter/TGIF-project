window.onload = function () {

   

    let memberCollection = data.results[0].members;
    this.createTable(memberCollection)
}

    function createTable (memberCollection) {


    for (i = 0; i < memberCollection.length; i++) {
        let tr = document.createElement("TR")
        let a = document.createElement("a")
            a.href = memberCollection[i].url
            
          

        
         

        document.getElementById("table-data").appendChild(tr)

       

        tr.insertCell().appendChild(a)
        a.innerHTML = `${memberCollection[i].first_name} ${(memberCollection[i].middle_name || "")} ${memberCollection[i].last_name}`

        tr.insertCell().innerHTML = memberCollection[i].party
        tr.insertCell().innerHTML = memberCollection[i].state
        tr.insertCell().innerHTML = memberCollection[i].seniority
        tr.insertCell().innerHTML = memberCollection[i].votes_with_party_pct

    }  
    }

