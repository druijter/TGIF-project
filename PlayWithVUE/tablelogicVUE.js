let url = "https://api.propublica.org/congress/v1/113/senate/members.json"

let senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";
let houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json"

Vue.component('loading-screen', {
    template: '<div id="loading">Loading...</div>'
  })

const app = new Vue({
    el: "#app",
    data: {

        members: [],
        filteredMembersArray: [],

        isChecked: ["republicanFilter", "democratFilter", "independentFilter"],
        states: [],
        selected: "all",
        test: [],
        isLoading: true,

        //global variables necessary for the attendance and loyalty functions//
        republicans: [],
        democrats: [],
        independents: [],
        overallVoteStatistics: [],
        statistics: {}


    },
  
       
          
   
    created() {
        let windowLocation = window.location.href

        if (windowLocation.includes("house")) {

            this.fetchData(houseUrl)
        }
        if (windowLocation.includes("senate")) {

            this.fetchData(senateUrl)
        }




    },

    computed: {
        filteredMembers() {

            let members = this.members
            let filteredMembersArray = []

            for (i = 0; i < members.length; i++) {

                if (this.selected === members[i].state || this.selected === "all") {


                    if (members[i].party === "R" && this.isChecked.includes("republicanFilter")) {
                        filteredMembersArray.push(members[i])


                    }
                    if (members[i].party === "D" && this.isChecked.includes("democratFilter")) {
                        filteredMembersArray.push(members[i])


                    }
                    if (members[i].party === "I" && this.isChecked.includes("independentFilter")) {
                        filteredMembersArray.push(members[i])


                    }

                }


            }
            return filteredMembersArray;
        },




    },


    methods: 
       
    
    {
        showLoader (situation){
            console.log("hi")  
            this.isLoading = situation
            console.log(situation)  
          },
        executeAttendanceAndLoyaltyFunctions() {



            //define some global variables//
            let senateMembersStatistics = this.members


            let republicans = []
            let democrats = []
            let independents = []
            let overallVoteStatistics = []
            
            let partyMembersObject = this.extractPartyMembers(republicans, democrats, independents)
            console.log(partyMembersObject)


            const overallVoteStatisticsObject = this.getOverallVoteStatistics(overallVoteStatistics, senateMembersStatistics)



            let sortedOnMissedVotesDescending = [...overallVoteStatisticsObject].sort(function (a, b) {
                return parseFloat(b.missedVotesNum) - parseFloat(a.missedVotesNum);
            })


            console.log(sortedOnMissedVotesDescending)


            //create most engaged object//

            let sortedOnMissedVotesAscending = [...overallVoteStatisticsObject].sort(function (a, b) {
                return parseFloat(a.missedVotesNum) - parseFloat(b.missedVotesNum);
            })



            const percentage = 0.10 * senateMembersStatistics.length

            let lastPersonMissedVotes = sortedOnMissedVotesAscending[Math.round(percentage)].missedVotesNum

            let firstPersonOutMissedVotes = sortedOnMissedVotesAscending[Math.round(percentage + 1)].missedVotesNum

            let engagementAndLoyaltyObject = this.returnEngagement(senateMembersStatistics, sortedOnMissedVotesDescending, sortedOnMissedVotesAscending, percentage, lastPersonMissedVotes)



            //get overall loyalty statistics

            this.getOverallLoyaltyStatistics(senateMembersStatistics)

             democrats = this.extractPartyMembers().democrats
             republicans = this.extractPartyMembers().republicans
             independents = this.extractPartyMembers().independents

            let statistics = {}

            console.log(this.democrats)
            statistics.glanceTable = [{

                    party: "democrats",
                    numberOfRepresentatives: partyMembersObject.democrats.length,
                    votedWithParty: this.calculateAveragePerParty(democrats, "votes_with_party_pct").toFixed(1)
                    
                },
                {
                    party: "republicans",
                    numberOfRepresentatives: partyMembersObject.republicans.length,
                    votedWithParty: this.calculateAveragePerParty(republicans, "votes_with_party_pct").toFixed(1)
                },
                {
                    party: "independents",
                    numberOfRepresentatives: partyMembersObject.independents.length,
                    votedWithParty: this.calculateAveragePerParty(independents, "votes_with_party_pct").toFixed(1)
                }
            ]



            console.log(statistics.glanceTable)


            statistics.missedVotePerParty = [
                this.calculateAveragePerParty(democrats, "missed_votes_pct"),
                this.calculateAveragePerParty(republicans, "missed_votes_pct"),
                this.calculateAveragePerParty(independents, "missed_votes_pct")
            ]



            statistics.leastEngaged = engagementAndLoyaltyObject.engagement.leastEngaged
            console.log(statistics.leastEngaged)

            statistics.mostEngaged = engagementAndLoyaltyObject.engagement.mostEngaged

            statistics.leastLoyal = engagementAndLoyaltyObject.loyalty.leastLoyal

            statistics.mostLoyal = engagementAndLoyaltyObject.loyalty.mostLoyal

            console.log(statistics)
            this.statistics = statistics




            // this.extractPartyMembers()
            // this.calculateAveragePerParty()


            // let members = this.members
            // console.log(members)
            // let test = []
            // test.push(members)
            // console.log("sd")
            // this.test = test
        },



        createDropdowns() {
            let members = this.members
            let stateArray = []
            let onlyStateArray = []


            for (i = 0; i < members.length; i++) {
                stateArray.push(members[i].state)
            }

            let sortedOnStateAscending = [...stateArray].sort()



            //creating array with only states//

            for (j = 0; j < sortedOnStateAscending.length; j++) {
                if (sortedOnStateAscending[j] !== sortedOnStateAscending[j + 1]) {


                    onlyStateArray.push(sortedOnStateAscending[j])

                }

            }



            this.states = onlyStateArray
        },

        //METHODS FOR THE SENATE AND HOUSE ATTENDANCE AND LOYALTY PAGES//



        extractPartyMembers() {
            // console.log(republicans)

            let republicans = []
            let democrats = []
            let independents = []

            let senateMembers = this.members
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
        },

        // //general function to calculate the average per party//
        calculateAveragePerParty(partyTypeArray, datatype) {

            console.log(partyTypeArray)

            let total = 0

            for (j = 0; j < partyTypeArray.length; j++) {

                total += partyTypeArray[j][datatype]

            }

            let average = total / (partyTypeArray.length)
            console.log(average, total, partyTypeArray.length)

            total = null
            if (!isNaN(average)) {
                return average
            }
            if (isNaN(average)) {
                return 0
            }
        },

        //get overall vote statistics//
        getOverallVoteStatistics(overallVoteStatistics, memberCollection) {
            let senateMembersStatistics = memberCollection


            for (i = 0; i < senateMembersStatistics.length; i++) {
                overallVoteStatistics.push({
                    "name": `${senateMembersStatistics[i].first_name} ${(senateMembersStatistics[i].middle_name || " ")}  ${senateMembersStatistics[i].last_name}`,
                    "missedVotesNum": senateMembersStatistics[i].missed_votes,
                    "missedPct": senateMembersStatistics[i].missed_votes_pct.toFixed(1)
                })
            }
            return overallVoteStatistics
        },

        //get overall loyalty statistics

        getOverallLoyaltyStatistics(memberCollection) {
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
        },

        //return engagement object//
        returnEngagement(senateMembersStatistics, sortedOnMissedVotesDescending, sortedOnMissedVotesAscending, percentage, lastPersonMissedVotes) {

            let overallLoyaltyStatisticsObject = this.getOverallLoyaltyStatistics(senateMembersStatistics)


            //now sort the array ascending and descending//
            let sortedOnVotesNumAscending = [...overallLoyaltyStatisticsObject].sort(function (a, b) {
                return parseFloat(a.partyVotesNum) - parseFloat(b.partyVotesNum);
            })

            let sortedOnVotesNumDescending = [...overallLoyaltyStatisticsObject].sort(function (a, b) {
                return parseFloat(b.partyVotesNum) - parseFloat(a.partyVotesNum);
            })

            let leastEngaged = [...sortedOnMissedVotesDescending].slice(0, (Math.round(percentage + 1)))
            console.log(sortedOnMissedVotesDescending)


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
        },

        //Fetch the data from the Propublica website//
        async fetchData(url) {
            this.showLoader(true)
            this.members = await fetch(url, {
                    method: 'GET',
                    withCredentials: true,
                    headers: {

                        "X-API-KEY": 'y4GdOeUJNzi36ye8ISrsV5Fstamv7Ab0NNYJGOEA',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json()
                
                )
              
                .then(data => {
                    return data.results[0].members
                })
                .catch(error => console.log(error))
                  this.showLoader(false)
            this.createDropdowns()
            this.executeAttendanceAndLoyaltyFunctions()


        }
    }


})