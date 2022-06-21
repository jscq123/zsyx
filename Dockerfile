FROM nginx:1.16.0

RUN rm -rf /etc/nginx/conf.d/default.conf
ADD dist /usr/share/nginx/zdx
ADD nuxt.conf /etc/nginx/conf.d/
