import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, Platform } from "react-native";
import Colors from "@/constants/colors";

interface CardProps {
  title?: string;
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  contentStyle?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  onPress,
  style,
  titleStyle,
  contentStyle,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
      testID="card-component"
    >
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  content: {
    width: "100%",
  },
});

export default Card;
