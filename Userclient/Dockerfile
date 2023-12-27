FROM node:13-alpine

WORKDIR /app

COPY package.json .
RUN rm -rf node_modules/ package-lock.json
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
# Run the application
# CMD ["sh","-c", "npm start"]
CMD ["npm", "start"]

