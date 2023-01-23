FROM alpine:18.13

RUN apk add --update nodejs npm

WORKDIR /www

RUN npm install express

COPY express.js express.js
COPY dist dist

CMD ["node", "express.js"]
