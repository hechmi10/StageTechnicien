import 'package:syshr/models/employee.dart';

class Conge {
  final int? id;
  final DateTime dateDebut;
  final DateTime dateFin;
  final int nbJours;
  final String raison;
  final String employeeEmail;

  Conge({
    this.id,
    required this.dateDebut,
    required this.dateFin,
    required this.nbJours,
    required this.raison,
    required this.employeeEmail,
  });

  factory Conge.fromJson(Map<String, dynamic> json) {
    return Conge(
      id: json['id'],
      dateDebut: DateTime.parse(json['dateDebut']),
      dateFin: DateTime.parse(json['dateFin']),
      nbJours: json['nbJours'],
      raison: json['raison'],
      employeeEmail: json['employeeEmail'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'dateDebut': dateDebut.toIso8601String(),
      'dateFin': dateFin.toIso8601String(),
      'nbJours': nbJours,
      'raison': raison,
      'employeeEmail': employeeEmail,
    };
  }
}
