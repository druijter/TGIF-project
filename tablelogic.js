//define global variables to be able to fetch data for house and senate, depending on which page the user is on//
let senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";
let houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json"

let apiData = [];
let memberCollection;

let senateOverallUrl = "file:///home/daan/Desktop/Ubiqum/tgif/senate-data.html"
let houseOverallUrl = "file:///home/daan/Desktop/Ubiqum/tgif/house-data.html"
let senateAttendanceUrl = "file:///home/daan/Desktop/Ubiqum/tgif/senate-attendance.html"
let houseAttendanceUrl = "file:///home/daan/Desktop/Ubiqum/tgif/house-attendance.html"
let senateLoyaltyUrl = "file:///home/daan/Desktop/Ubiqum/tgif/senate-party-loyalty.html"
let houseLoyaltyUrl = "file:///home/daan/Desktop/Ubiqum/tgif/house-party-loyalty.html"


if (window.location.href === senateOverallUrl) {
  fetchData(senateUrl)
}
if (window.location.href === senateAttendanceUrl) {
  fetchData(senateUrl)
}
if (window.location.href === senateLoyaltyUrl) {
  fetchData(senateUrl)
}
if (window.location.href === houseOverallUrl) {
  fetchData(houseUrl)
}
if (window.location.href === houseAttendanceUrl) {
  fetchData(houseUrl)
}
if (window.location.href === houseLoyaltyUrl) {
  fetchData(houseUrl)
}

//runs everything 3 times//

// if (window.location.href === houseOverallUrl || houseAttendanceUrl || houseLoyaltyUrl){
//     fetchData(houseUrl)
// }
// if (window.location.href === senateOverallUrl || senateAttendanceUrl || senateLoyaltyUrl){
//     fetchData(senateUrl)
// }


//execute this function after the API data is fetched//
function executeTableAndFiltersAfterDataAreFetched() {

  //trigger the onclick function when a checkbox is checked//

  document.getElementById("democratFilter").onclick = createCheckBoxBooleanArray;
  document.getElementById("republicanFilter").onclick = createCheckBoxBooleanArray;
  document.getElementById("independentFilter").onclick = createCheckBoxBooleanArray;
  document.getElementById("state").onchange = createCheckBoxBooleanArray


  //call functions to create the overall congress statistics tables (function definitioons at the lower part)//  

  filterDataOnPartyWhenCheckBoxIsChecked(apiData)



  createDropdownMenu()

}

//CREATE THE ATTENDANCE AND LOYALTY TABLES//

function executeAttendanceAndLoyaltyTables(memberCollection) {



  //define some global variables//
  let senateMembersStatistics = memberCollection


  let republicans = []
  let democrats = []
  let independents = []
  let overallVoteStatistics = []

  var partyMembersObject = extractPartyMembers(republicans, democrats, independents)


  const overallVoteStatisticsObject = getOverallVoteStatistics(overallVoteStatistics, memberCollection)



  let sortedOnMissedVotesDescending = [...overallVoteStatisticsObject].sort(function (a, b) {
    return parseFloat(b.missedVotesNum) - parseFloat(a.missedVotesNum);
  })





  //create most engaged object//

  let sortedOnMissedVotesAscending = [...overallVoteStatisticsObject].sort(function (a, b) {
    return parseFloat(a.missedVotesNum) - parseFloat(b.missedVotesNum);
  })



  const percentage = 0.10 * senateMembersStatistics.length

  let lastPersonMissedVotes = sortedOnMissedVotesAscending[Math.round(percentage)].missedVotesNum

  let firstPersonOutMissedVotes = sortedOnMissedVotesAscending[Math.round(percentage + 1)].missedVotesNum

  let engagementAndLoyaltyObject = returnEngagement(senateMembersStatistics, sortedOnMissedVotesDescending, sortedOnMissedVotesAscending, percentage, lastPersonMissedVotes)



  //get overall loyalty statistics

  getOverallLoyaltyStatistics(senateMembersStatistics)


  

  let statistics = {}


 


  statistics.overall = {

    numberOfRepresentatives: [
      partyMembersObject.democrats.length,
      partyMembersObject.republicans.length,
      partyMembersObject.independents.length
    ],
  }

  console.log(independents.length)

  statistics.votedWithParty = [
      calculateAveragePerParty(democrats, "votes_with_party_pct").toFixed(1),
      calculateAveragePerParty(republicans, "votes_with_party_pct").toFixed(1),
      calculateAveragePerParty(independents, "votes_with_party_pct").toFixed(1)
    ],

    statistics.missedVotePerParty = [
      calculateAveragePerParty(democrats, "missed_votes_pct"),
      calculateAveragePerParty(republicans, "missed_votes_pct"),
      calculateAveragePerParty(independents, "missed_votes_pct")
    ]



  statistics.leastEngaged = engagementAndLoyaltyObject.engagement.leastEngaged

  statistics.mostEngaged = engagementAndLoyaltyObject.engagement.mostEngaged

  statistics.leastLoyalSenate = engagementAndLoyaltyObject.loyalty.leastLoyal

  statistics.mostLoyalSenate = engagementAndLoyaltyObject.loyalty.mostLoyal

 
  
  //function that creates all tables//
  createTheTables(statistics)

}




//FUNCTION DEFINITIONS FOR THE OVERALL PART (senate data page and house data page)//
function filterDataOnPartyWhenCheckBoxIsChecked(arr) {
  filteredTable = []

  let selectedState = document.getElementById("state").value;
  
  let checkBoxesArray = arr

  for (j = 0; j < memberCollection.length; j++) {
    if (selectedState === memberCollection[j].state || selectedState === 'all') {
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
 
    filterDataOnPartyWhenCheckBoxIsChecked(checkedBoxes)


  }

  // Dropdown to filter the data on state//
  function createDropdownMenu() {
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

    }
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

  }

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

  //FUNCTION DEFINITIONS FOR THE ATTENDANCE AND LOYALTY PART (senate attendance and loyalty page and house attendance and loyalty page)//

  function extractPartyMembers(republicans, democrats, independents) {

    let senateMembers = memberCollection
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


  // making a general function to calculate the average per party
  function calculateAveragePerParty(partyTypeArray, datatype) {

    

    let total = 0
    
    for (j = 0; j < partyTypeArray.length; j++) {
      

      total += partyTypeArray[j][datatype]



    }

    let average = total / (partyTypeArray.length)
    
    
    total = null
    if(!isNaN(average)){
      return average
    }
    if(isNaN(average)){
      return 0
    }
    
    

  }


  //get overall vote statistics//

  function getOverallVoteStatistics(overallVoteStatistics, memberCollection) {
    let senateMembersStatistics = memberCollection
  

    for (i = 0; i < senateMembersStatistics.length; i++) {
      overallVoteStatistics.push({
        "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
        "missedVotesNum": senateMembersStatistics[i].missed_votes,
        "missedPct": senateMembersStatistics[i].missed_votes_pct.toFixed(1)
      })
    }
    return overallVoteStatistics
  }


  //get overall loyalty statistics

  function getOverallLoyaltyStatistics(memberCollection) {
    let senateMembersStatistics = memberCollection
    let overallLoyaltyStatistics = []
  
    for (i = 0; i < senateMembersStatistics.length; i++) {
      overallLoyaltyStatistics.push({
        "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
        "partyVotesNum": `${senateMembersStatistics[i].total_votes}`,
        "partyVotesPct": senateMembersStatistics[i].votes_with_party_pct.toFixed(1)
      })
    }
    return overallLoyaltyStatistics
  }

  function returnEngagement(senateMembersStatistics, sortedOnMissedVotesDescending, sortedOnMissedVotesAscending, percentage, lastPersonMissedVotes) {

    let overallLoyaltyStatisticsObject = getOverallLoyaltyStatistics(senateMembersStatistics)


    //now sort the array ascending and descending//
    let sortedOnVotesNumAscending = [...overallLoyaltyStatisticsObject].sort(function (a, b) {
      return parseFloat(a.partyVotesNum) - parseFloat(b.partyVotesNum);
    })



    let sortedOnVotesNumDescending = [...overallLoyaltyStatisticsObject].sort(function (a, b) {
      return parseFloat(b.partyVotesNum) - parseFloat(a.partyVotesNum);
    })


    let leastEngaged = [...sortedOnMissedVotesDescending].slice(0, (Math.round(percentage + 1)))
    let mostEngaged = [...sortedOnMissedVotesAscending].slice(0, (Math.round(percentage + 1)))

    //variables for party loyalty//
    let leastLoyal = [...sortedOnVotesNumAscending].slice(0, (Math.round(percentage + 1)))
    let mostLoyal = [...sortedOnVotesNumDescending].slice(0, (Math.round(percentage + 1)))



    for (i = (Math.round(percentage) + 1); i < senateMembersStatistics.length - (Math.round(percentage)); i++) {
      if (lastPersonMissedVotes === sortedOnMissedVotesAscending[i].missedVotesNum) {

        leastEngaged.push({
          "name": `${sortedOnMissedVotesDescending[i].name}`,
          "missedVotesNum": sortedOnMissedVotesDescending[i].missedVotesNum,
          "missedPct": sortedOnMissedVotesDescending[i].missedPct
        })
        mostEngaged.push({
          "name": `${sortedOnMissedVotesAscending[i].name}`,
          "missedVotesNum": sortedOnMissedVotesAscending[i].missedVotesNum,
          "missedPct": sortedOnMissedVotesAscending[i].missedPct
        })
        mostLoyal.push({
          "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
          "partyVotesNum": `${((senateMembersStatistics[i].votes_with_party_pct)/100)*senateMembersStatistics[i].total_votes}`,
          "partyVotesPct": senateMembersStatistics[i].votes_with_party_pct.toFixed(1)
        })
        leastLoyal.push({
          "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
          "partyVotesNum": `${((senateMembersStatistics[i].votes_with_party_pct)/100)*senateMembersStatistics[i].total_votes}`,
          "partyVotesPct": senateMembersStatistics[i].votes_with_party_pct
        })

      } else {
        break
      }
    }
    return {
      engagement: {
        leastEngaged: leastEngaged,
        mostEngaged: mostEngaged
      },
      loyalty: {
        leastLoyal: leastLoyal,
        mostLoyal: mostLoyal
      }
    }
  }

  function createGlanceTable(tableVariable, dataToShowcolumn2, dataToShowcolumn3, statistics) {
   
    for (m = 0; m < 3; m++) {



      let tr = document.createElement('tr')

      if (m == 0) {
        tr.innerHTML = "Republican"
      }
      if (m == 1) {

        tr.innerHTML = "Democrat"
      }
      if (m == 2) {

        tr.innerHTML = "Independent"
      }
      tableVariable.appendChild(tr)
      tr.insertCell().innerHTML = statistics.overall[dataToShowcolumn2][m]
      tr.insertCell().innerHTML = statistics[dataToShowcolumn3][m]
      

      
    }
  }

  function createTheTables(statistics) {
    console.log(statistics)
    //create the Senate at a glance table//

    let tableBody = document.getElementById("attendance-table")



    if (tableBody !== null) {

      createGlanceTable(tableBody, "numberOfRepresentatives", "votedWithParty", statistics)


    }

    //create the Senate at a glance missed votes table//
    let tableBody2 = document.getElementById("loyalty-table")
    if (tableBody2 !== null) {


      createGlanceTable(tableBody2, "numberOfRepresentatives", "votedWithParty", statistics)
    }
   

    //set the party statistics function to create the tables//
    function createPartyStatisticsTable(tableVariable, engagement, dataToShowcolumn1, dataToShowcolumn2, dataToShowcolumn3) {

      for (m = 0; m < statistics[engagement].length; m++) {

        // console.log(statistics[engagement][m][dataToShowcolumn1])

        let tr = document.createElement('tr')



        tableVariable.appendChild(tr)
        tr.insertCell().innerHTML = statistics[engagement][m][dataToShowcolumn1]
        tr.insertCell().innerHTML = statistics[engagement][m][dataToShowcolumn2]
        tr.insertCell().innerHTML = statistics[engagement][m][dataToShowcolumn3]



      }

    }



    let tableBody3 = document.getElementById("least-attendance-table")

    if (tableBody3 !== null) {


      createPartyStatisticsTable(tableBody3, "leastEngaged", "name", "missedVotesNum", "missedPct")
    }


    let tableBody4 = document.getElementById("most-attendance-table")

    if (tableBody4 !== null) {


      createPartyStatisticsTable(tableBody4, "mostEngaged", "name", "missedVotesNum", "missedPct")
    }


    let tableBody5 = document.getElementById("least-loyal-table")

    if (tableBody5 !== null) {


      createPartyStatisticsTable(tableBody5, "leastLoyalSenate", "name", "partyVotesNum", "partyVotesPct")
    }



    let tableBody6 = document.getElementById("most-loyal-table")

    if (tableBody6 !== null) {


      createPartyStatisticsTable(tableBody6, "mostLoyalSenate", "name", "partyVotesNum", "partyVotesPct")
    }
  }
  



//FETCHING AND LOADER PART//

// show loader//
function showLoader() {

  let mainContent = document.getElementById('mainContent')

  mainContent.style.display = "none"

  let animationWindow = document.getElementById('animationWindow')
  animationWindow.style.display = "block"

  animationWindow.style.background = "blue"
  animationWindow.style.height = "800px"
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
    .then(data => {
      apiData = data.results[0].members
      memberCollection = apiData
      let animationWindow = document.getElementById('animationWindow')
      animationWindow.style.display = "none"
      let mainContent = document.getElementById('mainContent')

      mainContent.style.display = "block"


      if (window.location.href === senateOverallUrl) {
        executeTableAndFiltersAfterDataAreFetched(apiData)
      }
      if (window.location.href === senateAttendanceUrl) {
        executeAttendanceAndLoyaltyTables(apiData)
      }
      if (window.location.href === senateLoyaltyUrl) {
        executeAttendanceAndLoyaltyTables(apiData)
      }
      if (window.location.href === houseOverallUrl) {
        executeTableAndFiltersAfterDataAreFetched(apiData)
      }
      if (window.location.href === houseAttendanceUrl) {
        executeAttendanceAndLoyaltyTables(apiData)
      }
      if (window.location.href === houseLoyaltyUrl) {
        executeAttendanceAndLoyaltyTables(apiData)
      }


    })
    .catch(error => console.log(error))

};

