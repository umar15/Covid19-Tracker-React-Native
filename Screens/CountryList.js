import React from "react";
import { View, Text, Button } from "react-native";

const CountryList = ({ navigation }) => {
	return (
		<View>
			<Text>Country List</Text>
			<Button
				title="Country Stats"
				onPress={() => navigation.navigate("CountryStats")}
			/>
		</View>
	);
};

export default CountryList;
