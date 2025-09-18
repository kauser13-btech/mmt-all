######## BASE ########
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

######## DEV ########
FROM base AS dev
RUN npm install
COPY . .
# Bind to 0.0.0.0 and port 3001 for Docker dev access
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3001"]

######## BUILD ########
FROM base AS build
RUN npm install --include=dev
COPY . .
RUN npm run build

######## PROD ########
FROM node:20-alpine AS prod
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy build artifacts from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose port 3001 for production
EXPOSE 3001
CMD ["npm", "start"]
