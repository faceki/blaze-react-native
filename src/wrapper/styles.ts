import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';
import  { getBranding } from '../branding';

const {height, width} = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight ?? 0;

const availableHeight = height - statusBarHeight;

const containerHeight = Platform.OS === 'ios' ? availableHeight / 1.1 : height;

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
  mainContainer: {
    height: containerHeight,
    padding: 24,
    overflowY: 'scroll',
    display: 'flex',
    position: 'relative',
    backgroundColor: getBranding().colors.background,
    width: Dimensions.get('screen').width / 1,
  },
  contentHeader: {
    // maxHeight: containerHeight,
    backgroundColor: 'red',
  },
  cameraContainer: {
    height: Dimensions.get('screen').height / 1.04,
    overflowY: 'scroll',
    display: 'flex',
    position: 'relative',
    backgroundColor: getBranding().colors.background,
    width: Dimensions.get('screen').width / 1,
  },
});
