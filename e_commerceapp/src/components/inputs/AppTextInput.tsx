import { StyleSheet, TextInput, TextStyle } from 'react-native';
import React, { FC } from 'react';
import { vs, s } from 'react-native-size-matters';
import { AppColors } from '../../styles/colors';

interface AppTextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: TextStyle;
  placeholderTextColor?: string;
}
const AppTextInput: FC<AppTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
  placeholderTextColor = AppColors.borderColor,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    height: vs(40),
    borderColor: AppColors.borderColor,
    borderWidth: 1,
    borderRadius: vs(25),
    paddingHorizontal: s(15),
    backgroundColor: AppColors.white,
    fontSize: s(16),
    width: '100%',
    marginTop: vs(10),
  },
});
