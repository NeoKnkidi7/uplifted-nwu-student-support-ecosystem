import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/auth-store";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Colors from "@/constants/colors";

export default function LoginScreen() {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!studentNumber.trim()) {
      setError("Student number is required");
      return;
    }
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    setError("");
    const result = await login(studentNumber, password);
    
    if (!result.success) {
      setError(result.error || "Login failed");
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
      
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your NWU account</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <View style={styles.formContainer}>
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
          placeholder="Enter your password"
          secureTextEntry
          testID="password-input"
        />
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <Button 
          title="Login" 
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
          style={styles.loginButton}
          testID="login-submit-button"
        />
      </View>
      
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.helpText}>
        For login assistance, contact the IT Help Desk at 018 299 2700
      </Text>
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
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  registerText: {
    color: Colors.textLight,
  },
  registerLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  helpText: {
    textAlign: "center",
    color: Colors.textLight,
    fontSize: 12,
  },
});
