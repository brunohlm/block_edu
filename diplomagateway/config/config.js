const fs = require('fs');
const Logger = require('./logger');
const FabricContractProvider = require('../api/helpers/fabricContractProvider');

module.exports = async function (appRoot) {


    const versionFile = `${appRoot}/version`;
    const version = fs.readFileSync(versionFile, 'utf8', data => data);

    //remove default implement error
    global.hostname = process.env.HOSTNAME || "localhost"
    global.userCredentialsPath = process.env.USER_CREDENTIALS_PATH || "/Users/bruno/Developer/HYPER/DIPLOMA/diploma-stack-master/crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp";
    global.connectionProfilePath = process.env.CONNECTION_PROFILE_PATH || "/connection.json";
    global.MSP = process.env.MSP;
    global.walletPath = process.env.WALLET_PATH || "./wallet";
    global.identity = process.env.IDENTITY;
    global.channel = process.env.CHANNEL || "diploma";
    global.chaincode = process.env.CHAINCODE || "diplomacc";
    global.discoveryEnabled = process.env.DISCOVERY_ENABLED == "true" || false;
    global.discoveryAsLocalhost = process.env.DISCOVERY_AS_LOCALHOST  == "true" || false;
    global.serviceName = process.env.SERVICE_NAME || "dlt-gateway";
    global.port = process.env.PORT || 8080;
    global.logLevel = process.env.LOG_LEVEL || "DEBUG"
    
    // swagger-express need this
    global.config = {
        appRoot,
        version
    };

    Logger.config(global.logLevel, global.serviceName);

    global.logger = Logger;

    await require('../api/helpers/walletProvider').createWallet();

    if (!process.env.MOCK_MODE) {
        console.log('initializing Fabric');
        global.contract = await FabricContractProvider.build();
    }

    logger.info(`${ global.serviceName } config complete.`);

    return {
        appRoot
    }

}
