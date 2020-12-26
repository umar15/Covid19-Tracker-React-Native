import React from "react";
import { View, Text } from "react-native";

const CountryStats = ({ route }) => {
	const country = route.params.country;
	return (
		<View>
			<Text>{country} Stats</Text>
		</View>
	);
};

export default CountryStats;
