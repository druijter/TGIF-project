let republicans = []
let democrats = []
let independents = []

//extract data in array in variables//
var senatemembers = data.results[0].members
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


























