import 'package:flutter/material.dart';
import 'package:syshr/models/conge.dart';
import 'package:syshr/models/employee.dart';
import 'package:syshr/models/role.dart';
import 'package:syshr/services/congeService.dart';

class Demandeconge extends StatefulWidget {
  static const String demandeCongeUrl = "/demandeConge";
  Demandeconge({super.key});

  @override
  State<Demandeconge> createState() => _DemandecongeState();
}

class _DemandecongeState extends State<Demandeconge> {
  final formKey = GlobalKey<FormState>();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController dateDebutController = TextEditingController();
  final TextEditingController dateFinController = TextEditingController();
  final TextEditingController nbJoursController = TextEditingController();
  final TextEditingController raisonController = TextEditingController();

  @override
  void dispose() {
    emailController.dispose();
    dateDebutController.dispose();
    dateFinController.dispose();
    raisonController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Demande de Congé'),
        backgroundColor: Colors.blue[800],
      ),
      body: Center(
        child: Form(
          key: formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextFormField(
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'Email de l\'employé',
                ),
                keyboardType: TextInputType.emailAddress,
                validator: (value) => value == null || value.isEmpty
                    ? 'Veuillez entrer un email'
                    : null,
              ),
              TextFormField(
                controller: dateDebutController,
                decoration: const InputDecoration(
                  labelText: 'Date debut du congé',
                  hintText: 'YYYY-MM-DD',
                  suffixIcon: Icon(Icons.calendar_today),
                ),
                readOnly: true,
                onTap: () async {
                  DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000),
                    lastDate: DateTime(2100),
                  );
                  if (pickedDate != null) {
                    String formattedDate = "${pickedDate.year}-${pickedDate.month.toString().padLeft(2, '0')}-${pickedDate.day.toString().padLeft(2, '0')}";
                    setState(() {
                      dateDebutController.text = formattedDate;
                    });
                  }
                },
                validator: (value) => value == null || value.isEmpty
                    ? 'Veuillez sélectionner une date de début'
                    : null,
              ),
              TextFormField(
                controller: dateFinController,
                decoration: const InputDecoration(
                  labelText: 'Date fin du congé',
                  hintText: 'YYYY-MM-DD',
                  suffixIcon: Icon(Icons.calendar_today),
                ),
                readOnly: true,
                onTap: () async {
                  DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000),
                    lastDate: DateTime(2100),
                  );
                  if (pickedDate != null) {
                    String formattedDate = "${pickedDate.year}-${pickedDate.month.toString().padLeft(2, '0')}-${pickedDate.day.toString().padLeft(2, '0')}";
                    setState(() {
                      dateFinController.text = formattedDate;
                    });
                  }
                },
                validator: (value) => value == null || value.isEmpty
                    ? 'Veuillez sélectionner une date de fin'
                    : null,
              ),
              TextFormField(
                readOnly: true,
                decoration: const InputDecoration(
                  labelText: 'Nombre de jours',
                ),
                controller: TextEditingController(
                  text: (dateDebutController.text.isNotEmpty && dateFinController.text.isNotEmpty)
                      ? (() {
                          try {
                            final debut = DateTime.parse(dateDebutController.text);
                            final fin = DateTime.parse(dateFinController.text);
                            final diff = fin.difference(debut).inDays + 1;
                            return diff > 0 ? diff.toString() : '';
                          } catch (_) {
                            return '';
                          }
                        })()
                      : '',
                ),
                enabled: false,
              ),
              TextFormField(
                controller: raisonController,
                decoration: const InputDecoration(
                  labelText: 'Raison du congé',
                ),
                validator: (value) => value == null || value.isEmpty
                    ? 'Veuillez entrer la raison du congé'
                    : null,
              ),
              ElevatedButton(
                onPressed: () async {
                  if (formKey.currentState!.validate()) {
                    try {
await CongeService().createConge(
  Conge(
    employeeEmail: emailController.text,
    dateDebut: DateTime.parse(dateDebutController.text),
    dateFin: DateTime.parse(dateFinController.text),
    nbJours: int.tryParse(nbJoursController.text) ?? 0,
    raison: raisonController.text,
  ),
);
ScaffoldMessenger.of(context).showSnackBar(
  const SnackBar(content: Text('Demande soumise avec succès')),
);
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Erreur: $e')),
                      );
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Veuillez corriger les erreurs')),
                    );
                  }
                },
                child: const Text('Soumettre'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _dateController {
  static String text = '';
  static void setText(String value) {
    text = value;
  }
  static String get textValue => text;
}