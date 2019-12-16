window.onload = function (){
    console.log(JSON.stringify(data,null,2))
    
     
    var membercollection = data.results[0].members;
    
    
   
    
    
    for(i=0; i<membercollection.length; i++){
        var a = "a"
        var tr = document.createElement("TR")
        tr.id = a + i
        console.log(tr.id)
        
         document.getElementById("senate-data").appendChild(tr)
         tr.innerHTML += "ajax" 
         
        
        for(j=0; j<6; j++){
            var b = "b"
            var td = document.createElement("td")
            tr.appendChild(td)
            td.id = b + j
            document.getElementById(td.id).innerHTML="test"
        }
    

        var row = document.getElementsByTagName(tr)
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

    }
}

