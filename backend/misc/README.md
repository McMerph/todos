# Using docker'ed PostgreSQL with local Payara Server
[Download the JDBC driver](https://jdbc.postgresql.org/download.html) and then add it to Payara Server by running:

    asadmin start-domain
    asadmin add-library /path/to/download/jdbcdriver.jar

Go to [Payara server console](http://localhost:4848)

    Resources -> JDBC -> JDBC Connection Pools -> New
        "PoolName": {poolName}
        "Resource Type": "javax.sql.DataSource"
        "Database Driver Vendor": "Postgresql"
        
        Additional Properties:
            "ServerName: "localhost"
            "User": "postgres"
            "DatabaseName": "postgres"
            "PortNumber": "5432"
            "Password": "mysecretpassword"

    Resources -> JDBC -> JDBC Resources -> New:
        "JNDI Name": "jdbc/todos"
        "Pool Name": "{poolName}"
        
    Configurations -> server-config -> Network Listeners -> http-listener-1
        "Port": "48702"
        
     Configurations-> server-config -> JVM Settings -> JVM Options -> Add JVM Option
     "-Duser.timezone=Etc/GMT-10"
     
Restart Payara server

##To start docker container

    postgres-docker-start

##To stop docker container

    postgres-docker-stop
