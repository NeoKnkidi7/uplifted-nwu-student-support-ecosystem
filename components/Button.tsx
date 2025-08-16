import React from "react";
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform
} from "react-native";
import Colors from "@/constants/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  icon,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    switch (variant) {
      case "primary":
        buttonStyle = {
          backgroundColor: Colors.primary,
        };
        break;
      case "secondary":
        buttonStyle = {
          backgroundColor: Colors.accent,
        };
        break;
      case "outline":
        buttonStyle = {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: Colors.primary,
        };
        break;
    }

    switch (size) {
      case "small":
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: 8,
          paddingHorizontal: 16,
        };
        break;
      case "medium":
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: 12,
          paddingHorizontal: 24,
        };
        break;
      case "large":
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: 16,
          paddingHorizontal: 32,
        };
        break;
    }

    if (disabled) {
      buttonStyle = {
        ...buttonStyle,
        opacity: 0.5,
      };
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleObj: TextStyle = {};
    
    switch (variant) {
      case "primary":
      case "secondary":
        textStyleObj = {
          color: Colors.secondary,
        };
        break;
      case "outline":
        textStyleObj = {
          color: Colors.primary,
        };
        break;
    }

    switch (size) {
      case "small":
        textStyleObj = {
          ...textStyleObj,
          fontSize: 14,
        };
        break;
      case "medium":
        textStyleObj = {
          ...textStyleObj,
          fontSize: 16,
        };
        break;
      case "large":
        textStyleObj = {
          ...textStyleObj,
          fontSize: 18,
        };
        break;
    }

    return textStyleObj;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === "outline" ? Colors.primary : Colors.secondary} 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        cursor: "pointer",
      },
    }),
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Button;
