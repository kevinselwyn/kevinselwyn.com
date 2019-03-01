#!/bin/bash

# alert
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# build
yarn run build

# leave
cd public

# add
git add .

# commit
git commit -m "AUTO-GENERATING: `date -u +%Y-%m-%dT%H:%M:%S%z`"

# push
git push -f origin master

# return
cd ..
