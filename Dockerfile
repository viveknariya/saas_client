# Use official Node.js image as base
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build

# Run
FROM nginx:latest

# Copy
COPY --from=build /app/dist/sfms/browser /usr/share/nginx/html