FROM node:20 AS build
WORKDIR /app

ENV HUSKY=0

ARG VERSION=1.0.0
ENV VITE_VERSION=${VERSION}

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runner

COPY --from=build /app/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]