#!/bin/sh

# Replace placeholder variables in JavaScript files with environment variables
echo "Updating runtime environment variables..."
# for file in /usr/share/nginx/html/assets/*.js; do
#   sed -i "s|VITE_API_URL_PLACEHOLDER|${API_URL}|g" "$file"
# done

echo "Starting Nginx..."
exec "$@"