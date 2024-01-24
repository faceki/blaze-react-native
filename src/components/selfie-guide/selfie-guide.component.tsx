import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../../../globalStyles';
// import branding from '../../branding';
import { getBranding } from '../../branding';

const selfieGuide = '../../assets/selfieGuide.png';

const SelfieGuide = () => {
  return (
    <>
      <View style={styles.container}>

      {getBranding().images?.selfie_guidance ? (
        <Image
        style={styles.image}
        resizeMode="contain"
          source={{uri: getBranding().images?.selfie_guidance}}
        />
      ) : (
        <Image      style={styles.image}
        resizeMode="contain" source={require(selfieGuide)} />
      )}


     
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.infoHeading, globalStyles.textBold]}>
          For the best scan results
        </Text>
        <View style={styles.row}>
          <Icon
            name="sunny"
            size={20}
            color={getBranding().colors.textDefault}
          />
          <Text style={[styles.infoSubHeading, globalStyles.textMedium]}>
            Find an area with good lighting
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="eye" size={20} color={getBranding().colors.textDefault} />
          <Text style={[styles.infoSubHeading, globalStyles.textMedium]}>
            Make sure your camera is at eye level
          </Text>
        </View>
      </View>
    </>
  );
};

export default SelfieGuide;
