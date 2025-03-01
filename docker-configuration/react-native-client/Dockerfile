FROM node:lts-alpine3.18

WORKDIR /app/react-native-client

COPY ./react-native-client/package.json ./

RUN npm install

COPY ./react-native-client ./

EXPOSE 8081

CMD ["npx", "expo", "start"]