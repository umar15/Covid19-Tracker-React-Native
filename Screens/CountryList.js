import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TextInput,
	StyleSheet,
} from "react-native";

const CountryList = ({ navigation }) => {
	const [countryList, setCountryList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchCountry, setSearchCountry] = useState([]);

	const getCountryList = async () => {
		const response = await fetch(
			"https://world-population.p.rapidapi.com/allcountriesname",
			{
				method: "GET",
				headers: {
					"x-rapidapi-key":
						"6855cf7242msh879a563e0d43b0dp12a354jsn5a0fefe10680",
					"x-rapidapi-host": "world-population.p.rapidapi.com",
				},
			}
		);
		const data = await response.json();
		var countries = [];
		data.body.countries.map((item) => {
			countries = [...countries, { id: countries.length, country: item }];
		});
		setCountryList(countries);
		setSearchCountry(countries);
		setIsLoading(false);
	};

	useEffect(() => {
		getCountryList();
	}, []);

	const searchCountries = (text) => {
		const newData = searchCountry.filter((item) => {
			const itemData = item.country;
			const textData = text.charAt(0).toUpperCase() + text.slice(1);
			return itemData.indexOf(textData) > -1;
		});
		setCountryList(newData);
	};

	if (isLoading) {
		return (
			<View>
				<ActivityIndicator
					size="large"
					color="blue"
					style={{ marginTop: 20 }}
				/>
			</View>
		);
	} else {
		return (
			<View>
				<Text style={styles.headerStyles}>Country List</Text>
				<TextInput
					style={styles.searchStyles}
					placeholder="Search Countries"
					onChangeText={(text) => searchCountries(text)}
				/>
				{countryList && (
					<FlatList
						keyExtractor={(item) => item.id.toString()}
						data={countryList}
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
											<ListItem.Title>{country}</ListItem.Title>
										</ListItem.Content>
										<ListItem.Chevron />
									</ListItem>
								</TouchableOpacity>
							);
						}}
					/>
				)}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	searchStyles: {
		borderWidth: 1,
		borderColor: "grey",
		width: "100%",
		padding: 6,
		marginTop: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	headerStyles: {
		textAlign: "center",
		alignItems: "center",
		padding: 5,
		marginTop: 5,
		fontSize: 25,
		fontWeight: "bold",
	},
});

export default CountryList;
