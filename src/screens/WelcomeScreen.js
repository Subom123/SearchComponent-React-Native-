import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#AED6F1", "#F2D7D5"]}
      style={{ flex: 1 }}
      end={{ x: 0.4, y: 0.1 }}
    >
      <View style={styles.PrimaryViewContainer}>
        <View style={styles.SecondaryViewContainer}>
          <View style={styles.ImageContainer}>
            <View style={styles.ImageViewContainer}>
              <Image
                source={require("../assets/WelcomeCat.png")}
                resizeMode="contain"
                style={styles.ImageStyling}
              />
            </View>
            <View style={styles.TextContainer}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                Let's Discover Movies
              </Text>
            </View>
            <LinearGradient
              colors={["#AED6F1", "#F2D7D5"]}
              style={{ marginTop: 160, borderRadius: 30 }}
              end={{ x: 0.1, y: 0.4 }}
              start={{ x: 0.4, y: 0.6 }}
            >
              <Pressable onPress={() => navigation.navigate("Hometab")}>
                <View style={styles.ButtonViewContainer}>
                  <Text style={{ fontSize: 18 }}>Try It Now</Text>
                </View>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  PrimaryViewContainer: {
    flex: 1,
  },
  SecondaryViewContainer: {
    marginTop: 290,
    backgroundColor: "#D6EAF8",
    flex: 1,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
  },
  ImageViewContainer: {
    height: 400,
    width: 400,
    position: "absolute",
    top: -190,
  },
  ImageContainer: {
    alignItems: "center",
  },
  ImageStyling: {
    height: "100%",
    width: "100%",
  },
  TextContainer: {
    marginTop: 200,
  },
  ButtonViewContainer: {
    paddingHorizontal: 120,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
  },
});
