#!/bin/bash

openssl \
    req -x509 \
    -newkey rsa:4096 \
    -nodes \
    -days 365 \
    -subj "/C=RU/ST=Khabarovsk Krai/L=Khabarovsk/O=OrganizationName/OU=IT Department/CN=localhost" \
    -keyout cert.key \
    -out cert.crt

openssl \
    pkcs12 \
    -export \
    -in cert.crt \
    -inkey cert.key \
    -out cert.p12 \
    -name domain1_certificate \
    -password pass:D0tan3l0
