window.onload = function () {



    var membercollection = data.results[0].members;





    for (i = 0; i < membercollection.length; i++) {


        var tr = document.createElement("TR")

        document.getElementById("house-data").appendChild(tr)



        for (j = 0; j < 5; j++) {
            
           

            var td = document.createElement("td")
            tr.appendChild(td)
            if (j == 0) {
                
                var a = document.createElement("a")
                a.href = membercollection[i].url
                a.innerHTML = membercollection[i].first_name + " " + (membercollection[i].middle_name || "") + "" + membercollection[i].last_name
                td.appendChild(a)
            

            }
            if (j == 1) {
                td.innerHTML = membercollection[i].party
            }
            if (j == 2) {
                td.innerHTML = membercollection[i].state
            }
            if (j == 3) {
                td.innerHTML = membercollection[i].seniority
            }
            if (j == 4) {
                td.innerHTML = membercollection[i].votes_with_party_pct
            } else {
                null
            }




        }

    }


    
    var first = document.getElementsByTagName("thead");
    var second = document.getElementsByTagName("tr")[1];
    
    first.appendChild(second)

   
}








