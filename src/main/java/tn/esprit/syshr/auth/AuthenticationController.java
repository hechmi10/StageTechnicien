package tn.esprit.syshr.auth;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        logger.info("Register request for email: {}", request.getEmail());
        try {
            AuthenticationResponse response = service.register(request);
            logger.info("Registration successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Registration failed for email: {} - {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(400).body(
                    AuthenticationResponse.builder()
                            .error("Registration failed: " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        logger.info("Authentication request for email: {}", request.getEmail());
        try {
            AuthenticationResponse response = service.authenticate(request);
            if (response.getToken() == null || response.getRole() == null) {
                logger.warn("Authentication service returned incomplete response for email: {}", request.getEmail());
                return ResponseEntity.status(500).body(
                        AuthenticationResponse.builder()
                                .error("Internal server error: Missing token or role")
                                .build()
                );
            }
            logger.info("Authentication successful for email: {}, role: {}", request.getEmail(), response.getRole());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            logger.warn("Authentication failed for email: {} - Bad credentials", request.getEmail(), e);
            return ResponseEntity.status(401).body(
                    AuthenticationResponse.builder()
                            .error("Invalid email or password")
                            .build()
            );
        } catch (IllegalArgumentException e) {
            logger.error("Authentication failed for email: {} - Invalid input: {}", request.getEmail(), e.getMessage(), e);
            return ResponseEntity.status(400).body(
                    AuthenticationResponse.builder()
                            .error("Invalid input: " + e.getMessage())
                            .build()
            );
        } catch (Exception e) {
            logger.error("Authentication failed for email: {} - Unexpected error: {}", request.getEmail(), e.getMessage(), e);
            return ResponseEntity.status(500).body(
                    AuthenticationResponse.builder()
                            .error("Server error during authentication: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        logger.info("Test endpoint accessed");
        return ResponseEntity.ok("Test endpoint works!");
    }
}