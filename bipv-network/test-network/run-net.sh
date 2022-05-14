./network.sh down



docker kill $(docker ps -aq)
docker rm $(docker ps -aq)

docker network rm fabric_test

# sudo su
# mkdir -p $HOME/go/src/github.com/<your_github_userid>
# cd $HOME/go/src/github.com/<your_github_userid>

# curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh

# ./install-fabric.sh d b -f 2.4.2 -c 1.5.2

./network.sh up -ca


./network.sh createChannel -c channel1
./network.sh deployCC -ccn basic-channel1 -ccp ../chaincode-javascript -ccl javascript -c channel1

./network.sh createChannel -c channel2
./network.sh deployCC -ccn basic-channel2 -ccp ../chaincode-javascript -ccl javascript -c channel2