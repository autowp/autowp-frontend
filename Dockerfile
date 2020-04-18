FROM nginx

LABEL app_name="autowp-frontend"
LABEL maintainer="dmitry@pereslegin.ru"

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/ || exit 1

COPY ./etc/ /etc/

COPY ./dist/fr/fr-MG /usr/share/nginx/html/fr
COPY ./dist/mg/mg /usr/share/nginx/html/mg
COPY ./dist/en/en-GB /usr/share/nginx/html/en

COPY ./robots /usr/share/nginx/html/robots
