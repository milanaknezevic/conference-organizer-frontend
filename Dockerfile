FROM node:14-alpine
WORKDIR /opt/pisio_front
COPY package.json .
RUN npm install
COPY . .
VOLUME ["/opt/pisio_front/node_modules"]
ARG DEFAULT_PORT=3000
ENV PORT $DEFAULT_PORT
EXPOSE $PORT
CMD [ "npm", "start" ]