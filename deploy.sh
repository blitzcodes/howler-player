#!/usr/bin/env sh

readonly __gitPath=git@github.com:blitzcodes/howler-player.git

# abort on errors
set -e

git init
git add -A
git commit -m 'Refreshing Code Base'

git push -f ${__gitPath} master:master

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'Refreshing Site'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f ${__gitPath} master:gh-pages

cd -

