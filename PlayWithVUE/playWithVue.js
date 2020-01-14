let url = "https://api.propublica.org/congress/v1/113/senate/members.json"


const app = new Vue({
            el: "#app",
            data: {

                members: [],
                filteredMembersArray: [],

                isChecked: ["republicanFilter", "democratFilter", "independentFilter"],
                statesArray: [],
                selected: ""

            },
            created() {
                this.fetchData()

            },

            computed: {
                filteredMembers() {

                    let members = this.members
                    let filteredMembersArray = []

                    for (i = 0; i < members.length; i++) {


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

                    filter() {





                            let members = this.members
                            let filteredMembersArray = []


                            for (i = 0; i < members.length; i++) {


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


                            this.filteredMembers = filteredMembersArray






                        },

                        createDropdowns() {
                            let members = this.members
                            let stateArray = []
                            console.log(stateArray)

                            for (i = 0; i < members.length; i++) {
                                stateArray.push(members[i].state)
                            }
                            console.log(stateArray)
                            let sortedOnStateAscending = [...stateArray].sort(function (a, b) {
                                if (a.state < b.state) return -1;
                                else if (a.state > b.state) return 1;
                                else return 0;

                            })
                            console.log(sortedOnStateAscending)

                            let test = [...stateArray].sort(function (a, b) {
                                if (a.state < b.state) return -1;
                                else if (a.state > b.state) return 1;
                                else return 0;

                            })
                            console.log(test)
                            this.states = stateArray
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