import {
  Text,
  View,
  Pressable,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';

import {globalStyles} from '../../../globalStyles';
import CaptureButton from '../../design-system/capture-button/capture-button.component';
import FlipButton from '../../design-system/flip-button/flip-button.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Camera,
  CameraDeviceFormat,
  useCameraDevice,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {getBranding} from '../../branding';
import Spinner from 'react-native-loading-spinner-overlay';
import overlayImage from '../../assets/faceki-overlay-camera.png';
import branding from '../../branding';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const Resizer = require("@bam.tech/react-native-image-resizer")


type props = {
  webcamRef: React.MutableRefObject<any>;
  handleSingleCapturePhoto: (
    step: number,
    image?: any,
    refOverride?: any,
  ) => void;
  userStep: number;
  skipGuidanceScreens?: boolean;
  livenessScoreOverride?: number;
  goBackUserSteps: (index?: number) => void;
  findOutStepContent: () => {
    step: number;
    heading: string;
    subHeading: string;
  };
};

/**
 * A component for capturing an image of the user with the device's camera.
 *
 * @param {Object} props - The component props.
 * @param {string} props.cameraMode - The type of camera to use (front or back).
 * @param {Function} props.flipCamera - A function that switches between the front and back camera.
 * @param {Object} props.webcamRef - A mutable ref object for accessing the camera component.
 * @param {Function} props.handleSingleCapturePhoto - A function that handles capturing a single photo for the current verification step.
 * @param {number} props.userStep - The current step in the user verification process.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */


const CaptureUserWebcam = ({
  webcamRef,
  handleSingleCapturePhoto,
  userStep,
  goBackUserSteps,
  findOutStepContent,
  skipGuidanceScreens,
  livenessScoreOverride,
}: props) => {
  const devices: any = useCameraDevices();
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const [loading, setLoading] = useState(false);
  const tets = useRef<any | null>(null);
  var form: FormData | undefined;

  useEffect(() => {
    async function name() {
      try {
        var te = await tets?.current?.takePhoto?.({
          enableShutterSound: false,
          // enableAutoStabilization: true,
          qualityPrioritization: 'speed',
        });

        if (!te) {
          // console.log('Photo capture failed');

          return;
        }
        if (!te.path) {
          // console.log('Photo capture failed');
          return;
        }

        form = new FormData();
        form.append('image', {
          uri: Platform.OS == 'android' ? 'file://' + te?.path : te?.path,
          type: 'image/jpeg',
          name: `photo_id_back_image.jpg`,
        });

        console.log(te?.path);
      } catch (error) {
        setTimeout(name, Platform.OS == 'android' ? 100 : 1500); // Retry after 700ms
      }

      try {
        const response = await axios.post(
          'https://addon.faceki.com/detect',
          form,
          {
            headers: {'Content-Type': 'multipart/form-data'},
          },
        );
        const objectsDetected = response?.data?.objects_detected?.length;
        console.log(response?.data);

        if (objectsDetected < 1) {
          setTimeout(name, Platform.OS == 'android' ? 100 : 1500); // Retry after 700ms
        } else {
          handleSingleCapturePhoto(userStep, te);
        }
      } catch (error: any) {
        console.error('API request failed:', JSON.stringify(error));
        // Handle the error or retry if needed
        setTimeout(name, Platform.OS == 'android' ? 100 : 1500); // Retry after 700ms
      }
    }
    // setTimeout(() => {
    //   name();
    // }, 3000);
  }, []);

  const HandleCapture = async () => {
    // {userStep === 7 ? 'BACK SIDE' : 'FRONT SIDE'}
    var te = await tets?.current?.takePhoto?.({
      enableShutterSound: false,
      // enableAutoStabilization: true,
      qualityPrioritization: 'speed',
    });

    try {
      let result = await Resizer.default.createResizedImage(
        (Platform.OS === 'android' ? 'file://' : '') + te.path,
        1920,
        1080,
        'JPEG',
        100,
        0,
        undefined,
        false,
        {
          mode: "contain",
          onlyScaleDown:true,
        }
      );
        console.log(result)
        te = result
      // setResizedImage(result);
    } catch (error) {
      console.log(error)
      // Alert.alert('Unable to resize the photo');
    }
  

    // var data =  await  ImageResizer.createResizedImage(
    //   Platform.OS == 'android' ? 'file://' + te?.path : te?.path,
    //   1920,
    //   1080,
    //   'JPEG',
    //     100,
    //     0,
    //     undefined,
    //     false,
    //     {
    //       mode: "contain",
    //       onlyScaleDown:true,
    //     }
    // )
    //   .then((response) => {
    //     // response.uri is the URI of the new image that can now be displayed, uploaded...
    //     // response.path is the path of the new image
    //     // response.name is the name of the new image with the extension
    //     // response.size is the size of the new image
    //     return response;
    //   })
     

    form = new FormData();
    form.append('image', {
      uri: Platform.OS == 'android' ? 'file://' + te?.path : te?.path,
      type: 'image/jpeg',
      name: `photo_id_back_image.jpg`,
    });

    const response = await axios.post(
      'https://addon.faceki.com/advance/detect',
      form,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );

    console.log('Detection Response', response);

    if (
      response.data?.liveness?.livenessScore &&
      response.data?.liveness?.livenessScore > (livenessScoreOverride || 0.7)
    ) {
      setLoading(false);
      handleSingleCapturePhoto(userStep, te);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Please Try Again!',
        text2: 'Captured image unable to pass quality check!',
      });
    }
  };

  return (
    <View key="main" style={{flex: 1}}>
      {/* Camera Screen */}

      {device && (
        <Camera
          style={[styles.overlayContainer, {flex: 1, width: '100%', zIndex: 1}]}
          device={device}
          isActive={true}
          ref={tets}
          photo={true}
          video={true}
        />
      )}

      {/* Overlay Image Screen */}
      <View
        key="imageContain"
        style={[
          styles.overlayContainer,
          {position: 'absolute', top: 0, left: 0, zIndex: 1},
        ]}>
        <Image
          key="overlayImage"
          source={overlayImage}
          style={styles.overlayImage}
          resizeMode="cover"
        />
      </View>
      <Spinner
        visible={loading}
        textContent={'Analyzing...'}
        textStyle={{color: 'white'}}
      />
      {/* Header Component */}

      <View key="topContent" style={styles.topContent}>
        <Pressable
          key={'gobackButton'}
          onPress={() => {
            skipGuidanceScreens && userStep != 7
              ? goBackUserSteps(2)
              : goBackUserSteps();
          }}
          style={({pressed}) => pressed && styles.opacity}>
          <Icon name="arrow-back" size={30} color={'white'} />
        </Pressable>

        <View key={'con'} style={{alignItems: 'center'}}>
          <Text
            key={'heading1'}
            style={[
              styles.heading,
              globalStyles.textMedium,
              {
                color: getBranding().colors.primary,
              },
            ]}>
            {findOutStepContent()?.heading}
          </Text>
          <Text
            key={'heading2'}
            style={[
              styles.subheading,
              globalStyles.textMedium,
              {color: 'white'},
            ]}>
            {findOutStepContent()?.subHeading}
          </Text>
          <Text
            key={'subtitle'}
            style={[
              styles.subheading,
              globalStyles.textMedium,
              {color: getBranding().colors.primary, marginTop: 30},
            ]}>
            {userStep === 7 ? 'BACK SIDE' : 'FRONT SIDE'}
          </Text>
        </View>

        <Pressable
          key={'info'}
          style={({pressed}) => pressed && styles.opacity}>
          <Icon
            name="information-circle-outline"
            size={30}
            style={{opacity: 0}}
          />
        </Pressable>
      </View>

      {/* Footer Component */}

      <View
        key="bottomContent"
        style={[styles.captureButtonContainer, {zIndex: 9999}]}>
        <View style={styles.buttonRow}>
          <View key={'capture'} style={styles.captureButtonWrapper}>
            <CaptureButton
              onClick={() => {
                setLoading(true);
                HandleCapture();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CaptureUserWebcam;
