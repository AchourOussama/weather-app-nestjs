FROM node:22.10.0-alpine3.20

WORKDIR /app

COPY ./package*.json .

RUN npm ci 

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
