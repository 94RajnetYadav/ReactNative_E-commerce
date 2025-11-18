import { Platform, StatusBar } from 'react-native';

export const IS_Android = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'
export const STATUSBAR_HEIGHT = IS_Android ? StatusBar.currentHeight || 0 : 0

export const APP_HORIZONTAL_PADDING = 20
export const APP_VERTICAL_PADDING = 10

export const BASE_URL = 'https://fakestoreapi.com'

export const taxes = 15
export const shippingFees = 10