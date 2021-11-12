FROM node:16-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN npm ci
RUN ["chmod", "+x", "/app/.docker/start.dev.sh"]
EXPOSE 8080
ENTRYPOINT ["/app/.docker/start.dev.sh"]