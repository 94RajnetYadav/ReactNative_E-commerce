import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainAppStack from './src/navigation/MainAppStack';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
  // userFonts({
  //   'Nunito-Medium': require('./src/assets/fonts/Nunito-Medium.ttf'),
  //   'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
  // });

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <MainAppStack />
        </NavigationContainer>
      </Provider>
    </>
  );
}
