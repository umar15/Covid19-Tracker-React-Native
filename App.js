import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WorldStats from "./Screens/WorldStats";
import CountryStats from "./Screens/CountryStats";
import CountryList from "./Screens/CountryList";
import FavouriteCountries from "./Screens/FavouriteCountries";

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="WorldStats">
			<Drawer.Screen name="World Stats" component={WorldStats} />
			<Drawer.Screen name="Countries" component={CountryStack} />
			<Drawer.Screen name="Favourite Countries" component={FavouriteStack} />
		</Drawer.Navigator>
	);
}

const Stack = createStackNavigator();
const CountryStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="CountryList" component={CountryList} />
			<Stack.Screen name="CountryStats" component={CountryStats} />
		</Stack.Navigator>
	);
};

const FavouriteStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Favourite" component={FavouriteCountries} />
			<Stack.Screen name="CountryStats" component={CountryStats} />
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<DrawerNavigator />
		</NavigationContainer>
	);
}
