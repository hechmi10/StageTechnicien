import 'package:flutter/material.dart';

class Pointage extends StatefulWidget {
  static const String pointageUrl = "/pointage";
  const Pointage({super.key});

  @override
  State<Pointage> createState() => _PointageState();
}

class _PointageState extends State<Pointage> {
  int pointagesRestants = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
      title: const Text("Pointage"),
      backgroundColor: Colors.blue,
      ),
      body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
        const Text("Pointage"),
        Text("Nombre de pointages restants: $pointagesRestants"),
        ElevatedButton(
          onPressed: () {
          setState(() {
            if(pointagesRestants!=0){
              pointagesRestants--;
            }else{
              pointagesRestants = 0;
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Vous n'avez plus de pointages restants")),
              );
            }
            
          });
          },
          child: const Text("Valider"),
        ),
        ],
      ),
      ),
    );
    }
}