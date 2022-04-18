FROM node:17 AS build_stage

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install yarn

RUN yarn

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -Rf ./*

COPY --from=build_stage /app/dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
