import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/onboarding-bg.png")}
        style={styles.bg}
      >
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <Image
          source={require("./assets/onboarding-svg.png")}
          style={styles.svg}
        />
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          suscipit omnis provident magni? Voluptatem, reprehenderit!
        </Text>
        <TouchableOpacity>
          <Text>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {},
  svg: {},
  text: {},
});
