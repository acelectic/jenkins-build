FROM node:15.11.0-alpine3.10 as build
ARG APP_ENV
ARG VERSION
ENV VERSION=${VERSION}
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
