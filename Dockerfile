FROM nginx

LABEL app_name="autowp-frontend"

COPY ./dist /usr/share/nginx/html/ng
