# FROM mhart/alpine-node:12
FROM node:12-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 4000
CMD ["node", "index.js"]
