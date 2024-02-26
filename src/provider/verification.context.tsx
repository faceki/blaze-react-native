import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  getAccessTokenFacekiAPI,
  getWorkFlowRulesAPI,
  submitKYCRequest,
} from '../service/facekiAPI';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {HEADINGS, HEADING_TYPE} from '../wrapper/HEADINGS';
import type {PropsWithChildren} from 'react';
import {FacekiApiResponse} from '../service/types/facekiresponse';
import {Camera} from 'react-native-vision-camera';
import {Branding} from '../service/types/interfaces';
const Resizer = require("@bam.tech/react-native-image-resizer")

type userStepsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type modeType = 'user' | {exact: 'environment'};

const CONTENT = ['ID Card', 'Passport', 'Driving License'];

type ContentType = (typeof CONTENT)[number];

export type ImgUrlsType = {
  [key in ContentType]: {
    frontImage: {uri: string; path: string};
    backImage: {uri: string; path: string};
    selfie: {uri: string; path: string};
  };
};

// Define the type of the context value
type ContextType = {
  userStep: userStepsType;
  handlerUserSteps: () => void;
  goBackUserSteps: (index?: number) => void;
  HEADINGS: HEADING_TYPE;
  findOutStepContent: () => {
    step: number;
    heading: string;
    subHeading: string;
  };
  selectedOption: string;
  handleOptionChange: (event: string) => void;
  webcamRef: React.MutableRefObject<any | null>;
  handleSingleCapturePhoto: (step: number) => void;
  imgUrls: ImgUrlsType;
  finalResult:
    | {
        heading: string;
        subText: string;
        success: boolean;
      }
    | undefined;
  routeOfHandler: () => void;
  allowedKycDocuments: string[];
  isChecked: boolean;
  handleCheckbox: () => void;
  initializeClientIdAndSecret: (clientId: string, clientSecret: string) => void;
  loading: boolean;
  kycRuleError: boolean;
  allowSingle: boolean;
  skipGuidanceScreens?: boolean;
  consenttermofuseLink?: string;
  skipFirstScreen?: boolean;
  skipResultScreen?: boolean;
  branding?: Branding;
  livenessScoreOverride?: number;
  resultContent?: {
    success: {
      heading: string;
      subHeading: string;
    };
    fail: {
      heading: string;
      subHeading: string;
    };
    verification: {
      heading: string;
    };
  };
  workflowId: string;
};

type VerificationProviderProps = PropsWithChildren<{
  clientId: string;
  clientSecret: string;
  onError: (message: Error) => void;
  onComplete: (message: FacekiApiResponse) => void;
  skipGuidanceScreens?: boolean;
  consenttermofuseLink?: string;
  allowSingleOverride?: boolean;
  skipFirstScreen?: boolean;
  skipResultScreen?: boolean;
  resultContent?: {
    success: {
      heading: string;
      subHeading: string;
    };
    fail: {
      heading: string;
      subHeading: string;
    };
    verification: {
      heading: string;
    };
  };
  singleVerificationDoc?: 'Passport' | 'ID Card' | 'Driving License';
  branding?: Branding;
  livenessScoreOverride?: number;
  workflowId: string;
  record_identifier?: string;
}>;

// Create the context
const VerificationContext = createContext<ContextType>({} as ContextType);

var RESULTS = [
  {
    success: {
      heading: 'Successful',
      subText: 'Your identity verification successful',
      success: true,
    },
    error: {
      heading: 'Extra Verification Required',
      subText: 'Couldn’t verify your identity, please contact us',
      success: false,
    },
  },
];

export const VerificationProvider: React.FC<VerificationProviderProps> = ({
  children,
  clientId,
  clientSecret,
  onError,
  onComplete,
  allowSingleOverride,
  skipGuidanceScreens,
  consenttermofuseLink,
  skipFirstScreen,
  skipResultScreen,
  resultContent,
  singleVerificationDoc,
  branding,
  livenessScoreOverride,
  workflowId,
  record_identifier,
}) => {
  const [userStep, setUserStep] = useState<userStepsType>(
    skipFirstScreen ? 2 : 1,
  );
  const webcamRef = useRef<any | null>(null);
  const [allowSingle, setAllowSingle] = useState(false);
  const [allowedKycDocuments, setAllowedKycDocuments] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [clientCredentials, setClientCredentials] = useState({
    clientId: clientId,
    clientSecret: clientSecret,
  });
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [kycRuleError, setKycRuleError] = useState(false);

  useEffect(() => {
    if (skipFirstScreen) {
      setUserStep(2);
    }
  }, [skipFirstScreen]);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const [finalResult, setFinalResult] = useState<{
    heading: string;
    subText: string;
    success: boolean;
  }>();
  const [selectedOption, setSelectedOption] = useState<
    (typeof CONTENT)[number]
  >(CONTENT[0]);
  const [leftOptions, setLeftOptions] = useState<string[]>([]); // options that are left before moving ahead

  const [imgUrls, setImgUrls] = useState<ImgUrlsType>({
    ['ID Card']: {
      frontImage: {uri: '', path: ''},
      backImage: {uri: '', path: ''},
      selfie: {uri: '', path: ''},
    },
    ['Passport']: {
      frontImage: {uri: '', path: ''},
      backImage: {uri: '', path: ''},
      selfie: {uri: '', path: ''},
    },
    ['Driving License']: {
      frontImage: {uri: '', path: ''},
      backImage: {uri: '', path: ''},
      selfie: {uri: '', path: ''},
    },
  });

  const initializeClientIdAndSecret = (
    clientId: string,
    clientSecret: string,
  ) => {
    // function to be called by client library
    setClientCredentials(prev => ({
      ...prev,
      clientId,
      clientSecret,
    }));
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (cameraPermission != 'granted') {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission === 'denied') await Linking.openSettings();
    }
    return cameraPermission == 'granted';
  };

  useEffect(() => {
    if (!clientCredentials?.clientId) {
      console.error('Please provide client id and secret for faceki kyc');
    }
  }, []);

  async function getToken() {
    try {
      const newToken = await getAccessTokenFacekiAPI(
        clientCredentials.clientId,
        clientCredentials.clientSecret,
      );

      setToken(newToken);
    } catch (err) {
      console.log(err);
    }
  }

  async function getTokenWithoutGettingRules() {
    // used to refresh the token so token hasnot expired
    try {
      await getAccessTokenFacekiAPI(
        clientCredentials.clientId,
        clientCredentials.clientSecret,
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  useEffect(() => {
    if (clientCredentials.clientId) {
      getToken();
    }
  }, [clientCredentials]);

  useEffect(() => {
    async function getKYCRules(workflowId?: any) {
      try {
        const rulesWorkflows = await getWorkFlowRulesAPI(workflowId);

        if (!rulesWorkflows.result) {
          console.error('Invalid Workflow ID');
          return;
        }
        var resultValues = rulesWorkflows.result;
        setAllowedKycDocuments(resultValues.documents as string[]);
        // CASE OF SINGLE DOCUMENT Choice
        if (resultValues.document_optional) {
          setSelectedOption(resultValues.documents?.[0]);
          setAllowSingle(true);
          if (skipFirstScreen) {
            setUserStep(2);
          }
        }
        // CASE OF No Choice
        else {
          if (skipFirstScreen) {
            setUserStep(3);
          }
        }
        setLoading(false);
        const copyLeftOptions = [...resultValues.documents];
        copyLeftOptions.shift(); // remove first element from an array
        setLeftOptions(copyLeftOptions);
      } catch (err) {
        console.log(err);
        setKycRuleError(true);
      }
    }

    if (token) {
      getKYCRules(workflowId);
    }
  }, [token]);

  const handleSingleCapturePhoto = async (
    step: number,
    image?: any,
    refOverride?: any,
  ) => {
    const allowedToAccessCamera = await checkCameraPermission();

    // if not allowed to access camera dont proceed
    if (!allowedToAccessCamera) {
      return;
    }

    if (!image) {
      if (webcamRef.current) {
        var imageSrc = await webcamRef?.current?.takePhoto?.({
          enableShutterSound: false,
          enableAutoStabilization: true,
        });
      } else {
        var imageSrc = await refOverride?.current?.takePhoto?.({
          enableShutterSound: false,
          enableAutoStabilization: true,
        });
      }
    } else {
      var imageSrc = image;
    }

    if (imageSrc?.path) {
      if (step === 5) {
        setImgUrls(prev => ({
          ...prev,
          [selectedOption]: {
            ...prev[selectedOption],
            frontImage: imageSrc,
          },
        }));
      }
      if (step === 7) {
        setImgUrls(prev => ({
          ...prev,
          [selectedOption]: {
            ...prev[selectedOption],
            backImage: imageSrc,
          },
        }));
      }

      if (step === 10) {


        //Compressing
        try {
          let result = await Resizer.default.createResizedImage(
            (Platform.OS === 'android' ? 'file://' : '') + imageSrc.path,
            1920,
            1080,
            'JPEG',
            100,
            0,
            undefined,
            false,
            {
              mode: "contain",
              onlyScaleDown:true,
            }
          );
            console.log(result)
            imageSrc = result
          // setResizedImage(result);
        } catch (error) {
          console.log(error)
          // Alert.alert('Unable to resize the photo');
        }
      



        setImgUrls(prev => ({
          ...prev,
          [selectedOption]: {
            ...prev[selectedOption],
            selfie: imageSrc,
          },
        }));




        setUserStep(prev => (prev + 1) as userStepsType);
        console.log(imgUrls);

        const payload = Object.entries(imgUrls)
          .map(([documentType, documentData]) => ({
            document_type: documentType,
            document_front: documentData.frontImage
              ? documentData.frontImage.path
              : '',
            document_back: documentData.backImage
              ? documentData.backImage.path
              : '',
          }))
          .filter(
            ({document_front, document_back}) =>
              document_front !== '' && document_back !== '',
          );
        console.log(JSON.stringify(payload), allowSingle);
        if (!allowSingle) {
          if (allowedKycDocuments.length == payload.length) {
            var formData = new FormData();
            for (let index = 0; index < payload.length; index++) {
              const element = payload[index];
              formData.append(`document_${index + 1}_front`, {
                uri:
                  Platform.OS == 'android'
                    ? 'file://' + element.document_front
                    : element.document_front,
                type: 'image/jpeg',
                name: `photo_front_image.jpg`,
              });

              if (element.document_back && element.document_back != '') {
                formData.append(`document_${index + 1}_back`, {
                  uri:
                    Platform.OS == 'android'
                      ? 'file://' + element.document_back
                      : element.document_back,
                  type: 'image/jpeg',
                  name: `photo_front_image.jpg`,
                });
              }
            }

            formData.append('selfie', {
              uri:
                Platform.OS == 'android'
                  ? 'file://' + `${imageSrc.path}`
                  : `${imageSrc.path}`,
              type: 'image/jpeg',
              name: `photo_selfie_image.jpg`,
            });

            formData.append('workflowId', workflowId);
            formData.append('record_identifier', record_identifier);

            console.log(formData);
            submitKYCRequest(formData)
              .then(res => {
                console.log(res);

                const responseWithType = FacekiApiResponse.createInstance(
                  res.status,
                  res.code,
                  res.message,
                  res.appVersion,
                  res.result,
                );

                onComplete && onComplete(responseWithType);

                handleError(res);
              })
              .catch(err => {
                console.log(err);

                onError && onError(err);
              });
          }
        } else {
          var formData = new FormData();
          console.log('Starting');
          formData.append(`document_1_front`, {
            uri:
              Platform.OS == 'android'
                ? 'file://' + payload[0].document_front
                : payload[0].document_front,
            type: 'image/jpeg',
            name: `photo_front_image.jpg`,
          });
          if (payload[0].document_back && payload[0].document_back != '') {
            formData.append(`document_1_back`, {
              uri:
                Platform.OS == 'android'
                  ? 'file://' + payload[0].document_back
                  : payload[0].document_back,
              type: 'image/jpeg',
              name: `photo_front_image.jpg`,
            });
          }

          formData.append('selfie', {
            uri:
              Platform.OS == 'android'
                ? 'file://' + `${imageSrc.path}`
                : `${imageSrc.path}`,
            type: 'image/jpeg',
            name: `photo_selfie_image.jpg`,
          });

          formData.append('workflowId', workflowId);
          formData.append('record_identifier', record_identifier);

          submitKYCRequest(formData)
            .then(res => {
              console.log(res);
              const responseWithType = FacekiApiResponse.createInstance(
                res.status,
                res.code,
                res.message,
                res.appVersion,
                res.result,
              );
              onComplete && onComplete(responseWithType);

              handleError(res);
            })
            .catch(err => {
              console.log(err);
              onError && onError(err);
            });
        }

        return;
      }
      if ([5, 7, 10].includes(step)) {
        setUserStep(prev =>
          prev == step ? ((prev + 1) as userStepsType) : prev,
        );
      }
    }
  };

  const handleError = (response: any) => {
    if (response.result?.decision == 'ACCEPTED') {
      let result = RESULTS[0].success;
      if (resultContent) {
        result.heading = resultContent.success.heading;
        result.subText = resultContent.success.subHeading;
      }

      setFinalResult(result);
      if (!skipResultScreen) {
        setUserStep(prev => (prev + 1) as userStepsType);
      }
    } else {
      if ([8004, 8005, 8006, 8007, 8008, 8009, 5004].includes(response?.code)) {
        setUserStep(prev => (prev - 1) as userStepsType);
      } else {
        let result = RESULTS[0].error;
        if (resultContent) {
          result.heading = resultContent.fail.heading;
          result.subText = resultContent.fail.subHeading;
        }

        setFinalResult(result);
        if (!skipResultScreen) {
          setUserStep(prev => (prev + 1) as userStepsType);
        }
      }
    }
  };

  const handlerUserSteps = () => {
    if (loading && userStep == 1) {
      return;
    }
    if ([3, 8].includes(userStep) && skipGuidanceScreens) {
      setUserStep(prev => (prev + 2) as userStepsType);
      return;
    }

    if (!allowSingle && userStep === 1) {
      setUserStep(prev => (prev + 2) as userStepsType);
      return;
    }
    if (userStep === 2) {
      if (loading || kycRuleError) {
        Alert.alert('Please select kyc type', '', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {}},
        ]);
        return;
      }
    }
    if (userStep === 3) {
      if (!isChecked) {
        Alert.alert('Please agree to terms and conditions', '', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {}},
        ]);
        return;
      }
    }

    setUserStep(prev => (prev + 1) as userStepsType);
  };

  const routeOfHandler = () => {
    if (userStep === 6 && selectedOption === 'Passport') {
      setUserStep(prev => (prev + 1) as userStepsType);
      moveForwardonlyIfNoLeftOption();
    }

    if (userStep === 8) {
      moveForwardonlyIfNoLeftOption();
    } else {
      handlerUserSteps();
    }
  };

  const moveForwardonlyIfNoLeftOption = () => {
    if (leftOptions.length === 0 || allowSingle) {
      if (skipGuidanceScreens) {
        setUserStep(prev => (prev + 2) as userStepsType);
      } else {
        setUserStep(prev => (prev + 1) as userStepsType);
      }
      return;
    }
    setUserStep(prev => (prev - 3) as userStepsType);

    // make the left option to be selected
    setSelectedOption(leftOptions[0]);

    // remove left option
    const copyLeftOptions = [...leftOptions];
    copyLeftOptions.shift();
    setLeftOptions(copyLeftOptions);
  };

  const goBackUserSteps = (index?: number) => {
    setUserStep((prev: any) => {
      if (index) {
        return (prev - index) as userStepsType;
      } else {
        return (prev - 1) as userStepsType;
      }
    });
  };

  // Function for getting Content
  const findOutStepContent = () => {
    if (userStep === 4 || userStep === 5 || userStep === 6 || userStep === 7) {
      const data = HEADINGS.filter(heading => heading.step === userStep)[0];
      const newData = {...data};
      newData.heading = `${newData.heading} ${selectedOption}`;
      return newData;
    }
    return HEADINGS.filter(heading => heading.step === userStep)[0];
  };

  // Function for selecting document
  const handleOptionChange = (event: string) => {
    setSelectedOption(event);

    const targetIndex = allowedKycDocuments.indexOf(event);

    const copyLeftOptions = [...allowedKycDocuments];

    // sort them based on new selection
    if (targetIndex !== -1) {
      copyLeftOptions.sort((a, b) => {
        if (a === event) {
          return -1; // a should come before b
        } else if (b === event) {
          return 1; // b should come before a
        } else {
          return 0; // leave the order unchanged
        }
      });
    }

    copyLeftOptions.shift();
    setLoading(false);
    // copyLeftOptions.shift(); // remove first element from an array
    setLeftOptions(copyLeftOptions);
  };

  return (
    <VerificationContext.Provider
      value={{
        userStep,
        handlerUserSteps,
        goBackUserSteps,
        HEADINGS,
        findOutStepContent,
        selectedOption,
        handleOptionChange,
        allowedKycDocuments,
        handleSingleCapturePhoto,
        webcamRef,
        imgUrls,
        finalResult,
        routeOfHandler,
        isChecked,
        handleCheckbox,
        initializeClientIdAndSecret,
        loading,
        kycRuleError,
        skipGuidanceScreens,
        allowSingle,
        consenttermofuseLink,
        skipFirstScreen,
        branding,
        resultContent,
        livenessScoreOverride,
        workflowId,
      }}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useMyStepsVerification = () => useContext(VerificationContext);
