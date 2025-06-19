class AuthResponse {
  final String token;
  final String role;
  final String refreshToken;
  final String error;

  AuthResponse({required this.token, required this.role, required this.refreshToken, required this.error});

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      token: json['token'],
      role: json['role'],
      refreshToken: json['refreshToken'],
      error: json['error'],
    );
  }
}
