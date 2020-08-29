FROM node:14.9.0-slim as build

WORKDIR /app
COPY . /app

RUN npm i && npm run build

FROM nginx:lastest
COPY --from=build /app/build /usr/share/nginx/html