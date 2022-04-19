FROM node:17 AS build_stage

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install yarn

RUN yarn

RUN npm run build

FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /usr/share/nginx/html

RUN rm -Rf ./*

COPY --from=build-stage /app/dist .

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
