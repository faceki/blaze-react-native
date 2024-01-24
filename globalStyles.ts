import {StyleSheet} from 'react-native';
import { getBranding } from './src/branding';
getBranding
export const globalStyles = StyleSheet.create({
  textRegular: {
    fontFamily: getBranding().colors.fontRegular,
    // fontWeight: 'bold',
  },
  textMedium: {
    fontFamily:  getBranding().colors.fontMedium,
  },
  textBold: {
    fontFamily:  getBranding().colors.fontBold,
  },
});
