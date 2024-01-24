import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
// import branding from '../../branding';
import {globalStyles} from '../../../globalStyles';
import { getBranding } from '../../branding';


const LOGO = '../../assets/logo.png';

type props = {
  userStep: number;
  findOutStepContent: () => {
    step: number;
    heading: string;
    subHeading: string;
  };
  goBackUserSteps: (index?: number) => void;
  allowSingle: boolean;
  skipFirstScreen?: boolean;
};

/**
 * A component for displaying the header of the user verification process, including the logo, heading, subheading, and navigation buttons.
 *
 * @param {Object} props - The component props.
 * @param {number} props.userStep - The current step in the user verification process.
 * @param {Function} props.findOutStepContent - A function that returns the content (heading and subheading) for the current step.
 * @param {Function} props.goBackUserSteps - A function that allows the user to go back to the previous verification step.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

function Header({
  userStep,
  findOutStepContent,
  goBackUserSteps,
  allowSingle,
  skipFirstScreen,
}: props) {
  return (
    <>
      {userStep !== 10 && userStep !== 11 && userStep !== 12 && (
        <>
          {userStep === 1 && (
            <View style={styles.center}>
              {/* <Image style={styles.tinyLogo} source={require(LOGO)} /> */}
              <Text style={[styles.heading, globalStyles.textMedium]}>
                {findOutStepContent()?.heading}
              </Text>
            </View>
          )}
          {userStep !== 1 && (
            <View style={styles.container}>
              <Pressable
                onPress={() => {
                  if (userStep == 3 && !allowSingle) {
                    goBackUserSteps(2);
                  } else {
                    goBackUserSteps();
                  }
                }}
                style={({pressed}) => pressed && styles.opacity}>
                {!((userStep == 2 || userStep == 3) && skipFirstScreen) && (
                  <Icon
                    name="arrow-back"
                    size={30}
                    color={getBranding().colors.textDefault}
                  />
                )}
              </Pressable>

              <View>
                {userStep === 1 && (
                  <Image style={styles.tinyLogo} source={require(LOGO)} />
                )}

                <Text style={[styles.heading, globalStyles.textMedium]}>
                  {findOutStepContent()?.heading}
                </Text>
                <Text style={[styles.subHeading, globalStyles.textMedium]}>
                  {findOutStepContent()?.subHeading}
                </Text>
              </View>

              <Pressable style={({pressed}) => pressed && styles.opacity}>
                <Icon
                  name="information-circle-outline"
                  size={30}
                  style={{opacity: 0}}
                  color={getBranding().colors.textDefault}
                />
              </Pressable>
            </View>
          )}
        </>
      )}
    </>
  );
}

export default Header;
