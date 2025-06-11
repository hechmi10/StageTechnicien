package tn.esprit.syshr.auth;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .build()
                    : Employee.builder()
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

            UserDetails user = repository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + request.getEmail()));
            logger.info("User retrieved: Email={}, Authorities={}", user.getUsername(), user.getAuthorities());

            var jwtToken = jwtService.generateToken(user);
            logger.info("JWT generated for email: {}, authorities: {}", request.getEmail(), user.getAuthorities());

            // Extract role from authorities (assuming one primary role)
            String role = user.getAuthorities().stream()
                    .findFirst()
                    .map(GrantedAuthority::getAuthority)
                    .map(auth -> auth.replace("ROLE_", "")) // Remove "ROLE_" prefix if present
                    .orElse("EMPLOYEE"); // Default to EMPLOYEE if no authority found

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .role(role)
                    .build();
        } catch (BadCredentialsException e) {
            logger.warn("Authentication failed due to bad credentials for email: {}", request.getEmail(), e);
            throw e; // Re-throw to be caught by the controller
        } catch (UsernameNotFoundException e) {
            logger.warn("Authentication failed due to user not found for email: {}", request.getEmail(), e);
            throw new BadCredentialsException("Invalid email or password", e); // Map to BadCredentialsException
        } catch (Exception e) {
            logger.error("Authentication failed unexpectedly for email: {}, error: {}", request.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Failed to authenticate user: " + e.getMessage(), e);
        }
    }

    public AuthenticationResponse refreshToken(String refreshToken) {
        logger.info("Attempting to refresh token: {}", refreshToken);
        String email = jwtService.extractUsername(refreshToken);
        if (email == null || !jwtService.isTokenValid(refreshToken, null)) {
            throw new BadCredentialsException("Invalid refresh token");
        }
        UserDetails employee = repository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found"));
        String newToken = jwtService.generateToken(employee);
        String newRefreshToken = jwtService.generateRefreshToken(employee);
        return AuthenticationResponse.builder()
                .token(newToken)
                .role(employee.getAuthorities().toString())
                .refreshToken(newRefreshToken)
                .build();
    }
}