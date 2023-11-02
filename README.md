# **data-managment-interview**
### Description
 - Public repository with the data management team's technichal interview assignment inside  
 ---
## Prerequisites
- Docker
- Node.js

## Installation
1. Clone the repository.
2. Run `npm install` to install the project dependencies.

## Usage
1. Start the required services (MongoDB and RabbitMQ) using Docker Compose:

``` docker-compose up -d mongo rabbitmq ```


2. To get CLI help, run:
```npm start -- --help```

3. To start the consumer, run:
```npm start -- --consumer```

4. To start the producer, run:
```npm start -- --producer --city=Itamar```

5. To run both the consumer and producer together, run:
```npm start -- --consumer --producer --city=Itamar```

Make sure to replace `Itamar` with the desired city name.


`To run project in one command`
Make sure to give the file executable permissions using the command chmod +x run.sh.
To execute the script, simply run `./run.sh` in your terminal. This will start the required services, install the project dependencies, and run the consumer and producer functionalities.
Please note that you may need to modify the script according to your specific project setup and requirements.


 ## Assignment specification:
Your assignment is to insert data about street names in israel to a database, using some kind of a queueing platform.\
The assignment is to be done in nodejs + Typescript (node version 16.X, npm version 8.X, typescript version 4.X).\
Inside of the repository you will find a StreetsService class which provides you the data from the api.\
The list of cities is provided inside of the cities.ts file.\
Feel free to make changes to the StreetsService class if you feel they are necessary.
 - If you want to take a look at the raw data - https://data.gov.il/dataset/israel-streets-synom/resource/1b14e41c-85b3-4c21-bdce-9fe48185ffca

To complete the assignment you will need to select a database, sql or no-sql (for example: mongo, singlestore) and a queueing service (for example - rabbitmq, kafka), either from the provided dependencies, or one of your choice (commit it to your solution if you chose a different one).\
You will need to create two services:
 - Publishing service - A service that will get the data from the StreetsService and publish it to the queuing platform
 - A service that will consume the data from the queuing service and persisit it to the database

 Publishing service specification:
  - Will be activated by CLI, accepting a city name from the list of cities
  - Will query the StreetsService for all streets of that city
  - Will publish to the queuing platform the streets it needs to insert

Consuming service specification:
  - Will consume from the messaging queue
  - Will persist the streets data to the selected database

The persisted streets need to contain all data from the api