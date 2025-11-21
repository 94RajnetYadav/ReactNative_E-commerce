import { StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppSaveViews from '../../components/views/AppSaveViews';
import HomeHeader from '../../components/header/HomeHeader';
import ProductCards from '../../components/cards/ProductCards';
import { FlatList } from 'react-native-gesture-handler';
import { vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { addItemsTocart } from '../../store/reducers/cartSlice';
import { getProductsData } from '../../config/dataServices';

// ✅ Import Firestore
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const dispatch = useDispatch();

  // ✅ Local state for products
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getProductsData();
      console.log(data);
      setProducts(data ?? []);
    } catch (error) {
      console.log(error);
      console.error('❌ Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <AppSaveViews style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </AppSaveViews>
    );
  }

  return (
    <AppSaveViews>
      <HomeHeader />
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <ProductCards
            imageURL={item.imageURL}
            title={item.title}
            price={item.price}
            onAddToCartPress={() => {
              dispatch(addItemsTocart(item));
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: vs(10) }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: vs(10),
        }}
      />
    </AppSaveViews>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mediumText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 18,
  },
  boldText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
  },
});
