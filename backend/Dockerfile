FROM node:latest

COPY package.json ./

RUN npm install

COPY . /app

WORKDIR /app

EXPOSE 5000

CMD ["npm","start"]