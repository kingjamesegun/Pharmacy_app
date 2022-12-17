import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthProvider";

interface Item {
	email: string;
	password: string;
}

const LoginScreen: React.FC<Item> = () => {
	const navigation = useNavigation();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const val = useContext(AuthContext);

	return (
		<View style={styles.container}>
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
							value={email}
							onChangeText={(text) => setPassword(text)}
							style={styles.input}
						/>
					</View>
					{/* <View >
            <UserIcon size={20} color="gray"/>
            <TextInput 
              placeholder='E-mail'
              keyboardType='default'
            />
          </View> */}
				</View>

				<TouchableOpacity style={styles.btn}>
					<Text>Login</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: "row", marginTop: 20 }}>
					<Text>Don't have an account? </Text>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate("Register")}
					>
						<Text>Register</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;

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
