#!/bin/bash
set -ex

cd /var/www/html/backend
/usr/local/bin/composer update -o --no-interaction || exit 1
php ./bin/doctrine.php -q dbal:run-sql "CREATE SCHEMA IF NOT EXISTS ${MYSQL_DATABASE}" || exit 1

setfacl -dR -m u:"dev":rwX -m u:"dev":rwX /var/www/html/backend
setfacl -R -m u:"dev":rwX -m u:"dev":rwX /var/www/html/backend

# Ejecutar servidor embebido de PHP
php -S 0.0.0.0:8001 -t public
