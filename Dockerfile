FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build
RUN npm run export 

FROM nginx:alpine

# copy build output
COPY --from=builder /app/out /usr/share/nginx/html

# custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port 3000 externally
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
