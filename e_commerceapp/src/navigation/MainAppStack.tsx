import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainAppBottomTabs from './MainAppBottomTabs';
import CheckoutScreen from '../screens/cart/CheckoutScreen';

const Stack = createStackNavigator();
const MainAppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name="CheckoutScreen"
        options={{ headerShown: true }}
        component={CheckoutScreen}
      />
    </Stack.Navigator>
  );
};

export default MainAppStack;

const styles = StyleSheet.create({});
