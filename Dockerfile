FROM httpd

RUN apt-get update -y
RUN apt-get upgrade -y

COPY . /usr/local/apache2/htdocs/