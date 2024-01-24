import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet, Dimensions} from 'react-native';
import {getBranding} from '../../branding';

const screenDimensions = Dimensions.get('screen');
var branding = getBranding()

export const styles = StyleSheet.create({
  box: {
    backgroundColor: branding?.colors?.backgroundSecondary,
    height: screenDimensions.height / 8,
    width: screenDimensions.width / 1.2,
    borderRadius: 4,
    marginBottom: 4,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: branding?.colors?.textDefault,
  },
  tinyLogo: {
    width: 40,
    height: 30,
    objectFit: 'contain',
    marginRight: 10,
  },
  checkedIcon: {
    backgroundColor: 'transparent',
  },
  containerCheckbox: {
    backgroundColor: branding?.colors?.backgroundSecondary,
    borderRadius: 50,
  },
  wrapper: {
    color: 'red',
  },
  error: {
    color: branding?.colors?.danger,
    fontSize: 20,
  },
  loadingContainer: {
    height: '50%',
  },
  loading: {
    color: branding?.colors?.textDefault,
  },
});
