FROM node:13-alpine

WORKDIR /app

COPY package.json .
RUN rm -rf node_modules/ package-lock.json

RUN npm install nodemon
RUN npm install
COPY . .
EXPOSE 5000

CMD ["npm", "start"]