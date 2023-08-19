FROM nginx:alpine

COPY /dist/as201-ms-procedure-fe /usr/share/nginx/html

EXPOSE 80