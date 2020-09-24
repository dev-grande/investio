rm -r -f ../../docker/dev/certs
mkdir ../../docker/dev/certs
cd ../../docker/dev/certs
sudo cp /etc/letsencrypt/live/dev-divgraphs.diana-grande.com/fullchain.pem .
sudo cp /etc/letsencrypt/live/dev-divgraphs.diana-grande.com/privkey.pem .
# mkcert -install
# mkcert localhost
