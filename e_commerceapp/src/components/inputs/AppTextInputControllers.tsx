import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  Control,
  Controller,
  Field,
  FieldValue,
  FieldValues,
  Path,
} from 'react-hook-form';
import AppTextInput from './AppTextInput';
import AppText from '../texts/AppText';
import { AppColors } from '../../styles/colors';
import { s, vs } from 'react-native-size-matters';

interface AppTextInputControllersProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
}

const AppTextInputControllers = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType,
}: AppTextInputControllersProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <AppTextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={error && styles.errorInput}
          />
          {error && <AppText style={styles.textError}>{error.message}</AppText>}
        </>
      )}
    />
  );
};

export default AppTextInputControllers;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: AppColors.redColor,
  },
  textError: {
    borderColor: AppColors.redColor,
    fontSize: s(12),
    textAlign: 'center',
    marginBottom: -vs(10),
  },
});
