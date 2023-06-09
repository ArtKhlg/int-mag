FROM node:18 as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install
# RUN npm update

COPY client /app/client

RUN npm run build

FROM node:18

WORKDIR /app

COPY server/package.json /app

RUN npm install
# RUN npm update

COPY server /app

COPY --from=client /app/client/build /app/client

RUN npm rebuild

EXPOSE 8080

CMD ["npm", "start"]
