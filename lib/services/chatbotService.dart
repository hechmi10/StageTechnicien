import 'package:firebase_ai/firebase_ai.dart';
import 'package:firebase_core/firebase_core.dart';

class ChatbotService {
  Future<String> sendMessage(String message) async {
    try {
      final generationConfig = GenerationConfig(
        responseMimeType: 'text/plain',
      );
      final safetySettings = [
        SafetySetting(
          HarmCategory.harassment,
          HarmBlockThreshold.high,
          null
        ),
        SafetySetting(
          HarmCategory.hateSpeech,
          HarmBlockThreshold.high,
          null
        ),
        SafetySetting(
          HarmCategory.sexuallyExplicit,
          HarmBlockThreshold.high,
          null
        ),
        SafetySetting(
          HarmCategory.dangerousContent,
          HarmBlockThreshold.high,
          null
        )
      ];
      final systemInstruction = Content.system(
        'Explain HR facts like sanctions,absences,day-offs,autorisations,lates and employee evaluations.'
      );

      final model = FirebaseAI.googleAI().generativeModel(
        model: 'gemini-2.5-flash',
        safetySettings: safetySettings,
        generationConfig: generationConfig,
        systemInstruction: systemInstruction
      );

      final chat = model.startChat();
      final userMessage = Content('user', [TextPart(message)]);
      final response = await chat.sendMessage(userMessage);
      return response.text ?? '';
    } on FirebaseException catch (e) {
      // Handle Firebase-specific errors
      return 'Firebase error: ${e.message}';
    } catch (e) {
      // Handle other errors
      return 'An error occurred: $e';
    }
  }
}