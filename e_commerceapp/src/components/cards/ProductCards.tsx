import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { s, vs } from 'react-native-size-matters';
import { AppColors } from '../../styles/colors';
import AppText from '../texts/AppText';
import { AppFonts } from '../../styles/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { commonStyles } from '../../styles/sharedStyles';
import { FC } from 'react';

interface IProductCard {
  onAddToCartPress: () => void;
  imageURL: string;
  title: string;
  price: number;
}

const ProductCards: FC<IProductCard> = ({
  onAddToCartPress,
  imageURL,
  title,
  price,
}) => {
  return (
    <View style={styles.container}>
      {/* Add To Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={onAddToCartPress}
      >
        <Ionicons name="cart" size={s(15)} color={AppColors.white} />
      </TouchableOpacity>
      {/* Image UI */}
      <View style={styles.ImageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageURL,
          }}
        />
      </View>
      {/* Details */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>{price}$</AppText>
      </View>
    </View>
  );
};

export default ProductCards;

const styles = StyleSheet.create({
  container: {
    width: s(160),
    height: vs(190),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  ImageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    paddingTop: s(8),
    paddingBottom: vs(8),
    paddingHorizontal: s(10),
  },
  titleText: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(7),
  },
  addToCartButton: {
    height: s(28),
    width: s(28),
    position: 'absolute',
    left: 5,
    top: 5,
    bottom: vs(10),
    borderRadius: s(20),
    backgroundColor: AppColors.primary,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
