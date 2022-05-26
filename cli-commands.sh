# docker start $(docker ps -aq)                                       # for network

# export $(./setOrgEnv.sh org2)
# docker exec -it cli bash
# docker exec -it ca_org1 sh

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C channel1 -n basic-channel1 "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'

