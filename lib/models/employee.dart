
import 'package:syshr/models/role.dart';

class Employee {
  final String id;
  final String email;
  final String password;
  final Role role;

  Employee({
    required this.id,
    required this.email,
    required this.password,
    required this.role,
  });

  @override
  String toString() {
    return 'Employee{id: $id, email: $email, password: $password, role: $role}';
  }
  factory Employee.fromJson(Map<String, dynamic> json) {
    return Employee(
      id: json['id'],
      email: json['email'] as String,
      password: json['password'] as String,
      role: (json['role'] as Map<String, dynamic>).fromJson(),
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'password': password,
      'role': role.toJson(),
    };
  }
}