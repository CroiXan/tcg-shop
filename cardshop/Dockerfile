#etapa 1
FROM node:alpine AS build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build-step /app/dist/cardshop/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf