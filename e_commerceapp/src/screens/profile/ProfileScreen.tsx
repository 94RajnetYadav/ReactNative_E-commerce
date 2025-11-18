import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppSaveViews from '../../components/views/AppSaveViews';
import HomeHeader from '../../components/header/HomeHeader';
import ProfileSectionButton from '../../components/buttons/ProfileSectionButton';
import AppText from '../../components/texts/AppText';
import { s, vs } from 'react-native-size-matters';

const ProfileScreen = () => {
  return (
    <AppSaveViews>
      <HomeHeader />
      <AppText variant="bold" style={{ fontSize: s(18), marginTop: vs(10) }}>
        Hello, Ahmad
      </AppText>
      <ProfileSectionButton title="My Orders" onPress={{}} />
      <ProfileSectionButton title="Language" onPress={{}} />
      <ProfileSectionButton title="Logout" onPress={{}} />
    </AppSaveViews>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
