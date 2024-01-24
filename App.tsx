import React, { useEffect } from 'react';

import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { VerificationProvider } from './src/provider/verification.context';
import CarouselWrapper from './src/wrapper/carousel-wrapper';
import { FacekiApiResponse } from './src/service/types/facekiresponse';
import { Branding } from './src/service/types/interfaces';
import {getBranding, updateBranding} from './src/branding'
export type SlideType = { url: string; heading: string; subHeading: string };
import Toast from 'react-native-toast-message';

/**
 * An object containing the props for the KYC verification component.
 *
 * @param {string} clientId - The client ID for the KYC verification service.
 * @param {string} clientSecret - The client secret for the KYC verification service.
 * @param {string} logoURL - The URL for the image to display in the footer of the KYC verification process. (optional)
 * @param {string} loadingURL - The URL for the image to display in the loading animation on loading screen. (optional)
 * @param {Array} slides - An array of objects representing the slides to display in the KYC verification process with heading and subHeading. (optional)
 * @param {Function} onError - A function that handles errors that occur during the KYC verification process.
 * @param {Function} onComplete - A function that is called when the KYC verification process is complete.
 */

type props = {
  clientId: string;
  clientSecret: string;
  logoURL?: string;
  loadingURL?: string;
  slides?: SlideType[];
  onError: (message: FacekiApiResponse | Error) => void;
  onComplete: (message: FacekiApiResponse) => void;
  skipGuidanceScreens?: boolean
  consenttermofuseLink?: string
  skipFirstScreen?:boolean;
  skipResultScreen?:boolean;
  resultContent?: {
    success: {
      heading: string;
      subHeading: string
    },
    fail: {
      heading: string;
      subHeading: string
    },
    verification:{
      heading: string;
    }
  },
  branding?:Branding,
  livenessScoreOverride?:number
  workflowId:string;
  record_identifier?:string
};

function App({
  clientId,
  clientSecret,
  logoURL,
  slides,
  onError,
  onComplete,
  loadingURL,
  skipGuidanceScreens,
  consenttermofuseLink,
  skipFirstScreen,
  skipResultScreen,
  resultContent,
  branding,
  livenessScoreOverride,
  workflowId,
  record_identifier
}: props): JSX.Element {
  useEffect(()=>{
    if(!branding)
    {
      console.log("Using Default Branding")
      branding  = getBranding()
    }else{
      updateBranding(branding)
      console.log("Using Custom Branding")
    }
  },[branding])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <VerificationProvider
      workflowId={workflowId}
        clientId={clientId}
        clientSecret={clientSecret}
        onError={onError}
        onComplete={onComplete}
        skipGuidanceScreens={skipGuidanceScreens}
        consenttermofuseLink={consenttermofuseLink}
        skipFirstScreen={skipFirstScreen}
        skipResultScreen={skipResultScreen}
        resultContent={resultContent}
        branding={branding}
        livenessScoreOverride={livenessScoreOverride}
        record_identifier={record_identifier}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <CarouselWrapper
          slides={slides}
          logoURL={logoURL}
          loadingURL={loadingURL}
        />
         

      </VerificationProvider>
      <Toast />
    </SafeAreaView>
  );
}

export default App;
