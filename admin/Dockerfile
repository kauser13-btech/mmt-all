######## BASE ########
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

######## DEV ########
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

######## BUILD ########
FROM base AS build
RUN npm install --include=dev
COPY . .
RUN npm run build

######## PROD ########
FROM node:20-alpine AS prod
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy build artifacts from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
