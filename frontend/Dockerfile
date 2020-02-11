FROM node:10-slim

WORKDIR /usr/src

#RUN apt-get update; apt-get install git nano -y

COPY . /usr/src/app
WORKDIR /usr/src/app
#COPY ./.gitfake .git

RUN npm install -g cross-env

#RUN npm run setup
RUN npm install

#RUN npm run build:docker
#RUN npm run build

#START
#CMD npm run start:docker
CMD npm start
