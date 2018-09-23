// Transaction Service
var trxService = {    

    getTransaction : function(req, res){
       var txId = req.params.txId;
       
        web3.eth.getTransaction(txId, function(err, trx){
           if(err){
               console.log("Some error occurred..!!!");
               console.log(err);
               res.json(err);
           }
           else{
               if(trx){
                    web3.eth.getTransactionReceipt(txId, function(err, receipt){
                        if(err){
                            console.log("Some error occurred..!!!");
                            console.log(err);
                            res.json(err);
                        }
                        else{
                            createResponse(trx, receipt, res);
                        }
                    });
                }
                else{
                    res.json("No Transaction found...!!! Please ensure the correct Chain is configured in 'serverConfig.js'");
                }               
           }
       });       
    }    
}

function createResponse(trx, receipt, res){     
    
    if(trx.to){
        // Not Contract creation transaction.
        web3.eth.getCode(trx.to, function(err,code){
            if(err){
                console.log("Some error occurred..!!!");
                console.log(err);
                res.json(err);
            }
            else {
                if(code == '0x'){
                    // Account transfer - To addressess should not be a contract.
                    var result = createAccountTransferResponse(trx, receipt);
                    res.json(result);
                }
                else {                                           
                    if(trx.input){
                        var hexFunction = trx.input.substring(2, 10);
                        if(hexFunction == web3.sha3('transfer(address,uint256)').substring(2, 10)){
                            // ERC 20 token transfer.
                            var result = createERC20Response(trx, receipt);
                            res.json(result);
                        }
                        else{
                            // Contract Execution.
                            res.json('Contract execution transaction - Not Implemented...!!!');
                        }
                    }
                    
                }
            }
            
        });
    }
    else{
        // Contract creation.
        res.json('Contract creation transaction - Not Implemented...!!!');
    }
}

function createAccountTransferResponse(trx, receipt){

    var result = {  
        "block":{  
           "blockHeight":trx.blockNumber
        },
        "outs":[  
           {  
              "address": trx.to,
              "value": trx.value
           }
        ],
        "ins":[  
           {  
              "address": trx.from,
              "value": "-" + trx.value
           }
        ],
        "hash": trx.hash,
        "currency":"ETH",
        "chain": getCurrentChain(),
        "state": receipt.status == '0x1'? 'confirmed':'pending',
        "depositType":"account"
     }
     
    return result;
}

function createERC20Response(trx, receipt){

    var result = {  
        "block":{  
           "blockHeight":trx.blockNumber
        },
        "outs":[  
           {  
              "address": getToAddress(trx.input),
              "value": getTokenQty(trx.input),
              "type": "token",
              "coinspecific": {
                  "tokenAddress": trx.to
              }
  
           }
        ],
        "ins":[  
           {  
              "address": trx.from,
              "value": "-" + getTokenQty(trx.input),
              "type": "token",
              "coinspecific": {
                  "tokenAddress": trx.to
              }
           }
        ],
        "hash": trx.hash,
        "currency":"ETH",
        "chain": getCurrentChain(),
        "state": receipt.status == '0x1'? 'confirmed':'pending',
        "depositType":"Contract"
     }
     
    return result;
}

function getCurrentChain(){
    var provider = web3.currentProvider;    
    if(provider.host.indexOf('ropsten') !== -1){
        return "ETH.ropsten";
    }
    else if(provider.host.indexOf('kovan') !== -1){
        return "ETH.kovan";
    }
    else if(provider.host.indexOf('rinkeby') !== -1){
        return "ETH.rinkeby";
    }
    else{
        return "ETH.main";
    }
}

function getToAddress(input){
    return '0x' + input.substring(34, 74);
}

function getTokenQty(input){
    return web3.toBigNumber('0x' + input.substring(74, input.length)).toString(10)
}

module.exports = trxService;