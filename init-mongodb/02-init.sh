#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db social-network --collection users --file /tmp/data/data.json