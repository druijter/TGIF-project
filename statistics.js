let republicans = []
let democrats = []
let independents = []

//extract data in array in variables//
var senatemembers = data.results[0].members
for (i=0; i<senatemembers.length; i++){

  
  if(senatemembers[i].party==="R")
  republicans.push(senatemembers[i])
  // console.log( senatemembers[i])
  if(senatemembers[i].party==="D")
  democrats.push(senatemembers[i])
  // console.log( senatemembers[i])
  if(senatemembers[i].party==="I")
  independents.push(senatemembers[i])
  // console.log( senatemembers[i])
}

//calculate average votes with party for republicans//
let totalvotepctreppro = 0
function calculatevoteswithparty (partytypearray){
  for(j=0; j<partytypearray.length; j++){
  
    totalvotepctreppro += partytypearray[j].votes_with_party_pct
    
  }
  
  let averagevotepctreppro = totalvotepctreppro/(partytypearray.length)
  return averagevotepctreppro

}


console.log(calculatevoteswithparty(republicans))

// let totalvotepctreppro = 0
// for(j=0; j<republicans.length; j++){
  
//   totalvotepctreppro += republicans[j].votes_with_party_pct
  
// }

// let averagevotepctreppro = totalvotepctreppro/(republicans.length)



let statistics = {
  "overall": {
    democrats: [{
        "democratsnum": democrats.length,
        "demvotepartypct": 0
      }

    ],
    republicans: [{
      "republicansnum": republicans.length,
      "repvotepartypct": 0
    }

  ],
  independents: [{
    "independentsnum": independents.length,
    "indepvotepartypct": 0
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


























