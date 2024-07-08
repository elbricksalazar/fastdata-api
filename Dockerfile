FROM node:18.17.0

# Create app directory
WORKDIR /usr/src/app

# 
ARG NPM_TOKEN=$NPM_TOKEN
ARG DEPLOY_ENVIRONMENT=$DEPLOY_ENVIRONMENT
ENV ENV_DEPLOY_ENVIRONMENT=$DEPLOY_ENVIRONMENT

# 
RUN echo "TOKEN NPM:"
RUN echo "*****************"
RUN echo "$NPM_TOKEN"
RUN echo "*****************"
RUN echo "DEPLOY_ENVIRONMENT:"
RUN echo "*****************"
RUN echo "$DEPLOY_ENVIRONMENT"
RUN echo "*****************"

# 
RUN npm config set elbricksalazar:registry=https://npm.pkg.github.com/
RUN npm config set //npm.pkg.github.com/:_authToken=$NPM_TOKEN
RUN npm config list
COPY package*.json ./
RUN npm install

# 
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run start:${ENV_DEPLOY_ENVIRONMENT}"]


