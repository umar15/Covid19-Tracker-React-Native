// import React, { useEffect, useState } from "react";
// import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const FavouriteCountries = ({ navigation }) => {
// 	const [favCountries, setFavCountries] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);

// 	const getKeys = async () => {
// 		const keys = await AsyncStorage.getAllKeys();
// 		const result = await AsyncStorage.multiGet(keys);
// 		// console.log(result);
// 		var countries = [];
// 		result.map((key) => {
// 			// const countryName = JSON.parse(key);
// 			// console.log(countryName);
// 			// console.log(key[1]);
// 			countries = [
// 				...countries,
// 				{
// 					id: countries.length,
// 					country: key[1],
// 				},
// 			];
// 		});
// 		setFavCountries(countries);
// 		setIsLoading(true);
// 	};

// 	useEffect(() => {
// 		getKeys();
// 	}, []);

// 	return (
// 		<View>
// 			<Text>Favourite Countries</Text>
// 			{isLoading && (
// 				<Text>
// 					<Text>Start</Text>
// 					{favCountries.map((item) => (
// 						<TouchableOpacity
// 							key={item.id}
// 							onPress={navigation.navigate("Country Stats", {
// 								country: item.country,
// 							})}
// 						>
// 							<View>
// 								<Text>{item.country}</Text>
// 							</View>
// 						</TouchableOpacity>
// 					))}
// 					<Text>End</Text>
// 				</Text>
// 			)}

// 			{/* {isLoading && (
// 				<FlatList
// 					keyExtractor={(item) => item.id.toString()}
// 					data={favCountries}
// 					renderItem={({ item }) => {
// 						const { country } = item;
// 						// console.log(item);
// 						<TouchableOpacity>
// 							<Text>{country}</Text>
// 						</TouchableOpacity>;
// 					}}
// 				/>
// 			)} */}

// 			{/* <Button title="press" onPress={console.log(favCountries)} /> */}
// 		</View>
// 	);
// 	// }
// };

// export default FavouriteCountries;

// // 				<TouchableOpacity
// // 				// onPress={() =>
// // 				// 	navigation.navigate("Country Stats", {
// // 				// 		country: AsyncStorage.getItem(countryKey),
// // 				// 	})
// // 				// }
// // 				>
// // 					{country}
// // 				</TouchableOpacity>
// // 			);
// // 		}}
// // 	/>
// // )}
