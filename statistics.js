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


console.log(calculatevoteswithparty(republicans))
console.log(calculatevoteswithparty(democrats))
console.log(calculatevoteswithparty(independents))


// calculate the average vote percentage without a function works
// let totalvotepctreppro = 0
// for(j=0; j<republicans.length; j++){
  
//   totalvotepctreppro += republicans[j].votes_with_party_pct
  
// }




// let totalvotepctdempro = 0
// for(k=0; k<democrats.length; k++){
  
//   totalvotepctdempro += democrats[k].votes_with_party_pct
  
// }




// let totalvotepctindpro = 0
// for(l=0; l<independents.length; l++){
  
//   totalvotepctindpro += independents[l].votes_with_party_pct
  
// }


// let averagevotepctreppro = totalvotepctreppro/(republicans.length)
// let averagevotepctdempro = totalvotepctdempro/(democrats.length)
// let averagevotepctindpro = totalvotepctindpro/(independents.length)

// console.log(averagevotepctreppro, averagevotepctdempro, averagevotepctindpro)



let statistics = {
  "overall": {
    democrats: [{
        "democratsnum": democrats.length,
        "demvotepartypct": "" //calculatevoteswithparty(democrats)
      }

    ],
    republicans: [{
      "republicansnum": republicans.length,
      "repvotepartypct": "" //calculatevoteswithparty(republicans)
    }

  ],
  independents: [{
    "independentsnum": independents.length,
    "indepvotepartypct": "" //calculatevoteswithparty(independents)
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


























