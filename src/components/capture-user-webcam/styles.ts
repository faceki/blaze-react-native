import {StyleSheet, Dimensions} from 'react-native';
// import branding from '../../branding';
import { getBranding } from '../../branding';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  column: {
    display: 'flex',
    alignItems: 'center',
  },
  brick: {
    backgroundColor: getBranding().colors.primary,
    width: width / 2.5,
    height: height / 24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brickText: {
    color: getBranding().colors.background,
  },
  borderCamera: {
    borderColor: 'lightgray',
    borderWidth: 4,
  },
  border: {
    width: width / 1.13,
    height: height / 2.3,
  },
  cameraSubtitles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  heading: {
    color: getBranding().colors.textDefault,
  },
  subheading: {
    color: getBranding().colors.primary,
  },
  buttonContainer: {
    display: 'flex',
    width: width / 1.1,
    height: height / 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flipButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    backgroundColor: getBranding().colors.backgroundCaptureBtn,
    width: 70,
    height: 70,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: getBranding().colors.primary,
    borderWidth: 1,
  },
  right: {
    width: width / 6,
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
    zIndex:999
  },
  buttonRow: {
    flexDirection: 'row', // Arrange buttons horizontally
    alignItems: 'center', // Center buttons vertically
  },

  flipButtonWrapper: {
    marginRight: 0, // Adjust the margin to control the gap to the right of the "Flip" button
    opacity:0
  },

  captureButtonWrapper: {
    marginLeft: 'auto', // Push the "Capture" button to the right edge
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
    zIndex:9999
  },


  


});
