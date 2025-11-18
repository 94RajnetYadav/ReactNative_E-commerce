import { StyleSheet, View } from 'react-native';
import React from 'react';
import { s, vs } from 'react-native-size-matters';
import AppText from '../../components/texts/AppText';
import { AppColors } from '../../styles/colors';
import { FC } from 'react';
import { shippingFees, taxes } from '../../constants/constants';

interface ItotalView {
  ItemPrice: number;
  orderTotal: number;
}

const TotalView: FC<ItotalView> = ({ ItemPrice, orderTotal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppText>Items Price:</AppText>
        <AppText style={styles.textPrice}>${ItemPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Taxes:</AppText>
        <AppText style={styles.textPrice}>$ {taxes}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Shipping Fee:</AppText>
        <AppText style={styles.textPrice}>$ {shippingFees}</AppText>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Order Total:</AppText>
        <AppText style={styles.textPrice}>$ {orderTotal}</AppText>
      </View>
    </View>
  );
};

export default TotalView;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 8,
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(10),
  },
  textTitle: {
    fontSize: s(16),
  },
  textPrice: {
    fontSize: s(16),
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: AppColors.blueGray,
    marginVertical: vs(5),
  },
});
