FROM node:17-alpine

WORKDIR /core

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm install esbuild
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
