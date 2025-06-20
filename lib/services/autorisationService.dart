import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:syshr/models/autorisation.dart';

class AutorisationService {
  Future<void> createAutorisation(Autorisation autorisationData) async {
    const String url = "http://localhost:8080/api/autorisation/save-autorisation";
    try {
      final response = await http.post(
        Uri.parse(url),
        body: json.encode(autorisationData),
        headers: {
          "Content-Type": "application/json",
        },
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to create autorisation');
      }
    } catch (e) {
      print('Error creating autorisation: $e');
      rethrow;
    }
  }
}