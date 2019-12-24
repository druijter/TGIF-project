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

    //create the arrays with objects per party. First defining empty arrays, to be filled below here//
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
    democratsAndRepublicans = extractedPartyMembersObject.democratsAndRepublicans
    democratsAndIndependents = extractedPartyMembersObject.democratsAndIndependents
    republicansAndIndependents = extractedPartyMembersObject.republicansAndIndependents


    //default table: shown when no checkbox is checked//
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




        const myNode = document.getElementById("table-data");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        createTable(memberCollection)



    }

    //!!WHEN CHECKBOXES ARE CHECKED!!//

    // General function to create the filtered tables//

    function filteredTableCreator(e, filterParameter1, filterParameter2, filterParameter3, filterParameter4, filterParameter5, partyGroup) {




        if (e.target.checked === true) {

            filterParameter1.checked = false
            filterParameter2.checked = false
            filterParameter3.checked = false
            filterParameter4.checked = false
            filterParameter5.checked = false


            const myNode = document.getElementById("table-data");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            createTablePerParty(partyGroup)


        }
        if (e.target.checked !== true) {




            showDefaultTable()


        }
    }


    //get only democrats when the democrat checkbox is checked//
    democratsClicked.onclick = function (e) {
        filteredTableCreator(e, independentsClicked, republicansClicked, democratsRepublicansClicked, democratsIndependentsClicked, republicansIndependentsClicked, democrats)
    }


    //get only republicans when the republican checkbox is checked//
    republicansClicked.onclick = function (e) {
        filteredTableCreator(e, democratsClicked, independentsClicked, democratsRepublicansClicked, democratsIndependentsClicked, republicansIndependentsClicked, republicans)
    }

    //get only independents when the independent checkbox is checked//

    independentsClicked.onclick = function (e) {
        filteredTableCreator(e, democratsClicked, republicansClicked, democratsRepublicansClicked, democratsIndependentsClicked, republicansIndependentsClicked, independents)
    }

    //get democrats and republicans when the democrat and republicans checkbox is checked//

    democratsRepublicansClicked.onclick = function (e) {
        filteredTableCreator(e, democratsClicked, republicansClicked, independentsClicked, democratsIndependentsClicked, republicansIndependentsClicked, democratsAndRepublicans)
    }

    //get democrats and independents when the democrat and independents checkbox is checked//
    democratsIndependentsClicked.onclick = function (e) {
        filteredTableCreator(e, democratsClicked, republicansClicked, independentsClicked, democratsRepublicansClicked, republicansIndependentsClicked, democratsAndIndependents)
    }

    //get republicans and independents when the republicans and independents checkbox is checked//

    republicansIndependentsClicked.onclick = function (e) {
        filteredTableCreator(e, democratsClicked, republicansClicked, independentsClicked, democratsIndependentsClicked, democratsRepublicansClicked, republicansAndIndependents)
    }

}