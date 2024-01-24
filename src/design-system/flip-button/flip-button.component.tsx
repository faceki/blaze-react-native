import {Pressable, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../../../globalStyles';
import {styles} from './style';
// import branding from '../../branding';
import { getBranding } from '../../branding';

type props = {
  onClick: () => void;
};

const FlipButton = ({onClick}: props) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed ? [styles.flipButton, styles.opacity] : styles.flipButton
      }
      onPress={onClick}>
      <Icon
        name="camera-reverse"
        size={32}
        // color={getBranding().colors.textDefault}
        color={"white"}
      />
      <Text style={[styles.flipCamera, globalStyles.textRegular,{color:"white"}]}>
        Flip Camera
      </Text>
    </Pressable>
  );
};

export default FlipButton;
