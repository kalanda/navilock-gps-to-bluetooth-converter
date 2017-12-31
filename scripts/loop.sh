#!/bin/sh

while true; do
    node setup.js
    echo '...'
    sleep 3
    echo '...'
    node test.js
    read -n1 -r -p $'Press any key to continue or Ctrl+C to exit...\n'
done
