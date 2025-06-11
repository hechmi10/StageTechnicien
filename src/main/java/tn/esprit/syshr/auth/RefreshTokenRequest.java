package tn.esprit.syshr.auth;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String refreshToken;
}
