rmdir target /s /q
docker build -t debian-cert .
docker run --name debian-cert --rm -i -t -d debian-cert bash
docker cp debian-cert:/tmp/ ./target
docker stop debian-cert
docker rm debian-cert
