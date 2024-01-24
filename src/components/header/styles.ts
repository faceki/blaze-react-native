import {StyleSheet} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 200,
    height: 100,
    objectFit: 'contain',
  },
  logo: {
    width: 66,
    height: 58,
  },
  heading: {
    fontFamily: getBranding().colors.fontMedium,
    fontSize: 16,
    lineHeight: 58,
    letterSpacing: 0,
    textAlign: 'center',
    color: getBranding().colors.primary,
  },
  subHeading: {
    fontSize: 12,
    letterSpacing: 0,
    textAlign: 'center',
    color: getBranding().colors.textDefault,
  },
  opacity: {
    opacity: 0.3,
  },
});
