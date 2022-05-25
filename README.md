# BIPV-DOC-SHARING 



### Prerequisites (Tested with Linux-Ubuntu)
    1. java
    2. golang
    3. docker
    4. curl
    5. git
    6. node
    7. jq

``` #### other OS may required extra dependencies  ```



-------------------------------------------------------------------------------
## First Thing first

* Run these commands in a terminal ( Install npm dependencies )
 [run these commands once after any new clone of this repository]
    
    ```
        cd bipv-frontend/
        npm install

        cd ../bipv-network/chaincode-javascript/
        npm install

        npm install -g json-server
    ```

## Open a terminal fron VSCode for managing network

* change directory
  ``` 
      cd bipv-network/test-network 
  ```

* Network Up and install chaincode
  ``` 
      ./run-net.sh
  ```

## Open another terminal fron VSCode for Running the SpringBoot Application

* Change directory
``` 
    cd bipv-backend
```

* Install, build and run SpringBoot Application
```
    mvn clean install                                                   
    java -jar ./target/bipv-backend-0.0.1-SNAPSHOT.jar
```                  


## Open another terminal fron VSCode for managing ``` json-server ```

* Change directory
``` 
    cd bipv-frontend 
```

* Start Json-Server
``` 
    json-server --watch ./Data/Users.json --port 9096 
```  
  if any error occurs, please install ```json-server``` globally then run ``` json-server --watch ./Data/Users.json --port 9096 ``` again
  ```
      npm install -g json-server
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
