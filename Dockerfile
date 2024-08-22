# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/
# Update npm and clear npm cache
RUN npm install -g npm

RUN npm install --legacy-peer-deps

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/prmsc-* /usr/share/nginx/html

# Set file permissions to allow read access
RUN chmod -R 755 /usr/share/nginx/html/
#comment testing

# Expose port 80
EXPOSE 80