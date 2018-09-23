var txService = require('../api/transactionService');

module.exports = function(app) {

    app.get("/eth/api/v1/transaction/:txId", function (req, res) {
        return txService.getTransaction(req, res);
    });    

};
