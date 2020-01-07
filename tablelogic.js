window.onload = function () {

    let memberCollection = data.results[0].members;



    createTable(memberCollection)




    function createTable(memberCollection) {


        const tbody = document.getElementById("table-data");
        tbody.innerHTML = ""

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

    

    function filterDataOnPartyWhenCheckBoxIsChecked(arr) {
        filteredTable = []

        let checkBoxesArray = arr


        //if the democrat checkbox is checked//
        if (checkBoxesArray[0]) {



            for (j = 0; j < memberCollection.length; j++)

                if (memberCollection[j].party === "D") {
                    filteredTable.push(memberCollection[j])
                }

            //if the republican checkbox is checked//
        }
        if (checkBoxesArray[1]) {

            for (j = 0; j < memberCollection.length; j++)

                if (memberCollection[j].party === "R") {
                    filteredTable.push(memberCollection[j])
                }

        }
        //if the independents checkbox is checked//
        if (checkBoxesArray[2]) {

            for (j = 0; j < memberCollection.length; j++)

                if (memberCollection[j].party === "I") {
                    filteredTable.push(memberCollection[j])
                }
        }




        //insert some code to populate checkedParties with selected values (D, R, I) or comination of
        createTable(filteredTable)
        return filteredTable;

    }



    //see which checkboxes are checked//

    function createCheckBoxBooleanArray() {



        let checkedBoxes = []
        let checkBoxIdArray = []



        let checkboxes = document.getElementsByTagName("input");

        //assign a variable to the value returned by checkedCheckboxes(checkboxes)


        for (let i = 0; i < checkboxes.length; i++) {
            //
            if (checkboxes[i].type == "checkbox") {
                let isChecked = checkboxes[i].checked;
                checkedBoxes.push(isChecked)



            }

        }
        // console.log(checkedBoxes)
        filterDataOnPartyWhenCheckBoxIsChecked(checkedBoxes)
        return checkedBoxes

    }

    //trigger the onclick function when a checkbox is checked//

    document.getElementById("democratFilter").onclick = createCheckBoxBooleanArray;


    document.getElementById("republicanFilter").onclick = createCheckBoxBooleanArray;


    document.getElementById("independentFilter").onclick = createCheckBoxBooleanArray;


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
        let b = option.id
        

       
      
        
        //  dat.onclick = function() {
        //      console.log("DAADADA")
        //  }
        // let optionClick = document.getElementById(option0)
        // console.log(optionClick)
      
        dropdownButton.appendChild(option)
        option.text = statePropertyArray[l]
        // console.log(optionClick)

      



    }
    let mySelect = document.getElementById("state");

mySelect.onchange = function() {

   let stateFilteredArray=[] 
   let x = document.getElementById("state").value;
   console.log(x)
   console.log(dropdownObject)
   for (r=0; r<dropdownObject.length; r++){
       let dropDownObjectValue = Object.keys(dropdownObject[r]).toString()
       let selectedDropDownValue = x
       if(selectedDropDownValue===dropDownObjectValue){
           console.log("They Are Equal" + selectedDropDownValue)
           let dropDownFilteredData = dropdownObject[r][selectedDropDownValue]

           console.log(dropDownFilteredData.length)
           for (s=0; s<dropDownFilteredData.length; s++){
               console.log(dropDownFilteredData[s])
               stateFilteredArray.push(dropDownFilteredData[s])
                              
           }
           createTable(stateFilteredArray)
       }
     
   }
   
//    document.getElementById("options0").innerHTML = "You selected: " + x;
 }
};