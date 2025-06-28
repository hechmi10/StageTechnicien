import { Component, ChangeDetectorRef } from '@angular/core';
import {
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/genai';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userInput: string = '';
  messages: { sender: string, text: string }[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  async sendMessage(): Promise<void> {
    if (!this.userInput.trim()) return;

    // Add user's message
    this.messages.push({ sender: 'user', text: this.userInput });

    const ai = new GoogleGenAI({
      apiKey: 'AIzaSyDzvXyqZpDd_rKyHuHMeCTH5xVb9lFF2TM',
    });
    const config = {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
      responseMimeType: 'text/plain',
      systemInstruction: [
        {
          text: `Explain HR facts like sanctions,absences,day-offs,autorisations,lates and employee evaluations.`,
        }
      ],
    };
    const model = 'gemini-2.5-flash';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: this.userInput,
          },
        ],
      },
    ];

    let aiResponse = '';
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    for await (const chunk of response) {
      if (chunk && chunk.text) {
        aiResponse += chunk.text;
      }
    }

    // Add AI's message
    this.messages.push({ sender: 'ai', text: aiResponse });
    this.cd.detectChanges();

    // Clear user input
    this.userInput = '';
  }
}
