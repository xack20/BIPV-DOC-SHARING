# BIPV-DOC-SHARING

## Open a terminal fron VSCode for managing network

* change directory
  ``` 
      cd bipv-network/test-network 
  ```

* Down Network
  ``` 
      ./network.sh down
  ```
* Network Up and install chaincode
  ``` 
      ./network.sh up createChannel -ca
      ./network.sh deployCC -ccn basic -ccp ../chaincode-javascript -ccl javascript
  ```

## Run the java backend from the top menu bar 
   
   * Click the "Run" button from menu
   * Click "Run without debugging"


## Open another terminal fron VSCode for managing ``` json-server ```

* Change directory
``` 
    cd bipv-frontend 
```

* Start Json-Server
``` 
    json-server --watch ./Data/Users.json --port 9096 
```  



## Open another terminal fron VSCode for managing frontend

* change directory
  ``` 
      cd bipv-frontend 
  ```

* Start React frontend
  
  ``` 
    npm start 
  ```
