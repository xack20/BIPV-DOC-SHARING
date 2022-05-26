./network-mod.sh down



docker kill $(docker ps -aq)
docker rm $(docker ps -aq)

docker network rm fabric_test


./network-mod.sh up -ca
./network-mod.sh createChannel -c channel1 -org 2 -app SingleTwoOrgsApplicationGenesis
./network-mod.sh deployCC -ccn basic-channel1 -ccp ../chaincode-javascript -ccl javascript -c channel1 -org 2


cd addOrg3
./addOrg3.sh up -ca -c channel1
cd ..