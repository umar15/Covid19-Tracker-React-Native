import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CountryStats = ({ route, navigation }) => {
	const country = route.params.country;
	const [countryData, setCountryData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [population, setPopulation] = useState(0);

	const saveCountry = async () => {
		console.log("saving");
		await AsyncStorage.setItem(`@${country}key`, country);
		console.log("saving done");
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={{ margin: 18 }}>
					<MaterialIcons
						name="favorite-border"
						size={24}
						color="black"
						onPress={saveCountry}
					/>
				</View>
			),
		});
	}, []);

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

	const getCountryPopulation = async () => {
		const countryPopulation = await fetch(
			`https://world-population.p.rapidapi.com/population?country_name=${country}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-key":
						"6855cf7242msh879a563e0d43b0dp12a354jsn5a0fefe10680",
					"x-rapidapi-host": "world-population.p.rapidapi.com",
				},
			}
		);
		const populationData = await countryPopulation.json();
		// console.log(population);
		setPopulation(populationData.body.population);
	};

	useEffect(() => {
		getCountryData();
		getCountryPopulation();
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
						<Text>
							Confirmed: {countryData.confirmed}{" "}
							{countryData.confirmed && (
								<Text>
									Confrmed %:{" "}
									{(
										(countryData.confirmed / population) *
										100
									).toFixed(2)}
								</Text>
							)}
						</Text>
						<Text>
							deaths: {countryData.deaths}
							{countryData.deaths && (
								<Text>
									Deaths %:{" "}
									{((countryData.deaths / population) * 100).toFixed(
										2
									)}
								</Text>
							)}
						</Text>
						<Text>
							critical: {countryData.critical}
							{countryData.critical && (
								<Text>
									Critical %:{" "}
									{((countryData.critical / population) * 100).toFixed(
										2
									)}
								</Text>
							)}
						</Text>
						<Text>
							recovered: {countryData.recovered}
							{countryData.recovered && (
								<Text>
									Recovered %:{" "}
									{(
										(countryData.recovered / population) *
										100
									).toFixed(2)}
								</Text>
							)}
						</Text>
					</View>
				)}
			</View>
		);
	}
};

export default CountryStats;
