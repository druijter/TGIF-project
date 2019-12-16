window.onload = function (){
    console.log(JSON.stringify(data,null,2))
    // document.getElementById("senate-data").innerHTML 
     
    var membercollection = data.results[0].members;
    
    for(i=0; i<membercollection.length; i++){
        
        console.log(membercollection[i].first_name + " " + (membercollection[i].middle_name || "")+ "" + membercollection[i].last_name)
        console.log(membercollection[i].party)
        console.log(membercollection[i].state)
        console.log(membercollection[i].seniority)
        console.log(membercollection[i].votes_with_party_pct)

    }
}

