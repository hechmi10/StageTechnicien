package tn.esprit.syshr.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.StreamWriteConstraints;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.DeserializationFeature;

import java.io.IOException;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.getFactory().setStreamWriteConstraints(
                StreamWriteConstraints.builder()
                        .maxNestingDepth(Integer.MAX_VALUE) // Increase to 2000 or appropriate value
                        .build()
        );
        SimpleModule module = new SimpleModule();
        module.addDeserializer(SimpleGrantedAuthority.class, new SimpleGrantedAuthorityDeserializer());
        mapper.registerModule(module);
        // Ignore unknown properties to avoid issues with extra fields
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }

    // Custom deserializer for SimpleGrantedAuthority
    private static class SimpleGrantedAuthorityDeserializer extends JsonDeserializer<SimpleGrantedAuthority> {
        @Override
        public SimpleGrantedAuthority deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
            String authority = p.getText();
            return new SimpleGrantedAuthority(authority);
        }
    }
}