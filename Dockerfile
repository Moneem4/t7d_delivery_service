# Dockerfile for React client

# Build react client
FROM node:14-alpine

# Working directory be app
RUN touch SUCCESS
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent
COPY . .
# copy local files to app folder
RUN chmod +x /usr/src/app/node_modules/.bin/nodemon
EXPOSE 3006
CMD ["npm","run","dev"]

