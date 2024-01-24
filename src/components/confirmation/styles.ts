import {StyleSheet} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    paddingBottom: 20,
    color: getBranding().colors.textDefault,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'center',
    color: getBranding().colors.textDefault,
  },
  icon: {
    paddingBottom: 20,
  },
});
