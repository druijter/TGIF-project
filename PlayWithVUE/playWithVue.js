let url = "https://api.propublica.org/congress/v1/113/senate/members.json"


const app = new Vue({
    el: "#app",
    data: {

        members: [],
        filteredMembersArray: [],

        isChecked: ["republicanFilter", "democratFilter", "independentFilter"],
        states: [],
        selected: "all",

    },
    created() {
        this.fetchData()

    },

    computed: {
        filteredMembers() {

            let members = this.members
            let filteredMembersArray = []
            console.log(this.selected)
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


    methods: {
        even: function (arr) {
            // Set slice() to avoid to generate an infinite loop!
            return arr.slice().sort(function (a, b) {
                return a.position - b.position;
            });

        },


        createDropdowns() {
            let members = this.members
            let stateArray = []
            let onlyStateArray = []
            console.log(stateArray)

            for (i = 0; i < members.length; i++) {
                stateArray.push(members[i].state)
            }
            console.log(stateArray)
            let sortedOnStateAscending = [...stateArray].sort()
            console.log(sortedOnStateAscending)


            //creating array with only states//

            for (j = 0; j < sortedOnStateAscending.length; j++) {
                if (sortedOnStateAscending[j] !== sortedOnStateAscending[j + 1]) {

                    console.log("sdsh")
                    onlyStateArray.push(sortedOnStateAscending[j])

                }

            }

            console.log(onlyStateArray)

            this.states = onlyStateArray
        },



        async fetchData() {

            this.members = await fetch(url, {
                    method: 'GET',
                    withCredentials: true,
                    headers: {

                        "X-API-KEY": 'y4GdOeUJNzi36ye8ISrsV5Fstamv7Ab0NNYJGOEA',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    return data.results[0].members
                })
                .catch(error => console.log(error))
            // console.log(this.even(this.members)) 
            this.createDropdowns()



        }
    }


})