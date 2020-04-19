FROM nginx:1-alpine

LABEL app_name="autowp-frontend"
LABEL maintainer="dmitry@pereslegin.ru"

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/ || exit 1

COPY ./etc/ /etc/

COPY ./robots /usr/share/nginx/html/robots

COPY ./dist/ /usr/share/nginx/html/
