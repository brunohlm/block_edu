#!/bin/bash
CHANNEL_NAME=diploma
CHAINCODE_NAME=diplomacc
CHAINCODE_VERSION=1.01
# Exit on first error, print all commands.
set -ev

export MSYS_NO_PATHCONV=1

docker-compose -f docker-compose.yml down --remove-orphans

docker-compose -f docker-compose.yml up -d orderer.example.com peer0.org1.example.com cli
#docker-compose -f docker-compose.yml up -d ca.example.com orderer.example.com peer0.org1.example.com cli
docker ps -a

# wait for Hyperledger Fabric to start
export FABRIC_START_TIMEOUT=10
sleep ${FABRIC_START_TIMEOUT}

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel create -o orderer.example.com:7050 -c diploma -f /etc/hyperledger/configtx/channel.tx

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b diploma.block

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode install -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -p github.com/chaincode

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode instantiate -o orderer.example.com:7050 -C ${CHANNEL_NAME} -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -c '{"Args":["init"]}' --collections-config /opt/gopath/src/github.com/chaincode/collections_config.json
#docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode upgrade -o orderer.example.com:7050 -C ${CHANNEL_NAME} -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -c '{"Args":["init"]}' --collections-config /opt/gopath/src/github.com/chaincode/collections_config.json

#docker-compose -f docker-compose.yml up -d --build diploma-gateway
docker-compose -f docker-compose.yml up -d diploma-gateway
