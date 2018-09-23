// Put your infura token here.
var INFURA_TOKEN = "d9e96b40071b4f79b975d2cd638a4f1f"

var config ={  
    "port" : 8081,
    "infuraToken": INFURA_TOKEN,
    "defaultChain" : "MAIN_NET",
    "chain":{  
       "MAIN_NET":{  
          name:"Ethereum Main Net",
          url:"https://mainnet.infura.io/v3/"         + INFURA_TOKEN
       },
       "ROPSTEN":{  
          name:"Ropsten Network",
          url:"https://ropsten.infura.io/v3/"         + INFURA_TOKEN
       },
       "KOVAN":{  
            name:"Kovan Network",
            url:"https://kovan.infura.io/v3/"         + INFURA_TOKEN
        },
        "RINKEBY":{  
            name:"Rinkeby Network",
            url:"https://rinkeby.infura.io/v3/"         + INFURA_TOKEN
        },
    }
 }

module.exports = config;