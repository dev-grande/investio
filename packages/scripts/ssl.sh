rm -r -f ../../docker/dev/certs
mkdir ../../docker/dev/certs
cd ../../docker/dev/certs
mkcert -install
mkcert localhost