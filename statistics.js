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

//calculate average votes with party with a function//
let totalVotePctPro = 0

function calculateVotesWithParty(partyTypeArray) {
  for (j = 0; j < partyTypeArray.length; j++) {

    totalVotePctPro += partyTypeArray[j].votes_with_party_pct

  }

  let averageVotePctPro = totalVotePctPro / (partyTypeArray.length)
  totalVotePctPro = null
  return averageVotePctPro

}

//calculate average missed votes with party with a function//
let totalMissedVotePct = 0

function calculateMissedVotesWithParty(partyTypeArray) {
  for (j = 0; j < partyTypeArray.length; j++) {

    totalMissedVotePct += partyTypeArray[j].missed_votes_pct

  }

  let averageMissedVotePct = totalMissedVotePct / (partyTypeArray.length)
  totalMissedVotePct = null
  return averageMissedVotePct

}

let total = 0
// making a general function
function calculateAveragePerParty(partyTypeArray, datatype) {
  for (j = 0; j < partyTypeArray.length; j++) {

    
    total += partyTypeArray[j][datatype]
    
    

  }

  let average = total / (partyTypeArray.length)
  total = null
  return average

}

console.log(calculateAveragePerParty(democrats, "dw_nominate"))


let statistics = {
  "overall": {

    numberOfRepresentatives: [
      democrats.length,
      republicans.length,
      independents.length
    ],

    votedWithParty: [
      calculateVotesWithParty(democrats),
      calculateVotesWithParty(republicans),
      calculateVotesWithParty(independents)
    ],

    missedVotePerParty: [
      calculateMissedVotesWithParty(democrats),
      calculateMissedVotesWithParty(republicans),
      calculateMissedVotesWithParty(independents)
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





//create the Senate at a glance table//

let tableBody = document.getElementById("senate-attendance-table")

console.log(tableBody === null)

if (tableBody !== null) {

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
    tableBody.appendChild(tr)
    tr.insertCell().innerHTML = statistics.overall.numberOfRepresentatives[m]
    tr.insertCell().innerHTML = statistics.overall.votedWithParty[m]

    console.log("hihlh")

  }
}

let tableBody2 = document.getElementById("senate-party-loyalty-table")
if (tableBody2 !== null) {

  //create the Senate at a glance missed votes table//
  


  for (n = 0; n < 3; n++) {



    let tr = document.createElement('tr')

    if (n == 0) {
      tr.innerHTML = "Republican"
    }
    if (n == 1) {

      tr.innerHTML = "Democrat"
    }
    if (n == 2) {

      tr.innerHTML = "Independent"
    }
    tableBody2.appendChild(tr)
    tr.insertCell().innerHTML = statistics.overall.numberOfRepresentatives[n]
    tr.insertCell().innerHTML = statistics.overall.votedWithParty[n]



  }
}
console.log(statistics)