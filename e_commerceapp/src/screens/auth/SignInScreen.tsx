import { StyleSheet, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import AppSaveViews from '../../components/views/AppSaveViews';
import { sharedPaddingHorizontal } from '../../styles/sharedStyles';
import { IMAGES } from '../../constants/images-path';
import { s, vs } from 'react-native-size-matters';
import AppTextInput from '../../components/inputs/AppTextInput';
import AppText from '../../components/texts/AppText';
import AppButton from '../../components/buttons/AppButton';
import { AppColors } from '../../styles/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppTextInputController from '../../components/inputs/AppTextInputControllers';

import { showMessage } from 'react-native-flash-message';
import { setUserData } from '../../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
// 2- Make schema

type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  MainAppBottomTabs: undefined;
};
const schema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

// 3- Define the type
type FormData = yup.InferType<typeof schema>;
const SignInScreen = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'raj@gmail.com',
      password: '123456',
    },
  });

  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();
  const onLoginPress = async (data: FormData) => {
    const { email, password } = data;
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      navigation.navigate('MainAppBottomTabs');
      console.log(JSON.stringify(userCredential, null, 2));
      dispatch(setUserData(userCredential.user));
    } catch (error: any) {
      console.log('Sign-in error:', error);
      let errorMessage = '';
      console.log(error.code);
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Wrong email or password';
      } else {
        errorMessage = 'An error occurred during sign-in';
      }

      showMessage({
        type: 'danger',
        message: errorMessage,
      });
    }
  };
  return (
    <AppSaveViews style={styles.container}>
      <Image source={IMAGES.applogo} style={styles.logo} />
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
      />

      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <AppText style={styles.appName} variant="bold">
        Smart Ecommerce
      </AppText>
      <AppButton title="Login" onPress={handleSubmit(onLoginPress)} />
      <AppButton
        title="Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')}
        style={styles.registorButton}
        textColor={AppColors.primary}
      />
      {/* <FlashMessage position="top" /> */}
    </AppSaveViews>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
    marginTop: vs(50),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  registorButton: {
    marginTop: vs(15),
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
});
