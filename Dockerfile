FROM node:latest as base

ENV NODE_ENV=development
ENV PORT=3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json *yarn* ./
RUN yarn
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . ./
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
WORKDIR /usr/src/app

CMD ["yarn", "nodemon", "bin/www"]