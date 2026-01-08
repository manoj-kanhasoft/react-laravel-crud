FROM node:14

WORKDIR /var/www/html/Practical-docker/frontend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]