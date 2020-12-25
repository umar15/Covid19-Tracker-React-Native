import React from "react";
import { View, Text, Button } from "react-native";

const FavouriteCountries = ({ navigation }) => {
	return (
		<View>
			<Text>Favourite Countries</Text>
			<Button
				title="country"
				onPress={() => navigation.navigate("CountryStats")}
			/>
		</View>
	);
};

export default FavouriteCountries;