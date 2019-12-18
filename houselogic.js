window.onload = function () {

    var memberCollection = data.results[0].members;


    this.createTable(memberCollection)


}

function createTable (memberCollection) {

    const tbody = document.getElementById("table-data");

    for (i = 0; i < memberCollection.length; i++) {


        var tr = document.createElement("TR")

        tbody.appendChild(tr)

        var a = document.createElement("a")
        a.href = memberCollection[i].url
        a.innerHTML = `${memberCollection[i].first_name} ${(memberCollection[i].middle_name || " ")}  ${memberCollection[i].last_name}`
        // td.appendChild(a)

        tr.insertCell().appendChild(a) 
        tr.insertCell().innerHTML = memberCollection[i].party
        tr.insertCell().innerHTML = memberCollection[i].state
        tr.insertCell().innerHTML = memberCollection[i].seniority
        tr.insertCell().innerHTML = memberCollection[i].votes_with_party_pct


        // for (j = 0; j < 5; j++) {



        //     var td = document.createElement("td")
        //     tr.appendChild(td)
        //     if (j == 0) {
        //         var a = document.createElement("a")
        //         a.href = memberCollection[i].url
        //         a.innerHTML = `${memberCollection[i].first_name} ${(memberCollection[i].middle_name || " ")}  ${memberCollection[i].last_name}`
        //         td.appendChild(a)
        //     }
        //     if (j == 1) {
        //         td.innerHTML = memberCollection[i].party
        //     }
        //     if (j == 2) {
        //         td.innerHTML = memberCollection[i].state
        //     }
        //     if (j == 3) {
        //         td.innerHTML = memberCollection[i].seniority
        //     }
        //     if (j == 4) {
        //         td.innerHTML = memberCollection[i].votes_with_party_pct
        //     } 
        // }

    }

    // var first = document.getElementsByTagName("thead");
    // var second = document.getElementsByTagName("tr")[1];

    // first.appendChild(second)
}