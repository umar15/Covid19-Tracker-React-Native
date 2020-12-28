import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const FavouriteCountries = ({ navigation }) => {
	const [favCountries, setFavCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getKeys = async () => {
		const keys = await AsyncStorage.getAllKeys();
		const result = await AsyncStorage.multiGet(keys);
		var countries = [];
		result.map((key) => {
			countries = [
				...countries,
				{
					id: countries.length,
					country: key[1],
				},
			];
		});
		setFavCountries(countries);
		setIsLoading(true);
	};

	useEffect(() => {
		getKeys();
	});

	return (
		<View>
			<Text style={styles.headerStyles}>Favourite Countries</Text>
			{isLoading && (
				<View style={{ flexDirection: "column" }}>
					<FlatList
						keyExtractor={(item) => item.id.toString()}
						data={favCountries}
						renderItem={({ item }) => {
							const { country } = item;
							return (
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("Country Stats", { country })
									}
								>
									<ListItem bottomDivider>
										<ListItem.Content>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
												}}
											>
												<ListItem.Title>{country}</ListItem.Title>
											</View>
										</ListItem.Content>
										<Ionicons
											name="heart-sharp"
											size={24}
											color="red"
											onPress={() => {
												AsyncStorage.removeItem(`@${country}key`);
												Alert.alert(
													"removing Done!",
													`${country} removed from favourite countries`,
													[
														{
															text: "OK",
															onPress: () =>
																console.log("OK Pressed"),
														},
													],
													{ cancelable: false }
												);
											}}
										/>
									</ListItem>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			)}
		</View>
	);
	// }
};

const styles = StyleSheet.create({
	headerStyles: {
		textAlign: "center",
		alignItems: "center",
		padding: 5,
		marginTop: 5,
		marginBottom: 5,
		fontSize: 25,
		fontWeight: "bold",
	},
});

export default FavouriteCountries;
