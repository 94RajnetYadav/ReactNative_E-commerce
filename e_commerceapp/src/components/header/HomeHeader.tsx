import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { AppColors } from '../../styles/colors';
import { vs } from 'react-native-size-matters';
import { IMAGES } from '../../constants/images-path';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.applogo} style={styles.logo} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: vs(5),
  },
  logo: { height: vs(40), width: vs(40), tintColor: AppColors.white },
});
