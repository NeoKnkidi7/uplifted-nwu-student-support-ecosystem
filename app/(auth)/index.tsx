import { useEffect } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/hooks/auth-store";
import Button from "@/components/Button";
import Colors from "@/constants/colors";

export default function WelcomeScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isLoading, isAuthenticated, router, segments]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://r2-pub.rork.com/attachments/ah82kzkbuqpdg26lhgb2l" }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.title}>UpliftED</Text>
      <Text style={styles.subtitle}>NWU Student Support Ecosystem</Text>
      
      <View style={styles.featuresContainer}>
        <Text style={styles.featureText}>• AI Academic Assistant</Text>
        <Text style={styles.featureText}>• Bursary & Financial Aid Finder</Text>
        <Text style={styles.featureText}>• Mental Health Support</Text>
        <Text style={styles.featureText}>• Career Readiness Tools</Text>
        <Text style={styles.featureText}>• Student Resource Exchange</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Login" 
          onPress={() => router.push("/login")}
          style={styles.button}
          testID="login-button"
        />
        <Button 
          title="Register" 
          onPress={() => router.push("/register")}
          variant="outline"
          style={styles.button}
          testID="register-button"
        />
      </View>
      
      <View style={styles.campusContainer}>
        <Image
          source={{ uri: "https://r2-pub.rork.com/attachments/5rpvkgzjkqqxbrva54679" }}
          style={styles.campusLogo}
          resizeMode="contain"
        />
        <Image
          source={{ uri: "https://r2-pub.rork.com/attachments/dm4kl7744tmcr98nxcxnq" }}
          style={styles.campusLogo}
          resizeMode="contain"
        />
        <Image
          source={{ uri: "https://r2-pub.rork.com/attachments/ik3vo4wecp51ghpt4eh8a" }}
          style={styles.campusLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textLight,
    marginBottom: 30,
    textAlign: "center",
  },
  featuresContainer: {
    alignSelf: "stretch",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
  },
  button: {
    marginBottom: 16,
  },
  campusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    ...Platform.select({
      ios: {
        position: "absolute",
        bottom: 40,
      },
      android: {
        position: "absolute",
        bottom: 40,
      },
      web: {
        marginTop: 40,
      },
    }),
  },
  campusLogo: {
    width: 60,
    height: 60,
  },
});
