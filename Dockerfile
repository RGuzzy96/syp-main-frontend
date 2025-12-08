FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NEXT_PUBLIC_BACKEND_HOST

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_ENVIRONMENT=$NEXT_PUBLIC_ENVIRONMENT
ENV NEXT_PUBLIC_BACKEND_HOST=$NEXT_PUBLIC_BACKEND_HOST

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
