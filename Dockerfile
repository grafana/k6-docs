# base image
FROM node:10-slim
RUN apt-get update && apt-get install python build-essential -y
WORKDIR /app

COPY . ./

EXPOSE 8000