FROM mhart/alpine-node:12 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ARG BACKEND_HOST
ENV REACT_APP_BACKEND_HOST=$BACKEND_HOST
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
