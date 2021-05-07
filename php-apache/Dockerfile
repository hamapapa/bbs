# Laravel8
# システム要件
#   PHP7.3以上 / BCMath / Ctype / Fileinfo / JSON / Mbstring / OpenSSL / PDO / Tokenizer / XML

FROM php:8-apache

# Volumeでマウントした場合に所有者が1000:1000になるため、apacheの実行ユーザ(www-data)も1000にしておく
RUN usermod -u 1000 www-data \
    && groupmod -g 1000 www-data

# OS = debian
# add custom php.ini
RUN cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini
COPY ./myphp.ini /usr/local/etc/php/conf.d/

RUN apt-get update \
    && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libwebp-dev libxpm-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-xpm \
    && docker-php-ext-install -j$(nproc) gd

RUN apt-get install -y libonig-dev \
    && docker-php-ext-install pdo_mysql mysqli bcmath

RUN apt-get install -y default-mysql-client vim git zip unzip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# change DocumentRoot
RUN sed -i -e 's/var\/www/var\/www\/html\/public/g' /etc/apache2/conf-available/docker-php.conf
RUN sed -i -e 's/var\/www\/html/var\/www\/html\/public/g' /etc/apache2/sites-available/000-default.conf

# enable mod_rewrite 
RUN a2enmod rewrite