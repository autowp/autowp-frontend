FROM nginx

LABEL app_name="autowp-frontend"

HEALTHCHECK --interval=3m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

COPY ./etc/ /etc/

COPY ./dist /usr/share/nginx/html/ng
