import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet, Dimensions} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

const {height, width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: getBranding().colors.dark,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: getBranding().colors.light,
    fontSize: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
});
