import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet, Dimensions} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

const screenDimensions = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  boxText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  boxTextLight: {
    fontSize: 12,
    color: getBranding().colors.textDefault,
  },
  box: {
    backgroundColor: getBranding().colors.backgroundSecondary,
    height: screenDimensions.height / 18,
    width: screenDimensions.width / 1.16,
    borderRadius: 4,
    margin: 0,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  lign: {

    height: screenDimensions.height / 10,
    width: 3,
    borderRadius: 3,
  },
  bullet: {
    fontFamily: getBranding().colors.fontRegular,
    fontSize: 17,
    color: getBranding().colors.textDefault,
  },
  topMargin: {
    paddingTop: 33,
    paddingRight: 12,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width / 1.4,
  },
  checkbox: {},
  transparent: {
    backgroundColor: 'transparent',
  },
  subHeading: {
    fontSize: 12,
    color: getBranding().colors.textDefault,
  },
  note: {
    color: getBranding().colors.primary,
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 56,
    marginTop: 22,
    marginBottom: 12,
  },
  black: {
    color: getBranding().colors.textDefault,
    textDecorationLine: 'none',
  },
});
