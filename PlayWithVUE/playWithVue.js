
let url = "https://api.propublica.org/congress/v1/113/senate/members.json"


const app = new Vue({
    el: "#app",
    data: {

        members: [],
        filteredMembersArray: [],
        test: [],
        isChecked: ["republicanFilter", "democratFilter", "independentFilter"],
        rowData: []


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
        }
    },


    methods: {
        checkCheckboxChecked() {
         
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


