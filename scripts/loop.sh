while true; do
    node setup.js && node test.js
    read -n1 -r -p $'Press any key to continue or Ctrl+C to exit...\n'
done