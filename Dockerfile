FROM node:18.16.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .
