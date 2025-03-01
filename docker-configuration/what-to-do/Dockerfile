FROM node:lts-alpine3.18

WORKDIR /app/what-to-do

COPY ./what-to-do/package.json ./

RUN npm install

COPY ./what-to-do ./

EXPOSE 8081

CMD ["npx", "expo", "start"]