# Use an official Node runtime as a parent image
FROM node:12.6.0

# Set the working directory
WORKDIR /usr/src/app

# Copy our application code to the working directory
COPY . .

# Install Dependencies
RUN yarn

# Expose port for external use
EXPOSE 4000

# Run Server
CMD ["yarn", "watch"]