./network.sh down

docker kill $(docker ps -aq)
docker rm $(docker ps -aq)

./network.sh up -ca


./network.sh createChannel -c channel1
./network.sh deployCC -ccn basic-channel1 -ccp ../chaincode-javascript -ccl javascript -c channel1

./network.sh createChannel -c channel2
./network.sh deployCC -ccn basic-channel2 -ccp ../chaincode-javascript -ccl javascript -c channel2