import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:syshr/models/employee.dart';

class EmployeeService {
  Future<Employee> signIn() async {
    const String url = "http://localhost:8080/api/auth/authenticate";
    try {
      final response = await http.post(Uri.parse(url));
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