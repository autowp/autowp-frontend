FROM nginx

LABEL app_name="autowp-frontend"

COPY ./etc/ /etc/

COPY ./dist /usr/share/nginx/html/ng
