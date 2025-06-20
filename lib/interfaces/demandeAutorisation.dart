import 'package:flutter/material.dart';
import 'package:syshr/models/autorisation.dart';
import 'package:syshr/models/employee.dart';
import 'package:syshr/models/role.dart';
import 'package:syshr/services/autorisationService.dart';

class Demandeautorisation extends StatelessWidget {
  static const String demandeAutorisationUrl = "/demandeAutorisation";
  final formKey = GlobalKey<FormState>();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final TextEditingController dureeController = TextEditingController();

  Demandeautorisation({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Demande d\'Autorisation'),
        backgroundColor: Colors.blue[800],
      ),
body: Center(
  child: Padding(
    padding: const EdgeInsets.all(16.0),
    child: Form(
      key: formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
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
          const SizedBox(height: 16),
          TextFormField(
            controller: dateController,
            decoration: const InputDecoration(
              labelText: 'Date d\'autorisation',
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
                dateController.text = formattedDate;
              }
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: dureeController,
            decoration: const InputDecoration(
              labelText: 'Durée de l\'autorisation',
            ),
            maxLines: 3,
            validator: (value) => value == null || value.isEmpty
                ? 'Veuillez entrer une durée'
                : null,
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {
              if (formKey.currentState!.validate()) {
                final autorisation = Autorisation(
                  employeeEmail: emailController.text,
                  date: DateTime.parse(dateController.text),
                  duration: dureeController.text,
                );
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Autorisation soumise')),
                );
                AutorisationService().createAutorisation(autorisation);
              }
            },
            child: const Text('Soumettre'),
          ),
        ],
      ),
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