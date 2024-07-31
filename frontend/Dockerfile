# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY angular.json ./

# Install the Angular CLI 
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the Angular app with production configuration
RUN ng build --configuration=production

# Build the Angular application
RUN npm run build --prod

# Stage 2: Create a new image with a smaller base image (NGINX)
FROM nginx:1.25.3-alpine-slim

# Copy the NGINX configuration file to the appropriate location
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to Nginx's HTML directory
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

# Specify the command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
