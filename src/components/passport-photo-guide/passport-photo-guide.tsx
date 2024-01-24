import {Image, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {getBranding} from '../../branding';
const LOGO = '../../assets/ex-id-card.png';

const PassportPhotoGuide = () => {
  return (
    <View style={styles.container}>
      {getBranding().images?.card_guidance ? (
        <Image
          style={styles.image}
          source={{uri: getBranding().images?.card_guidance}}
        />
      ) : (
        <Image style={styles.image} source={require(LOGO)} />
      )}
    </View>
  );
};

export default PassportPhotoGuide;
