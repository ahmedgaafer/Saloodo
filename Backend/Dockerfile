FROM node:20.9-alpine3.17 as build
WORKDIR /app
COPY package.json /app
RUN npm install


COPY . /app
EXPOSE 3000
CMD ["npm", "start"]