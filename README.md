# ethereum-explorer-api
Node js API for scanning ethereum blockchain transactions
# Dependencies
  web3 0.20.1

# Configuration required
  You can configure the below in ./nodeserver/serverConfig.js

  i) In line 2, set your infura token. You can get infura token by signing on https://infura.io
  
     var INFURA_TOKEN = "<Your infura token>"
    
  ii) In line 5, you can set the port on which API should by run (default port : 8081)
  
  iii) In line 7, set the ethereum chain to connect to (by default Ethereum main net is set)

# Steps to run
1. Open command prompt

2. Run below command to install the required dependencies.
    
    > npm install

3. Run below command to start the API. On success, a message will appear in cmd window displaying the connected Ethereum network and port. 
    
    > npm start
    
  
