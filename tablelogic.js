


let senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";

let apiData = [];
let memberCollection;

fetchData(senateUrl)



function executeTableAndFiltersAfterDataAreFetched() {

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

        let selectedState = document.getElementById("state").value;
        let checkBoxesArray = arr

        for (j = 0; j < memberCollection.length; j++) {
            if (selectedState === memberCollection[j].state || selectedState == 'all') {
                if (memberCollection[j].party === "D" && checkBoxesArray[0]) {
                    filteredTable.push(memberCollection[j])
                }
                if (memberCollection[j].party === "R" && checkBoxesArray[1]) {
                    filteredTable.push(memberCollection[j])
                }
                if (memberCollection[j].party === "I" && checkBoxesArray[2]) {
                    filteredTable.push(memberCollection[j])
                }
            }
        }





        //insert some code to populate checkedParties with selected values (D, R, I) or combination of
        createTable(filteredTable)


    }


    //see which checkboxes are checked//

    function createCheckBoxBooleanArray() {
        let checkedBoxes = []

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
        // return checkedBoxes

    }

    //trigger the onclick function when a checkbox is checked//

    document.getElementById("democratFilter").onclick = createCheckBoxBooleanArray;
    document.getElementById("republicanFilter").onclick = createCheckBoxBooleanArray;
    document.getElementById("independentFilter").onclick = createCheckBoxBooleanArray;
    document.getElementById("state").onchange = createCheckBoxBooleanArray

    // Sprint 3: dropdown to filter the data on state//
    function createDropdownMenu() {

        let onlyStateArray = []
        let statePropertyArray = []

        let sortedOnStateAscending = [...memberCollection].sort(function (a, b) {
            if (a.state < b.state) return -1;
            else if (a.state > b.state) return 1;
            else return 0;

        })


        for (i = 0; i < sortedOnStateAscending.length; i++) {


            onlyStateArray.push(sortedOnStateAscending[i].state)




        }


        //creating array with only states//




        for (j = 0; j < sortedOnStateAscending.length; j++) {
            if (sortedOnStateAscending[j].state !== onlyStateArray[j + 1]) {


                statePropertyArray.push(onlyStateArray[j])

            }

        }

        //creating dropdowns//

        for (l = 0; l < statePropertyArray.length; l++) {
            let dropdownButton = document.getElementById('state')

            let option = document.createElement('option')

            dropdownButton.appendChild(option)
            option.text = statePropertyArray[l]

        }

        console.log(statePropertyArray)
        console.log(onlyStateArray)
    }

    createDropdownMenu()

}

//show loader//
function showLoader (){
    // document.body.innerHTML="s"
    
    console.log("hi")
    var animationWindow = document.getElementById('animationWindow')
    animationWindow.style.display = "block"
    
    animationWindow.style.background = "blue"
    animationWindow.style.height="800px"
    animationWindow.style.fontSize = "450%"
    animationWindow.style.color = "white"
    animationWindow.style.textAlign = "center"
    animationWindow.style.paddingTop = "250px"
    
}


//fetch data//


function fetchData(url) {
   

    fetch(url, {
            method: 'GET',
            withCredentials: true,
            headers: {
                
                "X-API-KEY": 'y4GdOeUJNzi36ye8ISrsV5Fstamv7Ab0NNYJGOEA',
                'Content-Type': 'application/json'
            }
        }, showLoader())

      

        .then(response => response.json())
        .then(test => {
            apiData = test.results[0].members
            memberCollection = apiData
            var animationWindow = document.getElementById('animationWindow')
        animationWindow.style.display="none"
            executeTableAndFiltersAfterDataAreFetched()


        })
        .catch(error => console.log(error))
        
};
