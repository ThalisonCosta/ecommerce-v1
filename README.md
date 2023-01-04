# ecommerce

## Overview
This is a simple node API made with Express that simulates an ecommerce flow.

## Running the project
To run this project in your local machine follow the steps below
### First Steps
  1. Clone this repository ```git clone https://github.com/ThalisonCosta/ecommerce.git```
  2. Then run ```yarn``` in terminal to install all dependecies
  
### Running the DB
The DB will be created in a docker container, so its necessary run:
  1. ```docker-compose up -d``` 
    
      No load will be shown because the flag ```-d``` but its recommended to wait for a bit until the container has been created and the MySQL be ready to connect

  2. If you want to stop the docker simple run ```docker-compose down```
  
Any trouble related to run Docker it can be searched in <a href="https://hub.docker.com" target="_blank">Docker Hub</a>
### Running the server 
  To start the server you will have two options to run in your terminal:
  1.  ```yarn dev```  if you want to receive logs from every request in the API
  2.  ```yarn server-start``` if you want to start and leave the server running uninterrupted
  3.  If you want to stop the server only run ```yarn server-stop```

The server will be accessible on the url ```http://localhost:8080/```
