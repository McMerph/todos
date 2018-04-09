FROM debian

COPY ./generate-certificate.sh /usr/local/bin/generate-certificate.sh
COPY ./req.cnf /tmp/req.cnf

RUN apt-get update && \
    apt-get install -y openssl dos2unix && \
    dos2unix /usr/local/bin/generate-certificate.sh && \
    dos2unix /tmp/req.cnf && \
    cd /tmp && \
    /usr/local/bin/generate-certificate.sh
