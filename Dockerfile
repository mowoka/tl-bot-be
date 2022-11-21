# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app


# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY yarn.lock ./
COPY package*.json ./
# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# run for generate prisam
RUN yarn prisma generate
# Creates a "dist" folder with the production build
RUN yarn run build
# expose port
EXPOSE 3001
# Start the server using the production build
CMD [ "node", "dist/main" ]