window.onload = function () {

  

    var membercollection = data.results[0].members;





    for (i = 0; i < membercollection.length; i++) {


        
        var tr = document.createElement("TR")



        document.getElementById("senate-data").appendChild(tr)



        for (j = 0; j < 5; j++) {

            var thstijl = document.getElementById("thstijl1") 
            console.log(thstijl) 
              
            // var thstijl2 = document.getElementById('thstijl2')
            // var thstijl3 = document.getElementById('thstijl3')
            // var thstijl4 = document.getElementById('thstijl4')
            // var thstijl5 = document.getElementById('thstijl5')

            var td = document.createElement("td")
            tr.appendChild(td)
            if (j == 0) {
                td.innerHTML = membercollection[i].first_name + " " + (membercollection[i].middle_name || "") + "" + membercollection[i].last_name
                
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


    console.log("hidahafklfhj")
    var first = document.getElementsByTagName("thead");
    var second = document.getElementsByTagName("tr")[1];
    console.log(first)
    first.appendChild(second)


}








// var fullname = membercollection[i].first_name + " " + (membercollection[i].middle_name || "")+ "" + membercollection[i].last_name;
// var party = membercollection[i].party
// var state = membercollection[i].state
// var seniority = membercollection[i].seniority
// var votes = membercollection[i].votes_with_party_pct

//  document.getElementById("senate-data").innerHTML += membercollection[i].first_name + " " + (membercollection[i].middle_name || "")+ "" + membercollection[i].last_name +
//  " " + membercollection[i].party + " " + membercollection[i].state + " " + membercollection[i].seniority + " " + membercollection[i].votes_against_party_pct + " " 

// document.getElementById("senate-data").innerHTML = td.innerHTML