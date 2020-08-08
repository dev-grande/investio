# frontend

```sh
# install
yarn
# test
yarn test
# build frontend app
yarn build
# build image
docker build -t docker.pkg.github.com/invest-io/frontend/frontend:latest .
# run image
docker run --name=test -p 80:80 -td docker.pkg.github.com/invest-io/frontend/frontend:latest
```
