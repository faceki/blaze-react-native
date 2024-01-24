import {StyleSheet, Dimensions} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

const {height, width} = Dimensions.get('screen');
const oval1Width = width * 0.5,
  oval2Width = width * 0.7;

const afterStyles = {
  position: 'absolute',
  borderRadius: '100%',
  height: '100%',
  width: '46%',
  left: '15%',
  top: '16%',
  //   boxShadow: '0px 0px 0px 2000px #ffffffbb',
  boxShadow: '0px 0px 50px 15px rgba(255, 255, 255, 0.7)',
  content: '""',
  zIndex: 3,
  backgroundColor: 'red',
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  blurredContainer: {
    position: 'absolute',
    top: -width / 2 + 100,
    left: -width / 2 + 50,
    right: -width / 2 + 50,
    bottom: -width / 2 + 200,
    backgroundColor: 'transparent',

    borderWidth: width / 2,
    borderRadius: width,
    borderColor: 'black',
    opacity: 0.4,
    height: '115%',
  },

  
  gradientMask: {
    position: 'absolute',
    width: '65%',
    height: '80%',
    zIndex: 100,
    borderRadius: 200,
    backgroundColor: 'red',
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 64,
    display: 'flex',
    justifyContent: 'space-between',
  },
  cameraOval: {
    width: 300,
    height: 300,
    borderRadius: 100,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
  },
  footer: {
    marginRight: 'auto',
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  right: {
    width: width / 5,
  },
  selfieHeading: {
    color: getBranding().colors.textDefault,
  },
  selfieSubHeading: {
    color: getBranding().colors.primary,
  },
  heading: {
    color: getBranding().colors.textDefault,
  },
  subheading: {
    color: getBranding().colors.primary,
  },  opacity: {
    opacity: 0.3,
  },

});
