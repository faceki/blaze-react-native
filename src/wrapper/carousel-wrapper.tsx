import {useColorScheme, ScrollView, View} from 'react-native';
import React from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.component';
import {useMyStepsVerification} from '../provider/verification.context';
import CustomCarousel from '../components/carousel/carousel.component';
import KYCForm from '../components/KYC-form/KYC-form.component';
import {styles} from './styles';
import RequirementsDocuments from '../components/requirements-documents/requirements-documents';
import CaptureUserWebcam from '../components/capture-user-webcam/capture-user-webcam.component';
import PassportPhotoGuide from '../components/passport-photo-guide/passport-photo-guide';
import ClarityCheck from '../components/clarity-check/clarity-check.component';
import SelfieGuide from '../components/selfie-guide/selfie-guide.component';
import CaptureSelfie from '../components/capture-selfie/capture-selfie.component';
import Loading from '../components/loading/loading.component';
import Confirmation from '../components/confirmation/confirmation.component';
import {SlideType} from '../../App';
import AnimationComponent from '../components/animation-container';

type props = {
  slides?: SlideType[];
  logoURL?: string;
  loadingURL?: string;
};

/**
 * Renders a slideshow with a series of verification steps.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.slides - An array of image URLs to display in the slideshow.
 * @param {string} props.logoURL - The URL of the logo to display in the footer.
 * @param {string} props.loadingURL - The URL of the logo to display in the loading screen.
 * @returns {JSX.Element} - The rendered component as a JSX element.
 */

const CarouselWrapper = ({slides, logoURL, loadingURL}: props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {
    handlerUserSteps,
    userStep,
    isChecked,
    handleCheckbox,
    webcamRef,
    handleSingleCapturePhoto,
    findOutStepContent,
    goBackUserSteps,
    imgUrls,
    selectedOption,
    handleOptionChange,
    routeOfHandler,
    allowedKycDocuments,
    finalResult,
    loading,
    kycRuleError,
    skipGuidanceScreens,
    allowSingle,
    consenttermofuseLink,
    skipFirstScreen,
    skipResultScreen,
    livenessScoreOverride
  } = useMyStepsVerification();

  const content = (userStep: number) => {
    // if (([4, 9].includes(userStep) && skipGuidanceScreens)) {
    //   handlerUserSteps()
    // }

    switch (userStep) {
      case 1:
        // return <CustomCarousel slides={slides} />;
        return <AnimationComponent />;
      case 2:
        return (
          <KYCForm
            handleOptionChange={handleOptionChange}
            allowedKycDocuments={allowedKycDocuments}
            loading={loading}
            kycRuleError={kycRuleError}
            selectedOption={selectedOption}
          />
        );
      case 3:
        return (
          <RequirementsDocuments
            isChecked={isChecked}
            handleCheckbox={handleCheckbox}
            consenttermofuseLink={consenttermofuseLink}
            selectedOption={
              allowSingle ? [selectedOption] : allowedKycDocuments
            }
          />
        );
      case 4:
        return <PassportPhotoGuide />;
      case 5:
        return (
          <CaptureUserWebcam
            webcamRef={webcamRef}
            handleSingleCapturePhoto={handleSingleCapturePhoto}
            goBackUserSteps={goBackUserSteps}
            findOutStepContent={findOutStepContent}
            skipGuidanceScreens={skipGuidanceScreens}
            userStep={userStep}
            livenessScoreOverride={livenessScoreOverride}
            key={'front'}
          />
        );
      case 6:
        return (
          <ClarityCheck
            imgUrls={imgUrls}
            selectedOption={selectedOption}
            routeOfHandler={routeOfHandler}
            goBackUserSteps={goBackUserSteps}
            userStep={userStep}
            findOutStepContent={findOutStepContent}
            skipGuidanceScreens={skipGuidanceScreens}
          />
        );

      case 7:
        return (
          <CaptureUserWebcam
            webcamRef={webcamRef}
            goBackUserSteps={goBackUserSteps}
            findOutStepContent={findOutStepContent}
            skipGuidanceScreens={skipGuidanceScreens}
            key={'back'}
            handleSingleCapturePhoto={handleSingleCapturePhoto}
            userStep={userStep}
          />
        );

      case 8:
        return (
          <ClarityCheck
            imgUrls={imgUrls}
            selectedOption={selectedOption}
            routeOfHandler={routeOfHandler}
            goBackUserSteps={goBackUserSteps}
            userStep={userStep}
            findOutStepContent={findOutStepContent}
            skipGuidanceScreens={skipGuidanceScreens}
          />
        );
      case 9:
        return <SelfieGuide />;
      case 10:
        return (
          <CaptureSelfie
            webcamRef={webcamRef}
            userStep={userStep}
            findOutStepContent={findOutStepContent}
            goBackUserSteps={goBackUserSteps}
            buttonText={buttonText}
            handlerUserSteps={handlerUserSteps}
            handleSingleCapturePhoto={handleSingleCapturePhoto}
            skipGuidanceScreens
          />
        );
      case 11:
        return      <AnimationComponent verificationLoading={true} />;

      case 12:
        return <Confirmation finalResult={finalResult} />;

      default:
        return <AnimationComponent />;
    }
  };

  const buttonText = (userStep: number) => {
    // changes based on steps
    switch (userStep) {
      case 1:
        return 'Next';
      case 2:
        return 'Next';
      case 3:
        return 'Start';
      case 4:
        return 'I’m Ready';
      default:
        return undefined;
      case 9:
        return 'I’m Ready';
    }
  };

  return (
    <>
      {!loading && (
        <>
          {![5, 6, 7, 8, 10].includes(userStep) && (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={[backgroundStyle]}
              contentContainerStyle={
                userStep !== 10 && userStep !== 11
                  ? styles.mainContainer
                  : styles.cameraContainer
              }>
              <Header
                userStep={userStep}
                findOutStepContent={findOutStepContent}
                goBackUserSteps={goBackUserSteps}
                allowSingle={allowSingle}
                skipFirstScreen={skipFirstScreen}
              />
              {content(userStep)}
              <Footer
                onPress={handlerUserSteps}
                buttonText={buttonText}
                userStep={userStep}
                logoURL={logoURL}
              />
            </ScrollView>
          )}
          {[5, 6, 7, 8, 10].includes(userStep) && (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={[backgroundStyle]}
              scrollEnabled={false}
              contentContainerStyle={styles.cameraContainer}>
              {content(userStep)}
            </ScrollView>
          )}
        </>
      )}
      {loading && (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[backgroundStyle]}
          scrollEnabled={false}
          contentContainerStyle={styles.cameraContainer}>
          <AnimationComponent loading={true} />
        </ScrollView>
      )}
    </>
  );
};

export default CarouselWrapper;
