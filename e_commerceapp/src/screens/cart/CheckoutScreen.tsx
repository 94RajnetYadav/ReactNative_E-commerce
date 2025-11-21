import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  commonStyles,
  sharedPaddingHorizontal,
} from '../../styles/sharedStyles';
import { s, vs } from 'react-native-size-matters';
import { AppColors } from '../../styles/colors';
import AppSaveViews from '../../components/views/AppSaveViews';
import AppTextInputControllers from '../../components/inputs/AppTextInputControllers';
import AppButton from '../../components/buttons/AppButton';
import { IS_Android, taxes, shippingFees } from '../../constants/constants';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import firestore, {
  addDoc,
  collection,
} from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../store/reducers/cartSlice';

// ✅ Validation schema
const schema = Yup.object({
  fullName: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),

  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Phone number must be at least 10 digits'),

  detailedAddress: Yup.string()
    .required('Address is required')
    .min(15, 'Please provide a detailed address with at least 15 characters'),
}).required();

type FormData = Yup.InferType<typeof schema>;
const CheckoutScreen = () => {
  // ✅ Include errors in formState
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();
  const { userData } = useSelector((state: RootState) => state.userSlice);
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  const totalProductsPricesSum = items.reduce((acc, item) => acc + item.sum, 0);
  const totalPrices = totalProductsPricesSum + taxes + shippingFees;
  console.log('=================userData===================');
  console.log(JSON.stringify(userData));
  console.log('=================userData===================');

  const saveOrder = async (formData: FormData) => {
    try {
      const orderBody = {
        ...formData,
        items,
        totalProductsPricesSum,
        createdAt: new Date(),
        totalPrices: totalPrices,
      };
      const userOrderRef = firestore()
        .collection('users')
        .doc(userData.uid)
        .collection('orders');
      // const orderRef =
      await addDoc(userOrderRef, orderBody);
      const ordersRef = firestore().collection('orders');
      await addDoc(ordersRef, orderBody);

      Alert.alert('Success', 'Order placed successfully', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      navigation.goBack();
      dispatch(emptyCart());
      console.log('✅ Form Submitted:', formData);
    } catch (error) {
      console.error('Error saving order: ', error);
      Alert.alert(
        'Error',
        'There was an error placing your order. Please try again later.',
      );
    }
  };

  return (
    <AppSaveViews>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          {/* Full Name */}
          <AppTextInputControllers
            control={control}
            name="fullName"
            placeholder="Full Name"
            // error={errors.fullName?.message}
          />

          {/* Phone Number */}
          <AppTextInputControllers
            control={control}
            name="phoneNumber"
            placeholder="Phone Number"
            // error={errors.phoneNumber?.message}
            // keyboardType="number-pad"
          />

          {/* Detailed Address */}
          <AppTextInputControllers
            control={control}
            name="detailedAddress"
            placeholder="Detailed Address"
            // error={errors.detailedAddress?.message}
            // multiline
          />
        </View>
      </View>

      {/* Confirm Button */}
      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSaveViews>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: vs(15),
    paddingBottom: vs(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: 'absolute',
    width: '100%',
    bottom: IS_Android ? vs(15) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
  },
});
