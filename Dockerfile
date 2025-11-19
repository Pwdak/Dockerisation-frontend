FROM nginx:alpine

# Nettoie le répertoire par défaut de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie les sources du frontend
COPY src/ /usr/share/nginx/html/

# Copie une config custom si elle existe
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]