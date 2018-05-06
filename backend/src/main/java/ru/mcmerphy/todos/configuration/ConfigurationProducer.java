package ru.mcmerphy.todos.configuration;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Read the <code>application.properties</code> file from the classpath and produce values that can be
 * injected with @{@link Configurable}.
 * <p>
 * It's a simple and lightweight alternative to the Apache DeltaSpike Configuration Mechanism.
 */
@ApplicationScoped
public class ConfigurationProducer {

    private Properties properties;

    @PostConstruct
    public void init() {
        properties = new Properties();
        InputStream stream = ConfigurationProducer.class.getResourceAsStream("/application.properties");
        if (stream == null) {
            throw new RuntimeException("Cannot find application.properties configuration file.");
        }
        try {
            this.properties.load(stream);
        } catch (IOException e) {
            throw new RuntimeException("Configuration file cannot be loaded.");
        }
    }

    @Produces
    @Configurable
    public String produceString(InjectionPoint injectionPoint) {
        return properties.getProperty(getKey(injectionPoint));
    }

    @Produces
    @Configurable
    public Integer produceInteger(InjectionPoint injectionPoint) {
        return Integer.valueOf(properties.getProperty(getKey(injectionPoint)));
    }

    @Produces
    @Configurable
    public Long produceLong(InjectionPoint injectionPoint) {
        return Long.valueOf(properties.getProperty(getKey(injectionPoint)));
    }

    @Produces
    @Configurable
    public Boolean produceBoolean(InjectionPoint injectionPoint) {
        return Boolean.valueOf(this.properties.getProperty(getKey(injectionPoint)));
    }

    private String getKey(InjectionPoint injectionPoint) {
        return injectionPoint.getAnnotated().getAnnotation(Configurable.class).value();
    }

}
