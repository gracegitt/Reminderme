// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddReminderScreen from './screens/AddReminderScreen';
import ViewReminderScreen from './screens/ViewReminderScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />
        <Stack.Screen name="ViewReminder" component={ViewReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
