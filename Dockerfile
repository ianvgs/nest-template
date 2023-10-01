# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Create and set the working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application's source code to the working directory
COPY . .

# Expose a port that your Express.js application will listen on
EXPOSE 3000

