import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:syshr/models/conge.dart';

class CongeService{
  Future<void> createConge(Conge congeData) async {
    const String url = "http://localhost:8080/api/conge/save-conge";
    try {
      final response = await http.post(
        Uri.parse(url),
        body: json.encode(congeData.toJson()),
        headers: {
          "Content-Type": "application/json",
        },
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to create conge');
      }
    } catch (e) {
      print('Error creating conge: $e');
      rethrow;
    }
  }
}