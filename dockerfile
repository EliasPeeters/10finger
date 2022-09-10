FROM node:18

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i
COPY . .
RUN mkdir /root
COPY credentials.json /root/credentials.json
RUN npm run sass

CMD [ "npm", "start" ]