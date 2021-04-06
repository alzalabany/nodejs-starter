FROM node:latest as base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
# RUN yarn global add nodemon

CMD ["yarn", "start"]