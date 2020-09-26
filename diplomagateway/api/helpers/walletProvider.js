const path = require('path');
const fs = require("fs")
const {
    FileSystemWallet,
    X509WalletMixin
} = require('fabric-network');
const walletPath = path.resolve(global.config.appRoot, global.walletPath)

async function createWallet() {
    if (!fs.existsSync(walletPath)) {
        fs.mkdirSync(walletPath);
        const wallet = new FileSystemWallet(walletPath);

        const certFolder = path.join(global.userCredentialsPath, 'signcerts')
        const keyFolder = path.join(global.userCredentialsPath, 'keystore')
        const certFilename = fs.readdirSync(certFolder)[0];
        const keyFilename = fs.readdirSync(keyFolder)[0];

        let signCertPath = path.join(certFolder, certFilename)
        let keyPath = path.join(keyFolder, keyFilename)

        const cert = fs.readFileSync(signCertPath).toString();
        const key = fs.readFileSync(keyPath).toString();

        const identityLabel = 'User1@org1.example.com';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        //const identityLabel = global.identity = process.env.IDENTITY;
        //const identity = X509WalletMixin.createIdentity(global.MSP, cert, key);

        await wallet.import(identityLabel, identity);
    }
}

module.exports = {
    createWallet
}
