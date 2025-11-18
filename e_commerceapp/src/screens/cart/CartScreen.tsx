import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import AppSaveViews from '../../components/views/AppSaveViews';
import HomeHeader from '../../components/header/HomeHeader';
// import EmptyCart from './EmptyCart';
import CartItems from '../../components/cart/CartItems';
import TotalView from '../../components/cart/TotalView';
import { products } from '../../data/products';
import { sharedPaddingHorizontal } from '../../styles/sharedStyles';
import AppButton from '../../components/buttons/AppButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  removeItemFromCart,
  removeProductFromCart,
  addItemsTocart,
} from '../../store/reducers/cartSlice';
import { shippingFees, taxes } from '../../constants/constants';
import EmptyCart from './EmptyCart';

const CartScreen = () => {
  const navigation = useNavigation();
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  const totalProducesPricesSum = items.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalProducesPricesSum + shippingFees + taxes;
  // console.log(items);

  return (
    <AppSaveViews>
      <HomeHeader />

      {items.length > 0 ? (
        <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
          <FlatList
            data={items}
            keyExtractor={items => items.id.toString()}
            renderItem={({ item }) => {
              return (
                <CartItems
                  {...item}
                  price={item.sum}
                  onReducePress={() => dispatch(removeItemFromCart(item))}
                  onIncreasePress={() => {
                    dispatch(addItemsTocart(item));
                  }}
                  onDeletePress={() => {
                    dispatch(removeProductFromCart(item));
                  }}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <TotalView
            ItemPrice={totalProducesPricesSum}
            orderTotal={orderTotal}
          />
          <AppButton
            title="Continue"
            onPress={() => navigation.navigate('CheckoutScreen')}
          />
        </View>
      ) : (
        <EmptyCart />
      )}
    </AppSaveViews>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
