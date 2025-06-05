package tn.esprit.syshr.auth;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.syshr.entities.Admin;
import tn.esprit.syshr.entities.Role;
import tn.esprit.syshr.config.JwtService;
import tn.esprit.syshr.entities.Employee;
import tn.esprit.syshr.repositories.AdminRepository;
import tn.esprit.syshr.repositories.EmployeeRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    private final EmployeeRepository repository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        logger.info("Registering user: {}", request.getEmail());
        try {
            if (repository.findByEmail(request.getEmail()).isPresent()) {
                logger.warn("Email already exists: {}", request.getEmail());
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
            }

            // Create the appropriate user type based on role
            var user = Role.ADMIN.equals(request.getRole())
                    ? Admin.builder()
                    .name(request.getName())
                    .surname(request.getSurname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .build()
                    : Employee.builder()
                    .name(request.getName())
                    .surname(request.getSurname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .build();

            var savedUser = repository.save(user);
            logger.info("User saved:  Email={}, Password Hash={}",
                    savedUser.getEmail(),
                     savedUser.getPassword());

            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Registration failed for email: {}", request.getEmail(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to register user: " + e.getMessage(), e);
        }
    }



    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        logger.info("Authenticating user: {}", request.getEmail());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            logger.info("AuthenticationManager succeeded for email: {}", request.getEmail());
            var user = repository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found: " + request.getEmail()));
            logger.info("User retrieved: Email={}, Password Hash={}",
                     user.getUsername(), user.getPassword());
            var jwtToken = jwtService.generateToken(user);
            logger.info("JWT generated for email: {}", request.getEmail());
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (AuthenticationException e) {
            logger.warn("Authentication failed due to credentials for email: {}", request.getEmail(), e);
            throw new BadCredentialsException("Invalid email or password");
        } catch (Exception e) {
            logger.error("Authentication failed unexpectedly for email: {}", request.getEmail(), e);
            throw new RuntimeException("Failed to authenticate user: " + e.getMessage(), e);
        }
    }
}