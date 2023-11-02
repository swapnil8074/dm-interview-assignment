#!/bin/bash

# Start the required services
docker-compose up -d mongo rabbitmq

# Install project dependencies
npm install

# Run the consumer
npm start -- --consumer &

# Run the producer
npm start -- --producer --city=Itamar
