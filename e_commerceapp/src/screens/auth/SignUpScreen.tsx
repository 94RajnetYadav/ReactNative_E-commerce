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
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppTextInputController from '../../components/inputs/AppTextInputControllers';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

const schema = yup
  .object({
    userName: yup
      .string()
      .required('User name is required')
      .min(5, 'User name must be 5 characters'),
    email: yup.string().email('Email is wrong').required('Email is required'),
    password: yup
      .string()
      .required('Password is wrong')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

// 3- Define the type
type FormData = yup.InferType<typeof schema>;

const SignUpScreen = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<any>();
  const auth = getAuth();

  const onSignUpPress = async (data: FormData) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'User account created successfully!');
      navigation.navigate('MainAppBottomTabs');
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <AppSaveViews style={styles.container}>
      <Image source={IMAGES.applogo} style={styles.logo} />
      <AppTextInputController<FormData>
        name="userName"
        control={control}
        placeholder="User Name"
        // onChangeText={setUserName}
      />
      <AppTextInputController<FormData>
        name="email"
        control={control}
        placeholder="Email"
        // onChangeText={setEmail}
      />
      <AppTextInputController<FormData>
        name="password"
        control={control}
        secureTextEntry
        placeholder="Password"
        // onChangeText={setPassword}
      />
      <AppText style={styles.appName} variant="bold">
        Smart Ecommerce
      </AppText>

      <AppButton
        title="Create New Account"
        onPress={handleSubmit(onSignUpPress)} // ✅ Correct usage
      />

      <AppButton
        title="Go To Sign In"
        onPress={() => navigation.navigate('SignInScreen')}
        style={styles.signInButton}
        textColor={AppColors.primary}
      />
    </AppSaveViews>
  );
};

export default SignUpScreen;

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
  signInButton: {
    marginTop: vs(15),
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
});
