function x (){
    console.log(JSON.stringify(data,null,2))
    
     
    var membercollection = data.results[0].members;
    
    
   
    
    
    for(i=0; i<membercollection.length; i++){
        var a = "a"
        var tr = document.createElement("TR")
        tr.className = a + i
        console.log(tr.className)
        
         document.getElementById("senate-data").appendChild(tr)

        
         tr.innerHTML += " testt"
        
         

       
        for(j=0; j<5; j++){
           
            var b = "b"
                var td = document.createElement("td")
                tr.appendChild(td)
                td.className = b + j
                console.log("hi")
            function tdCreator (){
                // document.getElementById('b0').innerHTML = "test"
                // b0.innerHTML = "hi" 

            // if (td.id === "b0") {
            //     console.log (td.id)
            //     b0.innerHTML += "hi"
                
            // // }
            // if (td.className === "b1") {
            //     console.log (td.id)
            //     b1.innerHTML += "hi2"
                
            // }
            // if (td.className === "b2") {
            //     console.log (td.id)
            //     b2.innerHTML += "hi3"
                
            // }
            // if (td.className === "b3") {
            //     console.log (td.id)
            //     b3.innerHTML += "hi4"
                
            // }
            // if (td.className === "b4") {
            //     console.log (td.id)
            //     b4.innerHTML += "hi5"
                
            // }
            
            
            }
            tdCreator ()
            
        
        }




        // var row = document.getElementsByTagName(tr)
        // document.getElementById("senate-data").appendChild(row)
        //     console.log("hi")

        // var fullname = membercollection[i].first_name + " " + (membercollection[i].middle_name || "")+ "" + membercollection[i].last_name;
        // var party = membercollection[i].party
        // var state = membercollection[i].state
        // var seniority = membercollection[i].seniority
        // var votes = membercollection[i].votes_with_party_pct
        

       
        
        // document.createElement("TD");
        // document.getElementsByTagName('td').innerHTML = fullname
        // tr.appendChild(td)
        // document.createElement("TD");
      
        // td.innerHTML = party
        
        
        
        
     
        

        //  document.getElementById("senate-data").innerHTML += membercollection[i].first_name + " " + (membercollection[i].middle_name || "")+ "" + membercollection[i].last_name +
        //  " " + membercollection[i].party + " " + membercollection[i].state + " " + membercollection[i].seniority + " " + membercollection[i].votes_against_party_pct + " " 

        // document.getElementById("senate-data").innerHTML = td.innerHTML


    
// for (k=0 k<r.length)
    }

    
    var r = document.getElementsByClassName('a0')
    console.log(r)

}

x();




