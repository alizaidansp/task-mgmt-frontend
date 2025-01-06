# Stage 1: Build the Svelte app
FROM node:16-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Svelte app for production
RUN npm run build

# Stage 2: Serve the built app using a lightweight server
FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# Copy the build output from the build stage to the NGINX web server's root directory

# app/public is the output directory of the Svelte app after running npm run build

COPY --from=build /app/public /usr/share/nginx/html

# Expose port 80 (default for HTTP)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
