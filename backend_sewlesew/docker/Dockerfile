# 1. Use the official Node.js image as the base image
FROM node:18

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# 4. Install the dependencies
RUN npm install

# 5. Copy the rest of the application code to the working directory
COPY . .

# 6. Expose the port that the app will run on
EXPOSE 5000

# 7. Specify the command to run the app
CMD ["npm", "start-server"]

# # syntax=docker/dockerfile:1

# FROM python:3

# ARG VERSION=v0.0.0.0.0.0
# ARG DJANGO_SETTINGS_MODULE=cubeseed.settings
# ENV VERSION=${VERSION}
# # ENV DJANGO_SETTINGS_MODULE=${DJANGO_SETTINGS_MODULE}

# LABEL org.opencontainers.image.source=https://github.com/Cubeseed/Backend
# LABEL org.opencontainers.image.description="Cubeseed API"
# LABEL org.opencontainers.image.licenses=FIXME
# LABEL org.opencontainers.image.version=${VERSION}

# WORKDIR /app
# COPY . /app
# RUN chmod 755 docker/runner.sh
# RUN pip install --upgrade pip
# RUN pip install -r requirements.txt

# ENTRYPOINT ["docker/runner.sh"]

# EXPOSE 8000