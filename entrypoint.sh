#!/bin/sh

find /usr/share/nginx/html/assets -type f -name "*.js" -print0 | xargs -0 sed -i \
	-e "s|VITE_API_URL_PLACEHOLDER|${VITE_API_URL}|g"

exec /docker-entrypoint.sh "$@"
