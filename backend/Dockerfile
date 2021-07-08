FROM node:15.13-alpine
WORKDIR /backend
ENV PATH="./node_modules/.bin:$PATH"
COPY . /backend
RUN npm install
CMD ["npm", "start"]