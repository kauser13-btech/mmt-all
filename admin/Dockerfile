######## DEV stage ########
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm","run","dev"]

######## PROD stage ########
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm","start"]