import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, FunctionComponent } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthProvider";

interface Props {
  email: string;
  password: string;
  name: string;
}

const RegisterScreen: FunctionComponent<Props> = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="light" /> */}
      <ImageBackground
        source={require("./assets/onboarding-bg.png")}
        style={styles.bg}
      >
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <Text>LOGIN</Text>
        <View>
          <View>
            {/* <UserIcon size={20} color="gray"/> */}
            <TextInput
              placeholder="Name"
              keyboardType="default"
              value={name}
              onChangeText={(text) => setName(name)}
              style={styles.input}
            />
          </View>
          <View>
            {/* <UserIcon size={20} color="gray"/> */}
            <TextInput
              placeholder="E-mail"
              keyboardType="default"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
          </View>
          <View>
            {/* <UserIcon size={20} color="gray"/> */}
            <TextInput
              placeholder="password"
              keyboardType="default"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            register(name, email, password);
          }}
        >
          <Text>Register</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate()}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

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
  btn: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
});
