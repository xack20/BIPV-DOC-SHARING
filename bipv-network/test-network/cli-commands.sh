
./network.sh up createChannel -c channel1 -ca

cd addOrg3
./addOrg3.sh up -ca -c channel1
cd ..

./network.sh deployCC -c channel1 -ccn basic-channel1 -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
./new-org-cc.sh


./network.sh createChannel -c channel2
./network.sh deployCC -c channel2 -ccn basic-channel2 -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript

./network.sh createChannel -c channel3
./network.sh deployCC -c channel3 -ccn basic-channel3 -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript




# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C channel1 -n basic-channel1 --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'

# peer chaincode query -C channel1 -n basic-channel1 -c '{"Args":["GetAllAssets"]}'