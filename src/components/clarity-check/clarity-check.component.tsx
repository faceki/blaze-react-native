import {View, Image, Pressable, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {ImgUrlsType} from '../../provider/verification.context';
import {globalStyles} from '../../../globalStyles';
import overlayImage from '../../assets/faceki-overlay-camera.png';
import Icon from 'react-native-vector-icons/Ionicons';
// import branding from '../../branding';
import {Platform} from 'react-native';
import { getBranding } from '../../branding';

type props = {
  imgUrls: ImgUrlsType;
  selectedOption: string;
  routeOfHandler: () => void;
  goBackUserSteps: (index?: number) => void;
  userStep: number;
  skipGuidanceScreens?: boolean;
  findOutStepContent: () => {
    step: number;
    heading: string;
    subHeading: string;
  };
};

/**
 * A component for displaying an image captured by the user and allowing the user to confirm or retake the photo.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.imgUrls - An object containing the image URLs for the front and back of the ID card and the user's selfie.
 * @param {string} props.selectedOption - The currently selected option for the ID card type.
 * @param {Function} props.routeOfHandler - A function that handles the user's confirmation of the photo.
 * @param {Function} props.goBackUserSteps - A function that allows the user to go back to the previous verification step.
 * @param {number} props.userStep - The current step in the user verification process.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

const ClarityCheck = ({
  imgUrls,
  selectedOption,
  routeOfHandler,
  goBackUserSteps,
  userStep,
  skipGuidanceScreens,
  findOutStepContent,
}: props) => {
  let userImage =
    userStep === 8
      ? imgUrls[selectedOption].backImage
      : imgUrls[selectedOption].frontImage;

  // when i need to test selfie image only
  if (userStep === 10) {
    userImage = imgUrls[selectedOption].selfie;
  }

  return (
    <>
      <View style={styles.overlayContainer}>
        <Image
          source={{
            uri: Platform.OS == "android" ?  'file://' + userImage.path : userImage.path,
          }}
          style={styles.overlayImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.overlayContainer}>
        <Image
          source={overlayImage}
          style={styles.overlayImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.topContent}>
        <Pressable
          onPress={() => {
            skipGuidanceScreens && userStep != 7
              ? goBackUserSteps(2)
              : goBackUserSteps();
          }}
          style={({pressed}) => pressed && styles.opacity}>
          <Icon name="arrow-back" size={30} color={'white'} />
        </Pressable>

        <View style={{alignItems: 'center'}}>
          <Text
            style={[
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
          <Text
            style={[
              globalStyles.textMedium,
              {color: getBranding().colors.primary, marginTop: 30},
            ]}>
            {userStep === 7 ? 'BACK SIDE' : 'FRONT SIDE'}
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

      <View style={styles.captureButtonContainer}>
        <View style={styles.buttonRow}>
          <Pressable
            style={({pressed}) =>
              pressed ? [styles.cta, styles.opacity] : styles.cta
            }
            onPress={routeOfHandler}>
            <Text style={[styles.ctaText, globalStyles.textMedium]}>
              Looks Good
            </Text>
          </Pressable>
          <Pressable
            style={({pressed}) =>
              pressed ? [styles.retake, styles.opacity] : styles.retake
            }
            onPress={() => {
              goBackUserSteps();
            }}>
            <Text
              style={[
                styles.retakeButtonText,
                globalStyles.textMedium,
                {color: 'white'},
              ]}>
              Retake the photo
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ClarityCheck;
