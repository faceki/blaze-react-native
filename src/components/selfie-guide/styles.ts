import {StyleSheet, Dimensions} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';


const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  image: {
    height: height / 2.5,
    width: width / 1.2,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoContainer: {
    paddingLeft: 30,
  },
  infoHeading: {
    fontSize: 16,
    color: getBranding().colors.primary,
    paddingBottom: 12,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoSubHeading: {
    fontSize: 14,
    paddingLeft: 12,
    color: getBranding().colors.textDefault,
  },
});
