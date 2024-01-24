import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './style';
import Icon from 'react-native-vector-icons/Ionicons';
// import branding from '../../branding';
import { getBranding } from '../../branding';

type props = {
  onClick: () => void;
};

const CaptureButton = ({onClick}: props) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed ? [styles.captureBtn, styles.opacity] : styles.captureBtn
      }
      onPress={onClick}>
      <Icon name="camera" size={48} color={getBranding().colors.primary} />
    </Pressable>
  );
};

export default CaptureButton;
