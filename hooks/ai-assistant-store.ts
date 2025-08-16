import { useState } from "react";
import createContextHook from "@nkzw/create-context-hook";
import { ChatMessage } from "@/types";

export const [AIAssistantProvider, useAIAssistant] = createContextHook(() => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Hello! I'm your NWU Academic Assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to an AI service
      // For demo purposes, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500));

      let responseText = "";
      
      // Simple keyword-based responses for demo
      const lowerText = text.toLowerCase();
      if (lowerText.includes("assignment") || lowerText.includes("homework")) {
        responseText = "For assignment help, I recommend checking the module guidelines on eFundi or contacting your module lecturer. You can also visit the Writing Center for assistance with academic writing.";
      } else if (lowerText.includes("exam") || lowerText.includes("test")) {
        responseText = "For exam preparation, review your lecture notes, practice with past papers, and consider forming a study group. The library has designated study areas, and many faculties offer exam preparation workshops.";
      } else if (lowerText.includes("registration") || lowerText.includes("enroll")) {
        responseText = "Registration for the next academic year typically opens in October. You can complete the process online through the Student Self-Service Portal or visit the Registration Office for assistance.";
      } else if (lowerText.includes("bursary") || lowerText.includes("financial aid") || lowerText.includes("nsfas")) {
        responseText = "For financial aid information, visit the Financial Aid Office or check the Bursaries section in this app. NSFAS applications for the next academic year usually open in September.";
      } else {
        responseText = "I understand you're asking about " + text.substring(0, 30) + "... To provide more specific help, could you provide more details about your question? I can assist with academic content, university procedures, or direct you to the right resources.";
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        text: responseText,
        sender: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: "welcome",
        text: "Hello! I'm your NWU Academic Assistant. How can I help you today?",
        sender: "assistant",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
});
