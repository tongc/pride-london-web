#!/bin/sh

set -e

echo "deploying $1"
export name=pride-in-london-$1

if test $1 = 'production'; then
  export alias=events.prideinlondon.org
else
  export alias=$name
fi

echo "writing now.json file"
echo "{\"name\": \"$name\", \"alias\": \"$alias\"}" > now.json
cat now.json

echo "running now"
now ./public -A ../now.json -e NODE_ENV=production --token $NOW_TOKEN --team=prideinlondon

echo "running now alias"
now alias --token $NOW_TOKEN --team=prideinlondon
