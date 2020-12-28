import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Card } from "react-native-elements";

const WorldStats = () => {
	const [GlobalStats, setGlobalStats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [worldPopulation, setWorldPopulation] = useState(0);

	const getData = async () => {
		const response = await fetch(
			"https://covid-19-data.p.rapidapi.com/totals",
			{
				method: "GET",
				headers: {
					"x-rapidapi-key":
						"6855cf7242msh879a563e0d43b0dp12a354jsn5a0fefe10680",
					"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
				},
			}
		);
		const data = await response.json();
		const newData = {
			confirmed: data[0].confirmed,
			deaths: data[0].deaths,
			critical: data[0].critical,
			recovered: data[0].recovered,
			lastUpdate: new Date(data[0].lastUpdate).toDateString(),
		};
		setGlobalStats(newData);
		setIsLoading(false);
	};

	const getGlobalPopulation = async () => {
		const globalPopulation = await fetch(
			"https://world-population.p.rapidapi.com/worldpopulation",
			{
				method: "GET",
				headers: {
					"x-rapidapi-key":
						"6855cf7242msh879a563e0d43b0dp12a354jsn5a0fefe10680",
					"x-rapidapi-host": "world-population.p.rapidapi.com",
				},
			}
		);
		const global = await globalPopulation.json();
		setWorldPopulation(global.body.world_population);
	};

	useEffect(() => {
		getData();
		getGlobalPopulation();
	}, []);

	if (isLoading) {
		return (
			<View>
				<ActivityIndicator
					style={{ marginTop: 20 }}
					size="large"
					color="blue"
				/>
			</View>
		);
	}

	return (
		<View>
			<Text style={styles.headerStyles}>Global Stats</Text>
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
							<Text>{GlobalStats.confirmed}</Text>
							<Text>
								{GlobalStats.confirmed && (
									<Text>
										{(
											(GlobalStats.confirmed / worldPopulation) *
											100
										).toFixed(2)}
										%
									</Text>
								)}
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
							<Text>{GlobalStats.deaths}</Text>
							<Text>
								{GlobalStats.deaths && (
									<Text>
										{(
											(GlobalStats.deaths / GlobalStats.confirmed) *
											100
										).toFixed(2)}
										%
									</Text>
								)}
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
							<Text>{GlobalStats.critical}</Text>
							<Text>
								{GlobalStats.critical && (
									<Text>
										{(
											(GlobalStats.critical /
												GlobalStats.confirmed) *
											100
										).toFixed(2)}
										%
									</Text>
								)}
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
							<Text>{GlobalStats.recovered}</Text>
							<Text>
								{GlobalStats.recovered && (
									<Text>
										{(
											(GlobalStats.recovered /
												GlobalStats.confirmed) *
											100
										).toFixed(2)}
										%
									</Text>
								)}
							</Text>
						</View>
					</Card>
				</View>
				<View>
					<Card
						containerStyle={{
							width: "88%",
							marginTop: 15,
							marginLeft: "6%",
						}}
					>
						<Card.Title>Last Updated</Card.Title>
						<Card.Divider />
						<Text>{GlobalStats.lastUpdate}</Text>
					</Card>
				</View>
			</View>
		</View>
	);
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

export default WorldStats;
