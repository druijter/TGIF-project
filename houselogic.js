window.onload = function () {

    var membercollection = data.results[0].members;


    this.createTable(membercollection)


}

function createTable (membercollection) {

    

    for (i = 0; i < membercollection.length; i++) {


        var tr = document.createElement("TR")

        document.getElementById("table-data").appendChild(tr)

        var a = document.createElement("a")
        a.href = membercollection[i].url
        a.innerHTML = `${membercollection[i].first_name} ${(membercollection[i].middle_name || " ")}  ${membercollection[i].last_name}`
        // td.appendChild(a)

        tr.insertCell().appendChild(a) 
        tr.insertCell().innerHTML = membercollection[i].party
        tr.insertCell().innerHTML = membercollection[i].state
        tr.insertCell().innerHTML = membercollection[i].seniority
        tr.insertCell().innerHTML = membercollection[i].votes_with_party_pct


        // for (j = 0; j < 5; j++) {



        //     var td = document.createElement("td")
        //     tr.appendChild(td)
        //     if (j == 0) {
        //         var a = document.createElement("a")
        //         a.href = membercollection[i].url
        //         a.innerHTML = `${membercollection[i].first_name} ${(membercollection[i].middle_name || " ")}  ${membercollection[i].last_name}`
        //         td.appendChild(a)
        //     }
        //     if (j == 1) {
        //         td.innerHTML = membercollection[i].party
        //     }
        //     if (j == 2) {
        //         td.innerHTML = membercollection[i].state
        //     }
        //     if (j == 3) {
        //         td.innerHTML = membercollection[i].seniority
        //     }
        //     if (j == 4) {
        //         td.innerHTML = membercollection[i].votes_with_party_pct
        //     } 
        // }

    }

    // var first = document.getElementsByTagName("thead");
    // var second = document.getElementsByTagName("tr")[1];

    // first.appendChild(second)
}