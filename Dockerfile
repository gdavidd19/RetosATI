FROM ubuntu:latest

# ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && apt-get upgrade -y && \
    apt-get install -y apache2 \
    python3 \
    python3-dev \
    python3-pip \
    python3-venv \
    libapache2-mod-wsgi-py3 \
    git

RUN a2enmod wsgi

RUN echo "WSGIScriptAlias /ATI /var/www/html/ATI/index.py" > /etc/apache2/conf-available/mod-wsgi.conf && \
    a2enconf mod-wsgi

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip3 install beaker --break-system-packages

RUN rm -rf /var/www/html/*
COPY . /var/www/html/ATI/

RUN chmod +x /var/www/html/ATI/index.py && \
    chown -R www-data:www-data /var/www/html/ATI

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]