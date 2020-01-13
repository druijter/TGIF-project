console.log("o")


let url = "https://api.propublica.org/congress/v1/113/senate/members.json"


const app = new Vue({
    el: "#app",
    data: {

        members: [],
        test: [],
        senator: [],
        party: [],
        state: [],
        yearsInOffice: [],
        votesParty: [],
        rowData: []


    },
    created() {
        this.fetchData()
        this.executeAfterVueInstanceCreated()
        // console.log(rowData)
    },
    // watch: {
    //     checkedNames: function () {
    //         console.log("ajax")
    //     }
    // },


    methods: {
        filterOnRepublicans() {
            console.log(this.members)

            console.log(this.members[0].party)
            console.log("pietje")
        },
        // doThingWithRealValue(val){console.log("sdsdsd")},
        executeAfterVueInstanceCreated() {
            // console.log(this.members)
            this.test = ""

        },



        //         addItem() {
        //             let tableData = this.members
        //             console.log(tableData[0].id)

        //             // this.senator = []
        //             // this.party = []
        //             // this.state= []
        //             // this.yearsInOffice = []
        //             // this.votesParty= []

        // console.log(tableData[0].first_name)
        //             let rowData = []
        //             let tableRow = {
        //                 senator: tableData[0].first_name,
        //                 party: tableData[0].party,
        //                 state: tableData[0].state,
        //                 yearsInOffice: tableData[0].seniority,
        //                 votesParty: tableData[0].votes_with_party_pct
        //             };
        //             console.log(tableRow.senator)
        //             rowData.push(tableRow)
        //             console.log(rowData)
        //             return rowData

        //             // this.senator = [],
        //             //     this.party = [],
        //             //     this.state = [],
        //             //     this.yearsInOffice = [],
        //             //     this.votesParty = []

        //                 // console.log(x[0].id)
        //                 // this.test=x[0].id
        //         },

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
        }




    }

})
console.log(app)

// console.log(app.persons)





//everything I don't need//

// var app2 = new Vue({
//     el: '#app-2',
//     data: {
//         message: 'You loaded this page on ' + new Date().toLocaleString()
//     }
// })

// var app3 = new Vue({
//     el: '#app-3',
//     data: {
//         seen: true
//     }
// })