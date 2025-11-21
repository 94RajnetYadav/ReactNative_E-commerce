// ✅ Import Firestore
import firestore from '@react-native-firebase/firestore';
import { store } from '../store/store';
import { getAuth } from '@react-native-firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export const getProductsData = async () => {
  try {
    const querySnapshot = await firestore().collection('products').get();

    const list: any[] = [];

    querySnapshot.forEach(doc => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    console.error('Error fetching products data: ', error);
  }
};

export const fetchUserOrders = async () => {
  try {
    const auth = getAuth();
    const userIdFromRedux = store.getState().userSlice.userData.uid;
    const userIdFromFireBase = auth.currentUser?.uid;

    const userId = userIdFromFireBase || userIdFromRedux;

    if (!userId) {
      console.log('❌ No user ID found');
      return [];
    }

    const userOrdersRef = firestore()
      .collection(`users/${userId}/orders`)
      .get();

    const querySnapshot = await getDocs(userOrdersRef);

    const orderList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orderList;
  } catch (error) {
    console.error('error fetching orders', error);
  }
};
