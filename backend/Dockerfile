# Dockerfile

# Use the official Node.js image as the base image
FROM node:20 as builder

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig*.json ./

COPY ./prisma/schema.prisma /usr/src/app/prisma/schema.prisma
COPY .env /usr/src/app/.env

# Install app dependencies
RUN npm install

RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "run", "start:prod"]

# Define the command to run the app
ENTRYPOINT ["npx", "prisma", "migrate", "deploy"]
