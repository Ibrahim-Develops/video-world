FROM node:20.17.0
WORKDIR /App
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]