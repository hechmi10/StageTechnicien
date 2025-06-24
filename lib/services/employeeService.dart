import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:syshr/models/authResponse.dart';
import 'package:syshr/models/employee.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:syshr/models/role.dart';

enum AuthStatus { initial, authenticated, unauthenticated, loading, error }

class EmployeeService extends ChangeNotifier {
  AuthStatus _status = AuthStatus.initial;
      String? _token;
      Employee? _user;
      String? _errorMessage;
      final _storage = FlutterSecureStorage();

      bool isLoading = false; 

      AuthStatus get status => _status;
      Employee? get user => _user;
      String? get token => _token;
      String? get errorMessage => _errorMessage;
      bool get isAuthenticated => _status == AuthStatus.authenticated;
  Future<AuthResponse> signIn(int employeeId) async {
    const String url = "http://localhost:8080/api/auth/authenticate";
    try {
      Employee employee = await EmployeeService().getEmployeeById(employeeId);
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

  Future<bool> login(String email, String password) async {
        _status = AuthStatus.loading;
        _errorMessage = null;
        notifyListeners();

        try {
          // Here would be an API call to authenticate the user
          // For demo purposes, we'll simulate success after a delay
          await Future.delayed(Duration(seconds: 1));
          
          // Mock successful login
          if (email == 'test@example.com' && password == 'password') {
            _token = 'mock_token_${DateTime.now().millisecondsSinceEpoch}';
            _user = Employee(
              id: 2,
              password: 'password',
              email: email,
              role: Role.EMPLOYEE
            );
            
            await _storage.write(key: 'auth_token', value: _token);
            
            _status = AuthStatus.authenticated;
            notifyListeners();
            return true;
          } else {
            _status = AuthStatus.error;
            _errorMessage = 'Invalid email or password';
            notifyListeners();
            return false;
          }
        } catch (e) {
          _status = AuthStatus.error;
          _errorMessage = 'Login failed: ${e.toString()}';
          notifyListeners();
          return false;
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