class AuthRequest {
  final String email;
  final String password;

  AuthRequest({required this.email, required this.password});

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
    };
  }
  factory AuthRequest.fromJson(Map<String, dynamic> json) {
    return AuthRequest(
      email: json['email'],
      password: json['password'],
    );
  }
}