const {
    FileSystemWallet,
    Gateway, DefaultQueryHandlerStrategies
} = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function fabricConnectionProvider(connectionProfilePath, walletPath, identity, channel, chaincode) {
    try {
        const walletAbsPath = path.resolve(global.config.appRoot, walletPath);
        const wallet = new FileSystemWallet(walletAbsPath);
        const ccpPath = path.resolve(global.config.appRoot, connectionProfilePath);
        const ccpFile = fs.readFileSync(ccpPath);
        const ccp = JSON.parse(ccpFile.toString());


        let gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: identity,
            discovery: {
                enabled: global.discoveryEnabled,
                asLocalhost: global.discoveryAsLocalhost
            },
            queryHandlerOptions: {
                strategy: DefaultQueryHandlerStrategies.MSPID_SCOPE_ROUND_ROBIN
            }
        });

        let client = gateway.getClient();

        client.setConfigSetting('discover-cache-life', 30000000);

        let network = await gateway.getNetwork(channel);

        logger.info(gateway.getClient().getConfigSetting('discover-cache-life'));

        let contract = network.getContract(chaincode);
        return contract;
    } catch (error) {
        console.error(`Failed connect to Ledger: ${error}`);
        process.exit(1);
    }
}

async function build() {
    const connectionProfilePath = global.connectionProfilePath;
    const walletPath = global.walletPath;
    const identity = global.identity;
    const channel = global.channel;
    const chaincode = global.chaincode;
    return await fabricConnectionProvider(connectionProfilePath, walletPath, identity, channel, chaincode);
}

module.exports = {
    build
}
