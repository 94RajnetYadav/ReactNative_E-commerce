import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { s } from 'react-native-size-matters';
import AppText from '../../components/texts/AppText';
import { AppFonts } from '../../styles/fonts';
import { AppColors } from '../../styles/colors';
import AppButton from '../../components/buttons/AppButton';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyCart = () => {
  const navigation = useNavigation(); // Replace with actual navigation prop
  return (
    <View style={styles.container}>
      <MaterialCommunityIcon
        name="shopping-outline"
        size={s(80)}
        color={AppColors.primary}
        style={styles.icon}
      />
      <AppText style={styles.title}>Your Cart Is Empty</AppText>
      <AppText style={styles.subtitle}>
        Browse our products and find somethings you like
      </AppText>
      <AppButton
        title="Start Shopping"
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(20),
  },
  title: {
    fontSize: s(20),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginBottom: s(10),
  },
  subtitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.midGray,
    textAlign: 'center',
    marginBottom: s(20),
  },
  button: {
    width: '80%',
  },
  icon: {
    marginBottom: s(20),
    opacity: 0.9,
  },
});
