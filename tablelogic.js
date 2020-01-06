window.onload = function () {

        let memberCollection = data.results[0].members;
        let filteredTable = []
        let filteredTableAll = []

        // createTable(memberCollection)




        function createTable(memberCollection) {
            console.log('inside createTable', memberCollection)

            const tbody = document.getElementById("table-data");
            tbody.innerHTML=""

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




        //see which checkboxes are checked//

        function test() {

            filteredTable = []

            let checkboxes = document.getElementsByTagName("input");
            console.log('checkboxes', checkboxes)
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].type == "checkbox") {
                    let isChecked = checkboxes[i].checked;
                    console.log(isChecked)
                    console.log(i)
                    let id = checkboxes[i].id
                    if (isChecked) {



                        // filteredTable.push(memberCollection[i])
                        // createTable(filteredTable)


                        if (id === "independentFilter") {

                            console.log("independents")
                            //     for (j = 0; j < memberCollection.length; j++) {
                            //         if (memberCollection[j].party === "D") {

                            //             filteredTable.push(memberCollection[j])
                            //             console.log(filteredTable)
                            memberCollection.filter(function (arr) {
                                
                                if (arr.party === "I") {
                                    console.log(arr)
                                    filteredTable.push(arr)

                                }
                            })
                            createTable(filteredTable)


                            // document.getElementById('independentFilter').onchange = function () {
                            //     filteredTable = []
                            //     memberCollection.filter(function (arr) {
                            //             if (arr.party === "I") {
                            //                 console.log("onchange")
                            //                 filteredTable.splice(arr)

                            //             }


                            //         });
                            //     }

                                }


                                //     }


                                // }


                                if (id === "republicanFilter") {

                                    console.log("reps")
                                }
                                if (id === "independentFilter") {

                                    console.log("indeps")
                                }
                            }

                            // if (id === "democratFilter" && filteredTable.length<57) {



                            //     // let checkedCheckbox = document.getElementById(id)

                            //     //push data into variable to show data on checkbox filters//


                            //         console.log("hi")
                            //         for (j = 0; j < memberCollection.length; j++) {
                            //             if (memberCollection[j].party === "D") {

                            //                 filteredTable.push(memberCollection[j])
                            //                 // console.log(filteredTable)



                            //             }

                            //         createTable(filteredTable)
                            //     }

                            // }



                            // if (id === "republicanFilter") {
                            //     console.log("republicans")
                            //     for (k = 0; j < memberCollection.length; k++) {

                            //         if (memberCollection[j].party === "R") {

                            //             filteredTable.push(memberCollection[k])
                            //             console.log(filteredTable)


                            //         }
                            //     }
                            //     createTable(filteredTable)
                            // }
                            // if (id !== "republicanFilter"){
                            //     filteredTable =[]
                            // }
                            // if (id === "independentFilter") {
                            //     console.log("independents")
                            //     for (l = 0; l < memberCollection.length; l++) {

                            //         if (memberCollection[l].party === "I") {

                            //             filteredTable.push(memberCollection[l])
                            //             console.log(filteredTable)


                            //         }
                            //     }
                            //     createTable(filteredTable)
                            // }
                            // if (id !== "independentFilter"){
                            //     filteredTable =[]
                            // }
                        }
                    }
                }


                document.getElementById("democratFilter").onclick = function () {
                    test()
                }
                document.getElementById("republicanFilter").onclick = function () {
                    test()
                }
                document.getElementById("independentFilter").onclick = test;

                //    test("democratFilter", "republicanFilter", "independentFilter")

                // document.getElementById("republicanFilter").onclick = function () {


                //     var checkboxes = document.getElementsByTagName("input");
                //     for (var i = 0; i < checkboxes.length; i++) {
                //         if (checkboxes[i].type == "checkbox") {
                //             var isChecked = checkboxes[i].checked;
                //             console.log(isChecked)
                //         }
                //     }
                // }

                // document.getElementById("independentFilter").onclick = function () {


                //     var checkboxes = document.getElementsByTagName("input");
                //     for (var i = 0; i < checkboxes.length; i++) {
                //         if (checkboxes[i].type == "checkbox") {
                //             var isChecked = checkboxes[i].checked;
                //             console.log(isChecked)
                //         }
                //     }
                // }

                // table creation and checkbox logic//

                // //create the arrays with objects per party. First defining empty arrays, to be filled below here//
                // let republicans = []
                // let democrats = []
                // let independents = []
                // let democratsAndRepublicans = []
                // let democratsAndIndependents = []
                // let republicansAndIndependents = []

                // //extract data in array per party in variables//
                // function extractPartyMembers() {

                //     let senateMembers = data.results[0].members
                //     for (i = 0; i < senateMembers.length; i++) {


                //         if (senateMembers[i].party === "R") {
                //             republicans.push(senateMembers[i])
                //         }

                //         if (senateMembers[i].party === "D") {
                //             democrats.push(senateMembers[i])
                //         }

                //         if (senateMembers[i].party === "I") {
                //             independents.push(senateMembers[i])
                //         }
                //         if (senateMembers[i].party === "D" || senateMembers[i].party === "R") {
                //             democratsAndRepublicans.push(senateMembers[i])
                //         }
                //         if (senateMembers[i].party === "D" || senateMembers[i].party === "I") {
                //             democratsAndIndependents.push(senateMembers[i])
                //         }
                //         if (senateMembers[i].party === "R" || senateMembers[i].party === "I") {
                //             republicansAndIndependents.push(senateMembers[i])
                //         }
                //     }

                //     return {
                //         republicans,
                //         democrats,
                //         independents,
                //         democratsAndRepublicans,
                //         democratsAndIndependents,
                //         republicansAndIndependents

                //     }
                // }

                // //set variables to their objects//

                // extractedPartyMembersObject = extractPartyMembers()

                // republicans = extractedPartyMembersObject.republicans
                // democrats = extractedPartyMembersObject.democrats
                // independents = extractedPartyMembersObject.independents
                // democratsAndRepublicans = extractedPartyMembersObject.democratsAndRepublicans
                // democratsAndIndependents = extractedPartyMembersObject.democratsAndIndependents
                // republicansAndIndependents = extractedPartyMembersObject.republicansAndIndependents


                //default table: shown when no checkbox is checked//
                // function createTablePerParty(memberCollection) {

                //     const tbody = document.getElementById("table-data");

                //     for (i = 0; i < memberCollection.length; i++) {


                //         let tr = document.createElement("TR")

                //         tbody.appendChild(tr)

                //         let a = document.createElement("a")
                //         a.href = memberCollection[i].url
                //         a.innerHTML = `${memberCollection[i].first_name} ${(memberCollection[i].middle_name || " ")}  ${memberCollection[i].last_name}`


                //         tr.insertCell().appendChild(a)
                //         tr.insertCell().innerHTML = memberCollection[i].party
                //         tr.insertCell().innerHTML = memberCollection[i].state
                //         tr.insertCell().innerHTML = memberCollection[i].seniority
                //         tr.insertCell().innerHTML = memberCollection[i].votes_with_party_pct




                //     }


                // }



                // //initalize variables to get the checkbox input tags to verify later on whether they are checked//

                // let democratsClicked = document.getElementById("democratFilter")
                // let republicansClicked = document.getElementById("republicanFilter")
                // let independentsClicked = document.getElementById("independentFilter")
                // let democratsRepublicansClicked = document.getElementById("democratRepublicanFilter")
                // let democratsIndependentsClicked = document.getElementById("democratIndependentFilter")
                // let republicansIndependentsClicked = document.getElementById("republicanIndependentFilter")

                // function to show the default table

                // function showDefaultTable() {




                //     const myNode = document.getElementById("table-data");
                //     while (myNode.firstChild) {
                //         myNode.removeChild(myNode.firstChild);
                //     }
                //     createTable(memberCollection)



                // }

                // //!!WHEN CHECKBOXES ARE CHECKED!!//

                // // General function to create the filtered tables//

                // function filteredTableCreator(e, filterParameter1, filterParameter2, filterParameter3, filterParameter4, filterParameter5, partyGroup) {




                //     if (e.target.checked === true) {

                //         filterParameter1.checked = false
                //         filterParameter2.checked = false
                //         filterParameter3.checked = false
                //         filterParameter4.checked = false
                //         filterParameter5.checked = false


                //         const myNode = document.getElementById("table-data");
                //         while (myNode.firstChild) {
                //             myNode.removeChild(myNode.firstChild);
                //         }

                //         createTablePerParty(partyGroup)


                //     }
                //     if (e.target.checked !== true) {




                //         showDefaultTable()


                //     }
                // }


                // //get only democrats when the democrat checkbox is checked//
                // democratsClicked.onclick = function (e) {
                //     filteredTableCreator(e, independentsClicked, republicansClicked, democratsRepublicansClicked, democratsIndependentsClicked, republicansIndependentsClicked, democrats)
                // }


                // //get only republicans when the republican checkbox is checked//
                // republicansClicked.onclick = function (e) {
                //     filteredTableCreator(e, democratsClicked, independentsClicked, democratsRepublicansClicked, democratsIndependentsClicked, republicansIndependentsClicked, republicans)
                // }

                // //get only independents when the independent checkbox is checked//

                // independentsClicked.onclick = function (e) {
                //     filteredTableCreator(e, democratsClicked, republicansClicked, democratsRepublicansClicked, democratsIndependentsClicked, republicansIndependentsClicked, independents)
                // }

                // //get democrats and republicans when the democrat and republicans checkbox is checked//

                // democratsRepublicansClicked.onclick = function (e) {
                //     filteredTableCreator(e, democratsClicked, republicansClicked, independentsClicked, democratsIndependentsClicked, republicansIndependentsClicked, democratsAndRepublicans)
                // }

                // //get democrats and independents when the democrat and independents checkbox is checked//
                // democratsIndependentsClicked.onclick = function (e) {
                //     filteredTableCreator(e, democratsClicked, republicansClicked, independentsClicked, democratsRepublicansClicked, republicansIndependentsClicked, democratsAndIndependents)
                // }

                // //get republicans and independents when the republicans and independents checkbox is checked//

                // republicansIndependentsClicked.onclick = function (e) {
                //     filteredTableCreator(e, democratsClicked, republicansClicked, independentsClicked, democratsIndependentsClicked, democratsRepublicansClicked, republicansAndIndependents)
                // }

                // Sprint 3: dropdown to filter the data on state//






                let onlyStateArray = []

                let sortedOnStateAscending = [...memberCollection].sort(function (a, b) {
                    if (a.state < b.state) return -1;
                    else if (a.state > b.state) return 1;
                    else return 0;

                })




                // console.log(sortedOnStateAscending[0].state===sortedOnStateAscending[1].state)
                // console.log(sortedOnStateAscending[6].state===sortedOnStateAscending[7].state)
                for (i = 0; i < sortedOnStateAscending.length; i++) {
                    // console.log(sortedOnStateAscending[i].state)

                    onlyStateArray.push(sortedOnStateAscending[i].state)

                    if (i < sortedOnStateAscending) {
                        // console.log(sortedOnStateAscending[i + 1].state)
                    }


                }

                //Get all the states in the dataset//
                let dropdownObject = []
                let statePropertyArray = []
                let stateCompareArray = []

                for (j = 0; j < sortedOnStateAscending.length; j++) {
                    if (sortedOnStateAscending[j].state !== onlyStateArray[j + 1]) {
                        // console.log(j)

                        stateCompareArray.push(onlyStateArray[j])
                        statePropertyArray.push(onlyStateArray[j])
                        dropdownObject.push({})


                        // console.log(statePropertyArray)
                        // console.log(dropdownObject)



                    }
                    if (sortedOnStateAscending[j].state === onlyStateArray[j + 1]) {


                        stateCompareArray.push("")

                    }


                }

                //make the statePropertyArray equal in length to the members array, to be able to compare/loop for state names//
                stateCompareArray.shift()
                stateCompareArray.push("")

                //Creating an object to be able to filter on states.// 
                //First step: creating on object for every state. Then adding the person (senators) in it as an array of objects//

                for (k = 0; k < dropdownObject.length; k++) {

                    let x = statePropertyArray[k]
                    dropdownObject[k][x] = ""

                    // console.log(dropdownObject)



                }

                stateDataArray = []

                //Second step: creating the differerent person (senators) arrays for every state//
                for (l = 0; l < sortedOnStateAscending.length; l++) {

                    if (sortedOnStateAscending[l].state !== stateCompareArray[l]) {
                        // console.log(onlyStateArray.splice())



                    }
                }

                var timelyArray = [];
                var filteredStateData = []






                for (var i = 0; i < sortedOnStateAscending.length - 1; i++) {
                    if (sortedOnStateAscending[i].state !== sortedOnStateAscending[i + 1].state) {


                        timelyArray = []

                        timelyArray.push(sortedOnStateAscending[i + 1])
                        filteredStateData.push(
                            timelyArray
                        )



                    } else {
                        timelyArray.push(sortedOnStateAscending[i + 1])





                    }




                }

                //adding the first two senators as an array to the object//

                filteredStateData.unshift([sortedOnStateAscending[0], sortedOnStateAscending[1]])


                // creating the dataset to filter senators on state//
                for (k = 0; k < dropdownObject.length; k++) {

                    let x = statePropertyArray[k]
                    dropdownObject[k][x] = filteredStateData[k]

                    // console.log(dropdownObject)



                }

                console.log(statePropertyArray)

                for (l = 0; l < statePropertyArray.length; l++) {
                    let dropdownButton = document.getElementById('state')

                    let option = document.createElement('option')


                    option.id = "options" + l
                    var b = "options" + l

                    // console.log(b)
                    // console.log(document.getElementById(option.id))
                    let optionClick = document.getElementById(option.id)
                    // console.log(optionClick)
                    // optionClick.onclick = function (){
                    //         console.log("i'm clicked")
                    //     }

                    dropdownButton.appendChild(option)
                    option.text = statePropertyArray[l]

                }
            };