package ru.mcmerphy.todos.rest.server.security.configuration;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

//TODO Delete class
@Singleton
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement
public class TestConfig {

    /**
     * How long the token is valid for (in seconds).
     */
    @Inject
    @Configurable("authentication.jwt.validFor")
    private Long validFor;

    /**
     * How many times the token can be refreshed.
     */
    @Inject
    @Configurable("authentication.jwt.refreshLimit")
    private Integer refreshLimit;

    /**
     * Secret for signing and verifying the token signature.
     */
    @Inject
    @Configurable("authentication.jwt.secret")
    private String secret;

    /**
     * Allowed clock skew for verifying the token signature (in seconds).
     */
    @Inject
    @Configurable("authentication.jwt.clockSkew")
    private Long clockSkew;

    /**
     * Identifies the recipients that the JWT token is intended for.
     */
    @Inject
    @Configurable("authentication.jwt.audience")
    private String audience;

    /**
     * Identifies the JWT token issuer.
     */
    @Inject
    @Configurable("authentication.jwt.issuer")
    private String issuer;

    /**
     * JWT claim for the authorities.
     */
    @Inject
    @Configurable("authentication.jwt.claimNames.authorities")
    private String authoritiesClaimName = "authorities";

    /**
     * JWT claim for the token refreshment count.
     */
    @Inject
    @Configurable("authentication.jwt.claimNames.refreshCount")
    private String refreshCountClaimName = "refreshCount";

    /**
     * JWT claim for the maximum times that a token can be refreshed.
     */
    @Inject
    @Configurable("authentication.jwt.claimNames.refreshLimit")
    private String refreshLimitClaimName = "refreshLimit";

    public Long getValidFor() {
        return validFor;
    }

    public void setValidFor(Long validFor) {
        this.validFor = validFor;
    }

    public Integer getRefreshLimit() {
        return refreshLimit;
    }

    public void setRefreshLimit(Integer refreshLimit) {
        this.refreshLimit = refreshLimit;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public Long getClockSkew() {
        return clockSkew;
    }

    public void setClockSkew(Long clockSkew) {
        this.clockSkew = clockSkew;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getAuthoritiesClaimName() {
        return authoritiesClaimName;
    }

    public void setAuthoritiesClaimName(String authoritiesClaimName) {
        this.authoritiesClaimName = authoritiesClaimName;
    }

    public String getRefreshCountClaimName() {
        return refreshCountClaimName;
    }

    public void setRefreshCountClaimName(String refreshCountClaimName) {
        this.refreshCountClaimName = refreshCountClaimName;
    }

    public String getRefreshLimitClaimName() {
        return refreshLimitClaimName;
    }

    public void setRefreshLimitClaimName(String refreshLimitClaimName) {
        this.refreshLimitClaimName = refreshLimitClaimName;
    }

}
