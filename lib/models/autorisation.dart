import 'package:syshr/models/employee.dart';

class Autorisation {
  final int? id;
  final DateTime date;
  final String duration;
  final String employeeEmail;

  Autorisation({
    this.id,
    required this.date,
    required this.duration,
    required this.employeeEmail,
  });

  factory Autorisation.fromJson(Map<String, dynamic> json) {
    return Autorisation(
      id: json['id'],
      date: DateTime.parse(json['date']),
      duration: json['duration'],
      employeeEmail: json['employeeEmail'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date.toIso8601String(),
      'duration': duration,
      'employeeEmail': employeeEmail,
    };
  }
}
