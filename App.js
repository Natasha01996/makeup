import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Home from './screens/home';
import Shop from './screens/shop';
import MyTabs from './screens/tabs';
const Tab = createBottomTabNavigator();
import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';
const store = createStore(rootReducer);
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
