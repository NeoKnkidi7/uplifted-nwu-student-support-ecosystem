import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { Send } from "lucide-react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Colors from "@/constants/colors";
import { useAIAssistant } from "@/hooks/ai-assistant-store";

export default function AcademicScreen() {
  const { messages, sendMessage, isLoading } = useAIAssistant();
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText("");
    }
  };

  const renderMessage = ({ item }: { item: { id: string; text: string; sender: string; timestamp: string } }) => {
    const isUser = item.sender === "user";
    
    return (
      <View 
        style={[
          styles.messageContainer, 
          isUser ? styles.userMessageContainer : styles.assistantMessageContainer
        ]}
      >
        <View 
          style={[
            styles.messageBubble, 
            isUser ? styles.userMessageBubble : styles.assistantMessageBubble
          ]}
        >
          <Text 
            style={[
              styles.messageText, 
              isUser ? styles.userMessageText : styles.assistantMessageText
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Academic Assistant" />
      
      <View style={styles.contentContainer}>
        <Card title="AI Academic Assistant" style={styles.infoCard}>
          <Text style={styles.infoText}>
            Ask questions about your courses, assignments, or any academic topic. 
            I&apos;m here to help with explanations, summaries, and study resources.
          </Text>
        </Card>
        
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
          />
          
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your question..."
                placeholderTextColor={Colors.textLight}
                multiline
                maxLength={500}
                onSubmitEditing={handleSend}
                editable={!isLoading}
              />
              <TouchableOpacity 
                style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={isLoading || !inputText.trim()}
              >
                <Send size={20} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  messagesList: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: "80%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  assistantMessageContainer: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  userMessageBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  assistantMessageBubble: {
    backgroundColor: "#F0F0F0",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: Colors.secondary,
  },
  assistantMessageText: {
    color: Colors.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: Colors.text,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.textLight,
  },
});
