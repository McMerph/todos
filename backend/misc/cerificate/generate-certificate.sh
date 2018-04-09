#!/bin/bash

openssl \
    req -x509 \
    -nodes \
    -days 730 \
    -newkey rsa:4096 \
    -keyout cert.key \
    -out cert.crt \
    -config /tmp/req.cnf \
    -sha256

openssl \
    pkcs12 \
    -export \
    -in cert.crt \
    -inkey cert.key \
    -out cert.p12 \
    -name domain1_certificate \
    -password pass:D0tan3l0
