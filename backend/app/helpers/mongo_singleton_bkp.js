const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

//exporting an IIFE that can be destructured to 2 functions
module.exports = (
    function (){
    let connectionInstance;
    let db;

    function getInstance(){
        return new Promise(function (resolve, reject){
            if (connectionInstance){
                return resolve(connectionInstance);
            }

            const options = {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true
            };

            MongoClient.connect(config.mongoConfig.url, options, function (err, client){
                if (err){
                    return reject(err);
                }
                connectionInstance = client;
                db = client.db(config.mongoConfig.dbName);

                return resolve(connectionInstance);
            });
        });
    }

    function getDB(){
        if(!db){
            throw new Error('db object is not initialized!');
        }
        return db;
    }
    
    return {
        getInstance,
        getDB
    };
})();