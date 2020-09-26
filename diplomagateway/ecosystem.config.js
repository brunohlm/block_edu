module.exports = {

  apps : [

    {
       watch : true,
       name : 'DIPLOMA-Gateway',
       script : 'app.js',
       node_args: ["--inspect"],
       env: {
         HOSTNAME: localhost,
         NODE_ENV: 'development',
         PORT: 8080,
         LOG_LEVEL: 'DEBUG',
         SERVICE_NAME: 'diploma-dlt-gateway',
         USER_CREDENTIALS_PATH: "/Users/bruno/Developer/HYPER/DIPLOMA/diploma-stack-master/crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp",
         CONNECTION_PROFILE_PATH: "../connection.json",
         WALLET_PATH: "./wallet",
         IDENTITY: 'User1@org1.example.com',
         CHANNEL: 'diploma',
         CHAINCODE: 'diplomacc',
         MSP:'Org1MSP'
       },
       env_production : {
         NODE_ENV: 'development'
       }
    }
  ]
};
