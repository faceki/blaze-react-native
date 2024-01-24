import {Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import branding, {getBranding} from '../../branding';
import {styles} from './styles';
import {globalStyles} from '../../../globalStyles';
import LottieView from 'lottie-react-native';

type props = {
  finalResult:
    | {
        heading: string;
        subText: string;
        success: boolean;
      }
    | undefined;
};

/**
 * A component for displaying the final result of the user verification process.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.finalResult - An object containing the icon, heading, subtext, and success status of the final result.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

const Confirmation = ({finalResult}: props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      {finalResult?.success && (
        <LottieView
          source={require('../../assets/jsons/lottieSuccess.json')}
          autoPlay
          loop
          style={{flex: 1, maxHeight: 400}}
        />
      )}
      {!finalResult?.success && (
        <LottieView
          source={require('../../assets/jsons/lottieFail.json')}
          autoPlay
          loop
          style={{flex: 1, maxHeight: 400}}
        />
      )}
      <Text
        style={[
          styles.heading,
          globalStyles.textRegular,
          {
            fontFamily: getBranding().colors.fontRegular,

            color: getBranding().colors.textDefault,
          },
        ]}>
        {[finalResult?.heading]}
      </Text>
      <Text
        style={[
          styles.subHeading,
          globalStyles.textRegular,
          {
            fontFamily: getBranding().colors.fontRegular,

            color: getBranding().colors.textDefault,
          },
        ]}>
        {[finalResult?.subText]}
      </Text>
    </View>
  );
};

export default Confirmation;
