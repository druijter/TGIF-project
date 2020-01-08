

let senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";
let houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json"

let apiData = [];

let memberCollection;


if (window.location.href === "file:///home/daan/Desktop/Ubiqum/tgif/house-party-loyalty.html"){
    fetchData2(houseUrl)
}
if (window.location.href === "file:///home/daan/Desktop/Ubiqum/tgif/senate-party-loyalty.html"){
    fetchData2(senateUrl)
}
if (window.location.href === "file:///home/daan/Desktop/Ubiqum/tgif/house-attendance.html"){
    fetchData2(houseUrl)
}
if (window.location.href === "file:///home/daan/Desktop/Ubiqum/tgif/senate-attendance.html"){
    fetchData2(senateUrl)
}


console.log(apiData)

function executeAttendanceAndLoyaltyTables() {



  //define some global variables//
  let senateMembersStatistics = memberCollection


  let republicans = []
  let democrats = []
  let independents = []
  let overallVoteStatistics = []

  //extract data in array in variables//
  function extractPartyMembers() {

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
    return average

  }



  // making a general function to calculate the overall average 
  function calculateOverallAverage(datatype) {

    let overallTotal = 0
    for (j = 0; j < datatype.length; j++) {


      overallTotal += data.results[0].members[j][datatype]



    }

    let overallAverage = overallTotal / (datatype.length)
    overallTotal = null
    return overallAverage

  }



  //get overall vote statistics//

  function getOverallVoteStatistics() {


    for (i = 0; i < senateMembersStatistics.length; i++) {
      overallVoteStatistics.push({
        "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
        "missedVotesNum": senateMembersStatistics[i].missed_votes,
        "missedPct": senateMembersStatistics[i].missed_votes_pct.toFixed(1)
      })
    }
    return overallVoteStatistics
  }


  const overallVoteStatisticsObject = getOverallVoteStatistics()



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


  //get overall loyalty statistics

  function getOverallLoyaltyStatistics() {
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





  function returnEngagement() {
    let overallLoyaltyStatisticsObject = getOverallLoyaltyStatistics()


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



  var test = returnEngagement()
  var partyMembersObject = extractPartyMembers()


  let statistics = {
    "overall": {

      numberOfRepresentatives: [
        partyMembersObject.democrats.length,
        partyMembersObject.republicans.length,
        partyMembersObject.independents.length
      ],

      votedWithParty: [
        calculateAveragePerParty(democrats, "votes_with_party_pct").toFixed(1),
        calculateAveragePerParty(republicans, "votes_with_party_pct").toFixed(1),
        calculateAveragePerParty(independents, "votes_with_party_pct").toFixed(1)
      ],

      missedVotePerParty: [
        calculateAveragePerParty(democrats, "missed_votes_pct"),
        calculateAveragePerParty(republicans, "missed_votes_pct"),
        calculateAveragePerParty(independents, "missed_votes_pct")
      ]

    },


    "leastEngaged": test.engagement.leastEngaged,

    "mostEngaged": test.engagement.mostEngaged,

    "leastLoyalSenate": test.loyalty.leastLoyal,

    "mostLoyalSenate": test.loyalty.mostLoyal,

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


  //function that creates all tables//
  function createTheTables() {

    //create the Senate at a glance table//

    let tableBody = document.getElementById("attendance-table")



    if (tableBody !== null) {

      createGlanceTable(tableBody, "numberOfRepresentatives", "votedWithParty")


    }

    //create the Senate at a glance missed votes table//
    let tableBody2 = document.getElementById("loyalty-table")
    if (tableBody2 !== null) {


      createGlanceTable(tableBody2, "numberOfRepresentatives", "votedWithParty")
    }


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


    let tableBody5 = document.getElementById("least-loyal-table")

    if (tableBody5 !== null) {


      createPartyStatisticsTable(tableBody5, "leastLoyalSenate", "name", "partyVotesNum", "partyVotesPct")
    }



    let tableBody6 = document.getElementById("most-loyal-table")

    if (tableBody6 !== null) {


      createPartyStatisticsTable(tableBody6, "mostLoyalSenate", "name", "partyVotesNum", "partyVotesPct")
    }
  }
  createTheTables()
}


// show loader//
function showLoader() {
  // document.body.innerHTML="s"
  var mainContent = document.getElementById('mainContent')
  console.log(mainContent)
  mainContent.style.display = "none"
  console.log("hi")
  var animationWindow = document.getElementById('animationWindow')
  animationWindow.style.display = "block"

  animationWindow.style.background = "blue"
  animationWindow.style.height = "800px"
  animationWindow.style.fontSize = "450%"
  animationWindow.style.color = "white"
  animationWindow.style.textAlign = "center"
  animationWindow.style.paddingTop = "250px"

}




function fetchData2(url) {


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
    console.log(apiData)
    memberCollection = apiData
    console.log(memberCollection)
    let animationWindow = document.getElementById('animationWindow')
    animationWindow.style.display = "none"
    let mainContent = document.getElementById('mainContent')
    console.log(mainContent)
    mainContent.style.display = "block"

    executeAttendanceAndLoyaltyTables(memberCollection)


  })
  .catch(error => console.log(error))

};