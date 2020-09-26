#!/bin/bash
CHANNEL_NAME=diploma
CHAINCODE_NAME=diplomacc
CHAINCODE_VERSION=$1

if [[ $# -eq 0 ]] ; then
    echo "1 argument required (version), $# provided"
    exit 1
fi

# Exit on first error, print all commands.
set -ev

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode install -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -p github.com/chaincode

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" cli peer chaincode upgrade -o orderer.example.com:7050 -C ${CHANNEL_NAME} -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -c '{"Args":["init"]}' --collections-config /opt/gopath/src/github.com/chaincode/collections_config.json

