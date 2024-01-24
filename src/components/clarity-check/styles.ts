import { StyleSheet, Dimensions } from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  border: {
    borderColor: 'lightgray',
    borderWidth: 4,
  },
  tinyLogo: {
    width: width / 1.13,
    height: height / 2.3,
  },
  cta: {
    backgroundColor: getBranding().colors.buttonColor,
    width: width / 2,
    height: 50,
    borderRadius: 4,
    borderColor: getBranding().colors.primary,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retake: {
    width: width / 2,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    color: getBranding().colors.primary,
    textTransform: 'uppercase',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  retakeButtonText: {
    color: getBranding().colors.textDefault,
  },
  opacity: {
    opacity: 0.3,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%', // Take up the full width of the Camera
    height: '100%', // Take up the full height of the Camera
    alignItems: 'center', // Center the overlay content horizontally
    justifyContent: 'center', // Center the overlay content vertically
  },

  overlayImage: {
    width: '100%', // Adjust the width of the overlay image as needed
    height: '100%', // Adjust the height of the overlay image as needed
    // You can add more styles like borderRadius, opacity, etc., as needed
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: '30%', // Adjust this value to control the vertical spacing
    left: 0,
    right: 0,
    alignItems: 'center', // Center the button horizontally
    zIndex: 999
  },
  buttonRow: {
    flexDirection: 'column', // Arrange buttons horizontally
    alignItems: 'center', // Center buttons vertically
  },
  topContent: {
    flex: 1, // Takes up the top portion of the screen
    alignItems: 'flex-start', // Align content to the top
    padding: 20, // Add padding to adjust spacing,
  
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // marginBottom: 16,
    flexDirection: 'row',
    zIndex:996
  },


});
