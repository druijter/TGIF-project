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


                if (senateMembers[i].party === "R")
                    republicans.push(senateMembers[i])

                if (senateMembers[i].party === "D")
                    democrats.push(senateMembers[i])

                if (senateMembers[i].party === "I")
                    independents.push(senateMembers[i])

            }
            return {
                republicans,
                democrats,
                independents

            }
        }

        //set variables to their objects//
        republicans = extractPartyMembers().republicans
        democrats = extractPartyMembers().democrats
        independents = extractPartyMembers().independents


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


        //if the democrats checkbox is checked, create the democrat table and replace the default overall table//
        // if (document.getElementById("democratFilter")) {


        //     document.getElementById("democratFilter").onclick = function () {
        //         for (i = 0; i < memberCollection.length; i++) {
        //             document.getElementById("table-data").deleteRow();
        //             console.log("hi")

        //         }
        //     }
        //     createTablePerParty(democrats)
        // }
        // }





        //if the democrats checkbox is checked, create the democrat table and replace the default overall table//
        // if (document.getElementById("independentFilter")) {
        //     console.log("hi")

        //     document.getElementById("independentFilter").onclick = function () {
        //         for (i = 0; i < memberCollection.length; i++) {
        //             document.getElementById("table-data").deleteRow(0);
        //             console.log("hi")

        //         }
        //     }



        // }

        //if nothing is checked, show the default table//

        // if (document.getElementById("democratFilter")){




        // }

        // let clickedArray = []


        let democratsClicked = document.getElementById("democratFilter")

        democratsClicked.onclick = function (e) {

           
            if (e.target.checked === true) {
                console.log("isfalse")
                for (i = 0; i < memberCollection.length; i++) {
                    document.getElementById("table-data").deleteRow(0);
                    

                }
                createTablePerParty(memberCollection)
            }
                if (e.target.checked !== true) {
                    console.log("istrue")
                    for (i = 0; i < memberCollection.length; i++) {
                        document.getElementById("table-data").deleteRow(0);}
                    
    
                    }

                    createTable(memberCollection)
            }
        }




        