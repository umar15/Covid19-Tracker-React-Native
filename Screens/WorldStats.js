import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

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

	return (
		<View>
			<Text>World Stats</Text>
			<View>
				<Text>
					Confirmed: {GlobalStats.confirmed}{" "}
					{GlobalStats.confirmed && (
						<Text>
							Confrmed %:{" "}
							{((GlobalStats.confirmed / worldPopulation) * 100).toFixed(
								2
							)}
						</Text>
					)}
				</Text>
				<Text>
					deaths: {GlobalStats.deaths}{" "}
					{GlobalStats.deaths && (
						<Text>
							Deaths %:{" "}
							{((GlobalStats.deaths / worldPopulation) * 100).toFixed(2)}
						</Text>
					)}
				</Text>
				<Text>
					critical: {GlobalStats.critical}{" "}
					{GlobalStats.critical && (
						<Text>
							Critical %:{" "}
							{((GlobalStats.critical / worldPopulation) * 100).toFixed(
								2
							)}
						</Text>
					)}
				</Text>
				<Text>
					recovered: {GlobalStats.recovered}{" "}
					{GlobalStats.recovered && (
						<Text>
							Recovered %:{" "}
							{((GlobalStats.recovered / worldPopulation) * 100).toFixed(
								2
							)}
						</Text>
					)}
				</Text>
				<Text>lastUpdate: {GlobalStats.lastUpdate}</Text>
			</View>
		</View>
	);
};

export default WorldStats;
