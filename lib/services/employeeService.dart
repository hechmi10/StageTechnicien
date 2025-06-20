import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:syshr/models/authResponse.dart';
import 'package:syshr/models/employee.dart';

class EmployeeService {
  Future<AuthResponse> signIn() async {
    const String url = "http://localhost:8080/api/auth/authenticate";
    try {
      Employee employee = await EmployeeService().getEmployeeById(2); // Example employee ID
      final response = await http.post(
        Uri.parse(url),
        body: json.encode({
          "email": employee.email,
          "password": employee.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      );
      if (response.statusCode == 200) {
        final Map<String, dynamic> jsonResponse = json.decode(response.body);
        return AuthResponse.fromJson(jsonResponse);
      } else {
        throw Exception('Failed to authenticate');
      }
    } catch (e) {
      print('Error authenticating: $e');
      rethrow;
    }
  }

  Future<Employee> getEmployeeById(int id) async {
    final String url = "http://localhost:8080/api/employee/get-employee-by-id/$id";
    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        final Map<String, dynamic> jsonResponse = json.decode(response.body);
        return Employee.fromJson(jsonResponse);
      } else {
        throw Exception('Failed to load employee');
      }
    } catch (e) {
      print('Error fetching employee: $e');
      rethrow;
    }
  }
}