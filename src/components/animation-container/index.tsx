import {Image, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {getBranding} from '../../branding';
import { useMyStepsVerification } from '../../provider/verification.context';

const AnimationComponent = (props?: any) => {
  const context = useMyStepsVerification()
  return (
    <>
      {!props?.loading  && !props?.verificationLoading && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor:getBranding().colors.background

          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
              fontFamily: getBranding().colors.fontRegular,
              color: getBranding().colors.textDefault,
            }}>
            You will need to take a picture of your document and selfie
          </Text>
          <LottieView
            source={require('../../assets/jsons/lottieGuidance.json')}
            autoPlay
            loop
            style={{flex: 1, maxHeight: 400}}
          />

          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: getBranding().colors.fontRegular,

              color: getBranding().colors.textDefault,
            }}>
            For the best picture result
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              color: getBranding().colors.textSecondary,
              fontFamily: getBranding().colors.fontRegular,
            }}>
            Find an area for good lighting
          </Text>
        </View>
      )}

      {props?.loading && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor:getBranding().colors.background

          }}>
          <LottieView
            source={require('../../assets/jsons/lottieFirstLoading.json')}
            autoPlay
            loop
            style={{flex: 1, maxHeight: 400}}
          />

          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              color: getBranding().colors.primary,
              fontFamily: getBranding().colors.fontRegular,
            }}>
            Getting Ready...
          </Text>
        </View>
      )}
  {props?.verificationLoading && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor:getBranding().colors.background
          }}>
          <LottieView
            source={require('../../assets/jsons/lottieLoading.json')}
            autoPlay
            loop
            style={{flex: 1, maxHeight: 400}}
          />

          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              color: getBranding().colors.primary,
              fontFamily: getBranding().colors.fontRegular,
            }}>
     
     {context.resultContent?.verification?.heading || "Please Wait! We are verifying your identity"}
          </Text>
        </View>
      )}
    </>
  );
};

export default AnimationComponent;
