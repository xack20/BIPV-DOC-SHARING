# BIPV-DOC-SHARING

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
