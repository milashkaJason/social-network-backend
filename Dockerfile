FROM node:16.13.1

RUN npm install -g npm@8.4.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
