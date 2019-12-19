let republicans = []
let democrats = []
let independents = []

//extract data in array in variables//
let senateMembers = data.results[0].members
for (i = 0; i < senateMembers.length; i++) {


  if (senateMembers[i].party === "R")
    republicans.push(senateMembers[i])

  if (senateMembers[i].party === "D")
    democrats.push(senateMembers[i])

  if (senateMembers[i].party === "I")
    independents.push(senateMembers[i])

}



let total = 0
// making a general function to calculate the average per party
function calculateAveragePerParty(partyTypeArray, datatype) {
  for (j = 0; j < partyTypeArray.length; j++) {


    total += partyTypeArray[j][datatype]



  }

  let average = total / (partyTypeArray.length)
  total = null
  return average

}



let statistics = {
  "overall": {

    numberOfRepresentatives: [
      democrats.length,
      republicans.length,
      independents.length
    ],

    votedWithParty: [
      calculateAveragePerParty(democrats, "votes_with_party_pct"),
      calculateAveragePerParty(republicans, "votes_with_party_pct"),
      calculateAveragePerParty(independents, "votes_with_party_pct")
    ],

    missedVotePerParty: [
      calculateAveragePerParty(democrats, "missed_votes_pct"),
      calculateAveragePerParty(republicans, "missed_votes_pct"),
      calculateAveragePerParty(independents, "missed_votes_pct")
    ],
  },


  "leastengaged": {
    "name": 0,
    "missedvotesnum": 0,
    "missedpct": 0
  },

  "mostengaged": {
    "name": 0,
    "missedvotesnum": 0,
    "missedpct": 0
  }

}


function createGlanceTable(tableVariable, dataToShowcolumn2, dataToShowcolumn3) {
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
    tr.insertCell().innerHTML = statistics.overall[dataToShowcolumn3][m]



  }
}




//create the Senate at a glance table//

let tableBody = document.getElementById("senate-attendance-table")



if (tableBody !== null) {

  createGlanceTable(tableBody, "numberOfRepresentatives", "votedWithParty")


}

//create the Senate at a glance missed votes table//
let tableBody2 = document.getElementById("senate-party-loyalty-table")
if (tableBody2 !== null) {


  createGlanceTable(tableBody2, "numberOfRepresentatives", "votedWithParty")
}
console.log(statistics)