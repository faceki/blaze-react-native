import {View, Text, Animated} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';
import {globalStyles} from '../../../globalStyles';

const LoadingLogo = '../../assets/logoLoading.png';

/**
 * A component for displaying a loading animation with a logo and text.
 *
 * @param {Object} props - The component props.
 * @param {string} props.loadingURL - The URL for the image to display in the loading animation.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

type props = {
  loadingURL?: string;
};

const Loading = ({loadingURL}: props) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={loadingURL ? {uri: loadingURL} : require(LoadingLogo)}
        style={[
          styles.logo,
          {
            transform: [{scale: scaleValue}],
          },
        ]}
        resizeMode="contain"
      />
      <Text style={[styles.loadingText, globalStyles.textMedium]}>
        Loading...
      </Text>
    </View>
  );
};

export default Loading;
