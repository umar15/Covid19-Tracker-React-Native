import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const CountryStats = ({ route }) => {
	const country = route.params.country;
	const [countryData, setCountryData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getCountryData = async () => {
		const url = "https://covid-19-data.p.rapidapi.com/country?name=";
		const response = await fetch(`${url}${country}`, {
			method: "GET",
			headers: {
				"x-rapidapi-key":
					"6855cf7242msh879a563e0d43b0dp12a354jsn5a0fefe10680",
				"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
			},
		});
		const data = await response.json();
		console.log(data[0].confirmed);
		const newData = {
			confirmed: data[0].confirmed,
			recovered: data[0].recovered,
			deaths: data[0].deaths,
			critical: data[0].critical,
		};
		setCountryData(newData);
		// console.log(countryData);
		setIsLoading(false);
	};

	useEffect(() => {
		getCountryData();
	}, []);

	if (isLoading) {
		return (
			<View>
				<ActivityIndicator size="large" color="blue" />
			</View>
		);
	} else {
		return (
			<View>
				<Text>{country} stats</Text>
				{countryData && (
					<View>
						<Text>Confirmed: {countryData.confirmed}</Text>
						<Text>deaths: {countryData.deaths}</Text>
						<Text>critical: {countryData.critical}</Text>
						<Text>recovered: {countryData.recovered}</Text>
					</View>
				)}
			</View>
		);
	}
};

export default CountryStats;
