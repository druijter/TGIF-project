window.onload = function () {

    let memberCollection = data.results[0].members;


    createTable(memberCollection)




    function createTable(memberCollection) {

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



    // table creation and checkbox logic//

    //create the arrays with objects per party//
    let republicans = []
    let democrats = []
    let independents = []

    //extract data in array per party in variables//
    function extractPartyMembers() {

        let senateMembers = data.results[0].members
        for (i = 0; i < senateMembers.length; i++) {


            if (senateMembers[i].party === "R") {
                republicans.push(senateMembers[i])
            }

            if (senateMembers[i].party === "D") {
                democrats.push(senateMembers[i])
            }

            if (senateMembers[i].party === "I") {
                independents.push(senateMembers[i])
            }
        }

        return {
            republicans,
            democrats,
            independents

        }
    }

    //set variables to their objects//

    extractedPartyMembersObject = extractPartyMembers()

    republicans = extractedPartyMembersObject.republicans
    democrats = extractedPartyMembersObject.democrats
    independents = extractedPartyMembersObject.independents


    //default table: no checkbox is checked//
    function createTablePerParty(memberCollection) {

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


    //when checkboxes are checked//

    //filter for democrats when the democrat checkbox is checked//
    let democratsClicked = document.getElementById("democratFilter")
    let republicansClicked = document.getElementById("republicanFilter")
    let independentsClicked = document.getElementById("independentFilter")

    democratsClicked.onclick = function (e) {

        if (e.target.checked === true) {
            independentsClicked.checked = false
            republicansClicked.checked = false

            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            // for (i = 0; i < memberCollection.length; i++) {
            //     document.getElementById("table-data").deleteRow(0);


            // }

            createTablePerParty(democrats)


        }
        if (e.target.checked !== true) {
            independentsClicked.checked = false
            republicansClicked.checked = false
            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            // for (i = 0; i < democrats.length; i++) {
            //     document.getElementById("table-data").deleteRow(0);
            // }

            createTable(memberCollection)


        }
    }


    //filter for republicans when the republican checkbox is checked//


    republicansClicked.onclick = function (e) {


        if (e.target.checked === true) {

            democratsClicked.checked = false
            independentsClicked.checked = false

            // for (i = 0; i < memberCollection.length; i++) {
            //     document.getElementById("table-data").deleteRow(0);


            // }
            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            createTablePerParty(republicans)


        }
        if (e.target.checked !== true) {
            democratsClicked.checked = false
            independentsClicked.checked = false


            // for (i = 0; i < republicans.length; i++) {
            //     document.getElementById("table-data").deleteRow(0);
            // }
            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            createTable(memberCollection)


        }
    }

    //filter for independents when the independent checkbox is checked//



    independentsClicked.onclick = function (e) {



        if (e.target.checked === true) {

            democratsClicked.checked = false
            republicansClicked.checked = false


            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            // for (i = 0; i < memberCollection.length; i++) {
            //     document.getElementById("table-data").deleteRow(0);


            // }

            createTablePerParty(independents)


        }
        if (e.target.checked !== true) {

            democratsClicked.checked = false
            republicansClicked.checked = false
            // for (i = 0; i < independents.length; i++) {
            //     document.getElementById("table-data").deleteRow(0);
            // }

            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            createTable(memberCollection)


        }


    }



}