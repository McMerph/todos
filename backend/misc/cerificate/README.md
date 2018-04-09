#Securing Payara Server with Custom SSL Certificate

1. Change domain master password. Default password is "changeit"


    cd {PAYARA_DIR}\bin\
    asadmin change-master-password --savemasterpassword=true domain1
    
2. Generate key's and PKCS12 bundle via docker


    cd {THIS_DIR}
    generate-certificate-via-docker

3. Check integrity of PKCS12 bundle


    cd ./target
    keytool -list -keystore cert.p12

4. Copy PKCS12 bundle to {PAYARA_DIR}\glassfish\domains\domain1\config\

5. Import the PKCS12 bundle to the keystore


    cd {PAYARA_DIR}\glassfish\domains\domain1\config\
    keytool -importkeystore -destkeystore keystore.jks -srckeystore cert.p12 -srcstoretype PKCS12 -alias domain1_certificate

6. Add certificate to the list of trusted certificates


    keytool -importkeystore -destkeystore cacerts.jks -srckeystore cert.p12 -srcstoretype PKCS12 -alias domain1_certificate

7. Check alias of your certificate


    keytool -list -keystore cert.p12

8. Start domain


    cd {PAYARA_DIR}\bin\
    asadmin start-domain

9. Go to [Payara server console](http://localhost:4848)


    Configurations -> server-config -> HTTP Service -> HTTP Listeners -> http-listener-2 -> SSL
        "Certificate NickName": "domain1_certificate"


*. To replace, first delete then go to step 2


    cd {PAYARA_DIR}\glassfish\domains\domain1\config\
    keytool -delete -alias domain1_certificate -keystore keystore.jks
    keytool -delete -alias domain1_certificate -keystore cacerts.jks
