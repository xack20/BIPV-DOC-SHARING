export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051


peer lifecycle chaincode package basic-channel1.tar.gz --path ../chaincode-javascript/ --lang node --label basic-channel1_1.0

peer lifecycle chaincode install basic-channel1.tar.gz

str=$(peer lifecycle chaincode queryinstalled)
pkg_id=$(echo $(echo $str| cut -d' ' -f 7)| cut -d ',' -f 1)
export CC_PACKAGE_ID=$pkg_id

# use the --package-id flag to provide the package identifier
# use the --init-required flag to request the ``Init`` function be invoked to initialize the chaincode
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --channelID channel1 --name basic-channel1 --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1


# use the --name flag to select the chaincode whose definition you want to query
peer lifecycle chaincode querycommitted --channelID channel1 --name basic-channel1 --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"


# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C channel1 -n basic --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:11051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'


# peer chaincode query -C channel1 -n basic -c '{"Args":["GetAllAssets"]}'

