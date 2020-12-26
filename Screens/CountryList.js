import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from "react-native";

const CountryList = ({ navigation }) => {
	const [countryList, setCountryList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
		setIsLoading(false);
		// console.log(countryList);
	};

	useEffect(() => {
		getCountryList();
	}, countryList);

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
