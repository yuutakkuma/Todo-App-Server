FROM node:13.12.0-slim
WORKDIR /usr/app
COPY yarn.lock package.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 4000
CMD node dist/src/main.js