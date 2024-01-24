import {StyleSheet, Dimensions} from 'react-native';
import { getBranding } from '../../branding';

export const styles = StyleSheet.create({
  tinyLogo: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2.6,
    objectFit: 'contain',
    // transform: [{scale: 0.5}], // Scale the image down by 50%
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: getBranding().colors.textDefault,
    fontSize: 26,
    fontFamily:  getBranding().colors.fontRegular,
  },
  subHeading: {
    color: getBranding().colors.textSecondary,
    fontSize: 12,
    fontFamily: getBranding().colors.fontRegular,
    fontWeight: '100',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 4,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    marginLeft: 4,
  },
  activecircle: {
    backgroundColor: getBranding().colors.primary,
  },
  inactivecircle: {
    backgroundColor: ""
  },
  column: {
    display: 'flex',
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2.2,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});
