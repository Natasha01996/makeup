import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';
import Post from './post';
import Shop from './shop';
import Setting from './setting';
import Search from './search';
import HomeIconWithBadge from './HomeIconWithBadge';
import FirstScreen from './firstscreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { connect } from 'react-redux';
const Screens = ({ navigation, style }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route, props }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Cart') {
            return (
              <HomeIconWithBadge
                name={focused ? 'md-cart' : 'md-cart'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Store') {
            return (
              <Ionicons
                name={focused ? 'md-home' : 'md-home'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Setting') {
            return (
              <Ionicons
                name={focused ? 'md-settings' : 'md-settings'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Search') {
            return (
              <Ionicons
                name={focused ? 'md-search' : 'md-search'}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#28695e',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Store" component={Home} />
      <Tab.Screen name="Cart" component={Shop} />
    </Tab.Navigator>
  );
};
const Tabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="Home" component={Screens} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
export default Tabs;
