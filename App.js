import * as React from "react";
import { View, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import WorldStats from "./Screens/WorldStats";
import CountryStats from "./Screens/CountryStats";
import CountryList from "./Screens/CountryList";
import FavouriteCountries from "./Screens/FavouriteCountries";

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName="Global Stats"
			drawerContentOptions={{
				activeTintColor: "#fff",
				activeBackgroundColor: "#002240",
				inactiveTintColor: "#fff",
				inactiveBackgroundColor: "grey",
			}}
		>
			<Drawer.Screen
				name="Global Stats"
				component={GlobalStack}
				options={{
					drawerIcon: () => (
						<Ionicons name="globe" size={28} color="white" />
					),
				}}
			/>
			<Drawer.Screen
				name="Countries"
				component={CountryStack}
				options={{
					drawerIcon: () => (
						<FontAwesome5 name="city" size={24} color="white" />
					),
				}}
			/>
			<Drawer.Screen
				name="Favourite Countries"
				component={FavouriteStack}
				options={{
					drawerIcon: () => (
						<MaterialIcons name="favorite" size={28} color="white" />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}

const Stack = createStackNavigator();
const CountryStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				headerLeft: () => (
					<View>
						<Ionicons
							name="md-menu"
							size={32}
							color="black"
							onPress={() => navigation.toggleDrawer()}
						/>
					</View>
				),
			})}
		>
			<Stack.Screen name="Countries List" component={CountryList} />
			<Stack.Screen
				name="Country Stats"
				component={CountryStats}
				options={({ navigation }) => ({
					headerLeft: () => (
						<View>
							<Ionicons
								name="md-arrow-back"
								size={24}
								color="black"
								onPress={() => navigation.goBack()}
							/>
						</View>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const FavouriteStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				headerLeft: () => (
					<View>
						<Ionicons
							name="md-menu"
							size={32}
							color="black"
							onPress={() => navigation.toggleDrawer()}
						/>
					</View>
				),
			})}
		>
			<Stack.Screen
				name="Favourite Countries"
				component={FavouriteCountries}
			/>
			<Stack.Screen
				name="Country Stats"
				component={CountryStats}
				options={({ navigation }) => ({
					headerLeft: () => (
						<View>
							<Ionicons
								name="md-arrow-back"
								size={24}
								color="black"
								onPress={() => navigation.goBack()}
							/>
						</View>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const GlobalStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				headerLeft: () => (
					<View>
						<Ionicons
							name="md-menu"
							size={32}
							color="black"
							onPress={() => navigation.toggleDrawer()}
						/>
					</View>
				),
			})}
		>
			<Stack.Screen name="Global Stats" component={WorldStats} />
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
