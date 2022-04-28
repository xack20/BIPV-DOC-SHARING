# BIPV-DOC-SHARING

## Open a terminal fron VSCode for managing network

change directory

``` cd bipv-network/test-network ```

* Down Network
  ``` 
      ./network.sh down
  ```
* Network Up and install chaincode
  
  ``` 
      ./network.sh up createChannel -ca
      ./network.sh deployCC -ccn basic -ccp ../chaincode-javascript -ccl javascript
  ```

