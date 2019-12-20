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

console.log(data.results[0].members)

let overallTotal = 0
// making a general function to calculate the overall average 
function calculateOverallAverage(datatype) {
  for (j = 0; j < datatype.length; j++) {


    overallTotal += data.results[0].members[j][datatype]



  }

  let overallAverage = overallTotal / (datatype.length)
  overallTotal = null
  return overallAverage

}

let senateMembersStatistics = data.results[0].members

//get overall vote statistics//
let overallVoteStatistics = []
for (i = 0; i < senateMembersStatistics.length; i++) {
  overallVoteStatistics.push({
    "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
    "missedVotesNum": senateMembersStatistics[i].missed_votes,
    "missedPct": senateMembersStatistics[i].missed_votes_pct
  })
}

let sortedOnMissedVotesDescending = [...overallVoteStatistics].sort(function (a, b) {
  return parseFloat(b.missedVotesNum) - parseFloat(a.missedVotesNum);
})

console.log(sortedOnMissedVotesDescending)



//create most engaged object//

let sortedOnMissedVotesAscending = [...overallVoteStatistics].sort(function (a, b) {
  return parseFloat(a.missedVotesNum) - parseFloat(b.missedVotesNum);
})

console.log(sortedOnMissedVotesAscending)  

const percentage = 0.10 * senateMembersStatistics.length

let lastPersonMissedVotes = sortedOnMissedVotesAscending[Math.round(percentage)].missedVotesNum
console.log(lastPersonMissedVotes)
let firstPersonOutMissedVotes = sortedOnMissedVotesAscending[Math.round(percentage + 1)].missedVotesNum


//get overall loyalty statistics
let overallLoyaltyStatistics = []
for (i = 0; i < senateMembersStatistics.length; i++) {
  overallLoyaltyStatistics.push({
    "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
    "partyVotesNum": `${((senateMembersStatistics[i].votes_with_party_pct)/100)*senateMembersStatistics[i].total_votes}`,
    "partyVotesPct": senateMembersStatistics[i].votes_with_party_pct
  })
}

console.log(overallLoyaltyStatistics)

//now sort the array ascending and descending//
let sortedOnVotesNumAscending = [...overallLoyaltyStatistics].sort(function (a, b) {
  return parseFloat(a.partyVotesNum) - parseFloat(b.partyVotesNum);
})

console.log(sortedOnVotesNumAscending)

let sortedOnVotesNumDescending = [...overallLoyaltyStatistics].sort(function (a, b) {
  return parseFloat(b.partyVotesNum) - parseFloat(a.partyVotesNum);
})

console.log(sortedOnVotesNumDescending)


function returnEngagement (){

  let leastEngaged = [...sortedOnMissedVotesDescending].slice(0, (Math.round( percentage+ 1)))
  let mostEngaged = [...sortedOnMissedVotesAscending].slice(0, (Math.round(percentage + 1)))

  //variables for party loyalty//
  let mostLoyal = [...sortedOnMissedVotesAscending].slice(0, (Math.round(percentage + 1)))
  let leastLoyal = [...sortedOnMissedVotesAscending].slice(0, (Math.round(percentage + 1)))

  console.log(leastEngaged,mostEngaged)

for(i=(Math.round(percentage)+1); i<senateMembersStatistics.length-(Math.round(percentage)); i++){
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
  } else {
    break
  }
}
return {engagement: {leastEngaged: leastEngaged, mostEngaged: mostEngaged}}
}
console.log(returnEngagement())


var test = returnEngagement()

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
    ]

  },


  "leastEngaged": test.engagement.leastEngaged,

  "mostEngaged": test.engagement.mostEngaged,


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

console.log(statistics.leastEngaged[0])

//set the party statistics function to create the tables//
function createPartyStatisticsTable(tableVariable, engagement, dataToShowcolumn1, dataToShowcolumn2, dataToShowcolumn3) {
  for (m = 0; m < statistics[engagement].length; m++) {



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

console.log(overallVoteStatistics)