import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { s, vs } from 'react-native-size-matters';
import AppText from '../texts/AppText';
import { AppColors } from '../../styles/colors';
// import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

const AppButton = ({
  onPress = () => {},
  title = 'Button',
  backgroundColor = AppColors.primary,
  textColor = AppColors.white,
  style = {},
  styleTitle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, { backgroundColor: backgroundColor }, style]}
    >
      <AppText
        style={[styles.testTitle, { color: textColor }, styleTitle]}
        variant="bold"
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: '100%',
    height: vs(40),
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(25),
  },
  testTitle: {
    fontSize: s(16),
  },
});
