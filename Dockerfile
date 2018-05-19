FROM node:alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --only=production

EXPOSE 3004

CMD [ "npm", "run", "docker" ]