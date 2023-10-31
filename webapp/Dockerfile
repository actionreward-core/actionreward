FROM node:18-alpine3.17 as build

ARG VITE_WEB3_STORAGE_TOKEN
ENV VITE_WEB3_STORAGE_TOKEN=$VITE_WEB3_STORAGE_TOKEN

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx","-g","daemon off;"]