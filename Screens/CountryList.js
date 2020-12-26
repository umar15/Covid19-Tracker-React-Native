import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TextInput,
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
				<ActivityIndicator size="large" color="blue" />
			</View>
		);
	} else {
		return (
			<View>
				<Text>Country List</Text>
				<TextInput
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
									<Text>{country}</Text>
								</TouchableOpacity>
							);
						}}
					/>
				)}
			</View>
		);
	}
};

export default CountryList;
