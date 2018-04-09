FROM debian

COPY ./generate-certificate.sh /usr/local/bin/generate-certificate.sh

RUN apt-get update && \
    apt-get install -y openssl dos2unix && \
    dos2unix /usr/local/bin/generate-certificate.sh && \
    cd /tmp && \
    /usr/local/bin/generate-certificate.sh
