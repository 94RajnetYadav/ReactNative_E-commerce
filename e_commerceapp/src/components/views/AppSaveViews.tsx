import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import React, { FC } from 'react';
import { AppColors } from '../../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppSaveViewsProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const AppSaveViews: FC<AppSaveViewsProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.saveArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSaveViews;

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: AppColors.white,
  },

  container: {
    flex: 1,
    flexDirection: 'column',

    backgroundColor: AppColors.white,
  },
});
