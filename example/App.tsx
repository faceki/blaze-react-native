import React from 'react';
import FacekiApp from '@faceki/react-native-sdk'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MultiDocumentKYCResponseClass, SingleDocumentKYCResponseClass } from '@faceki/react-native-sdk/src/service/types/facekiresponse';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.container}>
        {/* will start faceki kyc flow */}

        <FacekiApp
          clientId={""}
          clientSecret={""}
          onError={(error) => { console.log("ERROR", error) }}
          onComplete={(data) => {

            if (data instanceof MultiDocumentKYCResponseClass) {
              console.log("Multi Response")

            } else if (data instanceof SingleDocumentKYCResponseClass) {
              console.log("Single Response")
            }

          }}
          resultContent={{
            success: {
              heading: "",
              subHeading: ""
            },
            fail: {
              heading: "",
              subHeading: ""
            }
          }}

          consenttermofuseLink='https://faceki.com'
          logoURL='http://xyz.com/zyx.png'
          skipFirstScreen={true}
          allowSingleOverride={false}
          skipGuidanceScreens={true}
          skipResultScreen={true}
          singleVerificationDoc="Driving License"


        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    height: 50,
    width: 200,
    backgroundColor: 'lightblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
  },
});

export default App;
