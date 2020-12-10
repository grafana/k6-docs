# base image
FROM node:12-slim

EXPOSE 8000

RUN apt-get update && apt-get install python build-essential -y


RUN npm install -g gatsby-cli

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/