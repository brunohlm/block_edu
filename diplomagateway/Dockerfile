FROM keymetrics/pm2:8-alpine

ENV DIR="/dlt-gateway"

WORKDIR $DIR

RUN apk add --update \
    python-dev \
    py-pip \
    build-base \
    make \
    && rm -rf /var/cache/apk/*

# install dependencies
COPY package.json $DIR/
RUN  npm install 

# copy sources
COPY . "$DIR"/

EXPOSE 8080

CMD ["pm2-runtime", "app.js"]
