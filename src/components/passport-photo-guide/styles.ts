import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet, Dimensions} from 'react-native';
import branding from '../../branding';

const {height, width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  image: {
    height: height / 1.6,
    width: width / 1.1,
    objectFit: 'contain',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
