import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeHeader from '../../components/header/HomeHeader';
import ProfileSectionButton from '../../components/buttons/ProfileSectionButton';
import { sharedPaddingHorizontal } from '../../styles/sharedStyles';
import { useNavigation } from '@react-navigation/native';
import AppSaveView from '../../components/views/AppSaveViews';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  MyOrdersScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  MainAppBottomTabs: undefined;
};

const ProfileScreen = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <AppSaveView>
      <HomeHeader />
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title={'My Orders'}
          onPress={() => navigation.navigate('MyOrdersScreen')}
        />
        <ProfileSectionButton
          title={'Language'}
          onPress={() => navigation.navigate('MyOrdersScreen')}
        />
        <ProfileSectionButton
          title={'Logout'}
          onPress={() => navigation.navigate('MyOrdersScreen')}
        />
      </View>
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
