console.log("o")


let url = "https://api.propublica.org/congress/v1/113/senate/members.json"


const app = new Vue({
    el: "#app",
    data: {
        message: "s"
    },


    methods: {
        pushNewColor() {
            this.message = "hj"

        },

        fetchData() {

            fetch(url, {
                    method: 'GET',
                    withCredentials: true,
                    headers: {

                        "X-API-KEY": 'y4GdOeUJNzi36ye8ISrsV5Fstamv7Ab0NNYJGOEA',
                        'Content-Type': 'application/json'
                    }
                })

                .then(response => response.json())
                .then(data => {
                    this.message = data.results[0].members

                })
                .catch(error => console.log(error))

        }




    }

})


var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
})

