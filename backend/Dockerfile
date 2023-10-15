FROM node:16

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]