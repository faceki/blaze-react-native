import {Pressable, View, Image, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import branding from '../../branding';
const LOGO = '../../assets/f-logo.png';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {globalStyles} from '../../../globalStyles';

type FooterProps = {
  onPress: () => void;
  buttonText: (step: number) => any;
  userStep: number;
  logoURL?: string;
};

/**
 * A component for displaying the footer of the user verification process, including the logo and a button for navigating to the next step.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onPress - A function that handles the navigation to the next step.
 * @param {Function} props.buttonText - A function that returns the text for the navigation button based on the current verification step.
 * @param {number} props.userStep - The current step in the user verification process.
 * @param {string} props.logoURL - The URL for the logo image to display in the footer.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

const Footer = ({onPress, buttonText, userStep, logoURL}: FooterProps) => {
  const text = buttonText(userStep);
  return (
    <>
      {userStep === 10 && (
        <Image
          resizeMode="contain"
          style={styles.tinyLogo}
          source={require(LOGO)}
        />
      )}
      {userStep !== 10 && userStep !== 11 && userStep !== 12 && (
        <View style={styles.row}>
          <Image
            style={styles.tinyLogo}
            source={
              logoURL
                ? {
                    uri: logoURL,
                  }
                : require(LOGO)
            }
            resizeMode="contain"
          />

          {text ? (
            <Pressable
              onPress={onPress}
              style={({pressed}) =>
                pressed ? [styles.cta, styles.opacity] : styles.cta
              }>
              <Text style={[styles.ctaText, globalStyles.textRegular]}>
                {text}
              </Text>
              <AntDesignIcon
                name="right"
                size={20}
                color="white"
                style={styles.icon}
              />
            </Pressable>
          ) : (
            <View />
          )}
        </View>
      )}
    </>
  );
};

export default Footer;
