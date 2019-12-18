let republicans = []
let democrats = []
let independents = []

//extract data in array in variables//
let senatemembers = data.results[0].members
for (i=0; i<senatemembers.length; i++){

  
  if(senatemembers[i].party==="R")
  republicans.push(senatemembers[i])

  if(senatemembers[i].party==="D")
  democrats.push(senatemembers[i])
 
  if(senatemembers[i].party==="I")
  independents.push(senatemembers[i])
  
}

//calculate average votes with party with a function//
let totalvotepctpro = 0
function calculatevoteswithparty (partytypearray){
  for(j=0; j<partytypearray.length; j++){
  
    totalvotepctpro += partytypearray[j].votes_with_party_pct
    
  }
  
  let averagevotepctpro = totalvotepctpro/(partytypearray.length)
  totalvotepctpro = null
  return averagevotepctpro

}

let statistics = {
  "overall": {
    democrats: [{
        "democratsnum": democrats.length,
        "demvotepartypct": calculatevoteswithparty(democrats)
      }

    ],
    republicans: [{
      "republicansnum": republicans.length,
      "repvotepartypct": calculatevoteswithparty(republicans)
    }

  ],
  independents: [{
    "independentsnum": independents.length,
    "indepvotepartypct": calculatevoteswithparty(independents)
  }

],


  },


  "leastengaged": [{
    "name": 0,
    "missedvotesnum": 0,
    "missedpct": 0
  }],

  "mostengaged": [{
    "name": 0,
    "missedvotesnum": 0,
    "missedpct": 0
  }]

}

console.log(statistics)

console.log(statistics.overall.democrats[0].democratsnum)
console.log(statistics.overall.republicans[0].republicansnum)
console.log(statistics.overall.independents[0].independentsnum)
console.log(statistics.overall.democrats[0].demvotepartypct)
console.log(statistics.overall.republicans[0].repvotepartypct)
console.log(statistics.overall.independents[0].indepvotepartypct)



//create the Senate at a glance table//
let tablebody = document.getElementById("senate-attendance-table")
// console.log(tablebody)

for (m=0; m<3; m++){
let tr = document.createElement('tr')
tablebody.appendChild(tr)
}
// tr.insertCells()

// need to organize data otherwise (arrays on column header)






















