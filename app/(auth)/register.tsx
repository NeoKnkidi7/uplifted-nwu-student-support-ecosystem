import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Colors from "@/constants/colors";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    // Basic validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!studentNumber.trim()) {
      setError("Student number is required");
      return;
    }
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to register the user
      // For demo purposes, we'll just simulate a delay and redirect to login
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/login");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
        testID="back-button"
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://r2-pub.rork.com/attachments/vyxmzhhipc80cg3zftk7n" }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the NWU student community</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <View style={styles.formContainer}>
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          testID="name-input"
        />
        
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your NWU email"
          keyboardType="email-address"
          testID="email-input"
        />
        
        <Input
          label="Student Number"
          value={studentNumber}
          onChangeText={setStudentNumber}
          placeholder="Enter your student number"
          keyboardType="numeric"
          testID="student-number-input"
        />
        
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          testID="password-input"
        />
        
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          testID="confirm-password-input"
        />
        
        <Button 
          title="Register" 
          onPress={handleRegister}
          loading={isLoading}
          disabled={isLoading}
          style={styles.registerButton}
          testID="register-submit-button"
        />
      </View>
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.primary,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 24,
    textAlign: "center",
  },
  errorText: {
    color: Colors.error,
    marginBottom: 16,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  loginText: {
    color: Colors.textLight,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
