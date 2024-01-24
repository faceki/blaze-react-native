import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import CaptureButton from '../../design-system/capture-button/capture-button.component';
import FlipButton from '../../design-system/flip-button/flip-button.component';
import {globalStyles} from '../../../globalStyles';
import {getBranding} from '../../branding';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Camera,
  frameRateIncluded,
  useCameraDevices,
} from 'react-native-vision-camera';

type props = {
  webcamRef: React.MutableRefObject<any>;
  userStep: number;
  findOutStepContent: () => {
    step: number;
    heading: string;
    subHeading: string;
  };
  goBackUserSteps: (index?: number) => void;
  handlerUserSteps: () => void;
  buttonText: (userStep: number) => any;
  handleSingleCapturePhoto: (step: number) => void;
  skipGuidanceScreens?: boolean;
};

/**
 * A component for capturing a selfie using the device's camera.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.webcamRef - A mutable ref object for accessing the camera component.
 * @param {string} props.cameraMode - The type of camera to use (front or back).
 * @param {number} props.userStep - The current step in the user verification process.
 * @param {Function} props.findOutStepContent - A function that returns an object with the heading and subheading text for the current verification step.
 * @param {Function} props.goBackUserSteps - A function that allows the user to go back to the previous verification step.
 * @param {Function} props.handlerUserSteps - A function that handles the user's progress through the verification steps.
 * @param {Function} props.buttonText - A function that returns the text to display on the footer button based on the current verification step.
 * @param {Function} props.handleSingleCapturePhoto - A function that handles capturing a single photo for the current verification step.
 * @param {Function} props.flipCamera - A function that switches between the front and back camera.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

const CaptureSelfie = ({
  webcamRef,
  userStep,
  findOutStepContent,
  goBackUserSteps,
  handlerUserSteps,
  buttonText,
  handleSingleCapturePhoto,
  skipGuidanceScreens,
}: props) => {
  const devices: any = useCameraDevices();
  const [device, setDevice] = useState(devices.front);

  useEffect(() => {
    if (devices) {
      setDevice(devices.front);
    }
  }, [devices]);

  const flipCamera = () => {
    if (device == devices.front) {
      setDevice(devices.back);
    } else {
      setDevice(devices.front);
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera Screen */}
      {device && (
        <Camera
          style={[styles.camera]}
          device={device}
          isActive={true}
          ref={webcamRef}
          photo={true}
          video={true}
        />
      )}

      {/* Oval Screen */}
      <View style={styles.blurredContainer} />
      {/* Content Screen */}
      <View style={[styles.absoluteContainer, StyleSheet.absoluteFill]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {
              skipGuidanceScreens ? goBackUserSteps(2) : goBackUserSteps();
            }}
            // style={({ pressed }) => pressed && styles.opacity}
          >
            <Icon
              name="arrow-back"
              size={30}
              color={'white'}
              style={{marginTop: 10}}
            />
          </Pressable>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text
              style={[
                styles.heading,
                globalStyles.textMedium,
                {
                  color: getBranding().colors.primary,
                },
              ]}>
              {findOutStepContent()?.heading}
            </Text>
            <Text style={[globalStyles.textMedium, {color: 'white'}]}>
              {findOutStepContent()?.subHeading}
            </Text>
          </View>

          <Pressable style={({pressed}) => pressed && styles.opacity}>
            <Icon
              name="information-circle-outline"
              size={30}
              style={{opacity: 0}}
              // color={getBranding().colors.textDefault}
            />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.footer}>
            <Footer
              onPress={handlerUserSteps}
              buttonText={buttonText}
              userStep={userStep}
            />
          </View>
          <View style={styles.centerContainer}>
            <CaptureButton onClick={() => handleSingleCapturePhoto(userStep)} />
            <Text
              style={[
                styles.selfieHeading,
                globalStyles.textRegular,
                {color: 'white'},
              ]}>
              Take a selfie
            </Text>
            <Text style={[styles.selfieSubHeading, globalStyles.textMedium]}>
              More about face verification
            </Text>
          </View>
          <View style={styles.right}>
            <FlipButton onClick={flipCamera} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CaptureSelfie;
