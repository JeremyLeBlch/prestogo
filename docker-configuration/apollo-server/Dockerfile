FROM node:lts-alpine3.18

WORKDIR /app/apollo-server

COPY ./apollo-server/package.json ./

RUN npm install

COPY ./apollo-server ./

EXPOSE 4005

RUN npx prisma generate

CMD ["npm", "run", "watch", "--host", "0.0.0.0"]