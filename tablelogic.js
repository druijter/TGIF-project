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
    let democratsAndRepublicans = []
    let democratsAndIndependents = []
    let republicansAndIndependents = []

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
            if (senateMembers[i].party === "D" || senateMembers[i].party === "R") {
                democratsAndRepublicans.push(senateMembers[i])
            }
            if (senateMembers[i].party === "D" || senateMembers[i].party === "I") {
                democratsAndIndependents.push(senateMembers[i])
            }
            if (senateMembers[i].party === "R" || senateMembers[i].party === "I") {
                republicansAndIndependents.push(senateMembers[i])
            }
        }

        return {
            republicans,
            democrats,
            independents,
            democratsAndRepublicans,
            democratsAndIndependents,
            republicansAndIndependents

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



    //initalize variables to get the checkbox input tags to verify later on whether they are checked//

    let democratsClicked = document.getElementById("democratFilter")
    let republicansClicked = document.getElementById("republicanFilter")
    let independentsClicked = document.getElementById("independentFilter")
    let democratsRepublicansClicked = document.getElementById("democratRepublicanFilter")
    let democratsIndependentsClicked = document.getElementById("democratIndependentFilter")
    let republicansIndependentsClicked = document.getElementById("republicanIndependentFilter")

    // function to show the default table

    function showDefaultTable() {






        showDefaultTable()



    }

    //when checkboxes are checked//


    //get only democrats when the democrat checkbox is checked//
    democratsClicked.onclick = function (e) {

        if (e.target.checked === true) {
            independentsClicked.checked = false
            republicansClicked.checked = false
            democratsRepublicansClicked.checked = false
            democratsIndependentsClicked.checked = false
            republicansIndependentsClicked.checked = false

            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }



            createTablePerParty(democrats)


        }
        if (e.target.checked !== true) {

            showDefaultTable()


        }
    }


    //get only republicans when the republican checkbox is checked//


    republicansClicked.onclick = function (e) {


        if (e.target.checked === true) {

            democratsClicked.checked = false
            independentsClicked.checked = false
            democratsRepublicansClicked.checked = false
            democratsIndependentsClicked.checked = false
            republicansIndependentsClicked.checked = false


            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            createTablePerParty(republicans)


        }
        if (e.target.checked !== true) {



            showDefaultTable()


        }
    }

    //get only independents when the independent checkbox is checked//



    independentsClicked.onclick = function (e) {



        if (e.target.checked === true) {

            democratsClicked.checked = false
            republicansClicked.checked = false
            democratsRepublicansClicked.checked = false
            democratsIndependentsClicked.checked = false
            republicansIndependentsClicked.checked = false


            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }



            createTablePerParty(independents)


        }
        if (e.target.checked !== true) {





            showDefaultTable()


        }


    }






    //get democrats and republicans when the democratRepublicanFilter checkbox is checked//

    democratsRepublicansClicked.onclick = function (e) {


        if (e.target.checked === true) {

            democratsClicked.checked = false
            republicansClicked.checked = false
            independentsClicked.checked = false

            democratsIndependentsClicked.checked = false
            republicansIndependentsClicked.checked = false


            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            createTablePerParty(democratsAndRepublicans)


        }
        if (e.target.checked !== true) {




            showDefaultTable()


        }
    }


    //get democrats and independents when the democratIndependentFilter checkbox is checked//
    democratsIndependentsClicked.onclick = function (e) {


        if (e.target.checked === true) {

            democratsClicked.checked = false
            republicansClicked.checked = false
            independentsClicked.checked = false

            democratsRepublicansClicked.checked = false
            republicansIndependentsClicked.checked = false


            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            createTablePerParty(democratsAndIndependents)


        }
        if (e.target.checked !== true) {



            showDefaultTable()


        }
    }

    //get republicans and independents when the republicanIndependentFilter checkbox is checked//
    republicansIndependentsClicked.onclick = function (e) {


        if (e.target.checked === true) {

            democratsClicked.checked = false
            republicansClicked.checked = false
            independentsClicked.checked = false

            democratsRepublicansClicked.checked = false
            democratsIndependentsClicked.checked = false




            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            createTablePerParty(republicansAndIndependents)


        }
        if (e.target.checked !== true) {




            showDefaultTable()

        }
    }
}