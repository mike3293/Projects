# abort on errors
set -e

# build
npm run build

# deploy to https://vue-surveys.web.app/
firebase deploy
