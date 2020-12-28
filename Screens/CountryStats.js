import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "react-native-elements";
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
				<Text style={styles.headerStyles}>{country} stats</Text>
				{countryData && (
					<View>
						<View style={styles.statsStyles}>
							<Card
								containerStyle={{
									width: "40%",
									borderBottomColor: "blue",
									borderBottomWidth: 10,
								}}
							>
								<Card.Title>Confirmed</Card.Title>
								<Card.Divider />
								<View style={{ flexDirection: "column" }}>
									<Text>{countryData.confirmed}</Text>
									<Text>
										{(
											(countryData.confirmed / population) *
											100
										).toFixed(2)}
										%
									</Text>
								</View>
							</Card>
							<Card
								containerStyle={{
									width: "40%",
									borderBottomColor: "red",
									borderBottomWidth: 10,
								}}
							>
								<Card.Title>Deaths</Card.Title>
								<Card.Divider />
								<View style={{ flexDirection: "column" }}>
									<Text>{countryData.deaths}</Text>
									<Text>
										{(
											(countryData.deaths / countryData.confirmed) *
											100
										).toFixed(2)}
										%
									</Text>
								</View>
							</Card>
						</View>

						<View style={styles.statsStyles}>
							<Card
								containerStyle={{
									width: "40%",
									borderBottomColor: "purple",
									borderBottomWidth: 10,
								}}
							>
								<Card.Title>Critical</Card.Title>
								<Card.Divider />
								<View style={{ flexDirection: "column" }}>
									<Text>{countryData.critical}</Text>
									<Text>
										{(
											(countryData.critical /
												countryData.confirmed) *
											100
										).toFixed(2)}
										%
									</Text>
								</View>
							</Card>
							<Card
								containerStyle={{
									width: "40%",
									borderBottomColor: "green",
									borderBottomWidth: 10,
								}}
							>
								<Card.Title>Recovered</Card.Title>
								<Card.Divider />
								<View style={{ flexDirection: "column" }}>
									<Text>{countryData.recovered}</Text>
									<Text>
										{(
											(countryData.recovered /
												countryData.confirmed) *
											100
										).toFixed(2)}
										%
									</Text>
								</View>
							</Card>
						</View>
					</View>
				)}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	headerStyles: {
		textAlign: "center",
		alignItems: "center",
		padding: 5,
		marginTop: 5,
		fontSize: 25,
		fontWeight: "bold",
	},
	statsStyles: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
});

export default CountryStats;
