FROM node:10.15.0-jessie-slim

WORKDIR /application

COPY . /application

RUN yarn install

EXPOSE 80

RUN ["yarn", "build:app:production"]
CMD ["yarn", "run:server:production"]
