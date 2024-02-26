
<h1 align="center">
    FACEKI Blaze 3.0 (React Native SDK)
</h1>


<p align="center">
  <strong>Faceki Blaze 3.0 Know Your Customer</strong><br>
</p>

## Client Id and Client Secret:

To obtain a client ID and secret for using our API, you will need to create an account on the Faceki dashboard by visiting the following URL: [Faceki Dashboard](https://apps.faceki.com/).

# Tutorial For Client ID and Secret:
 
Once you have created an account, navigate to the "Integrations" section of the dashboard and click on the "Client ID" option. From there, you can create a new client ID by following the on-screen instructions.

Please make sure to keep your client ID and secret secure, as they are used to authenticate your application and access our API data.

## Installation (RN >= 0.72)

```bash
npm i @faceki/blaze-react-native
npm i react-native-vision-camera
npm i lottie-react-native
npm i @bam.tech/react-native-image-resizer@3.0.7
```

This SDK is tested with @bam.tech/react-native-image-resizer version 3.0.7, you can use latest if doesn't work. Kindly use version 3.0.7

## Permissions

#### Android:

Add the following uses-permission to your AndroidManifest.xml (usually found at: android/app/src/main/)

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

#### IOS

Add the following usage descriptions to your Info.plist (usually found at: ios/PROJECT_NAME/)

```xml
<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your Camera.</string>
```
 
 ## Add Support for Gif in Android

Add to your dependencies in android/app/build.gradle

 ```gradle
dependencies {
  // For animated GIF support
  implementation ("com.facebook.fresco:animated-gif:2.5.0")
}

```

More information: https://reactnative.dev/docs/image?syntax=functional#gif-and-webp-support-on-android


## Troubleshoot for react-native-vector-icons

#### Android

Add this in your android/app/build.gradle If not already added.

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### IOS

Add this to info.plist if you have issues in showing icons from react native vector icons

```xml
<key>UIAppFonts</key>
    <array>
		<string>AntDesign.ttf</string>
		<string>Entypo.ttf</string>
		<string>EvilIcons.ttf</string>
		<string>Feather.ttf</string>
		<string>FontAwesome.ttf</string>
		<string>FontAwesome5_Brands.ttf</string>
		<string>FontAwesome5_Regular.ttf</string>
		<string>FontAwesome5_Solid.ttf</string>
		<string>Fontisto.ttf</string>
		<string>Foundation.ttf</string>
		<string>Ionicons.ttf</string>
		<string>MaterialCommunityIcons.ttf</string>
		<string>MaterialIcons.ttf</string>
		<string>Octicons.ttf</string>
		<string>SimpleLineIcons.ttf</string>
		<string>Zocial.ttf</string>
	</array>
```

Add this in your podfile

```ruby
target 'targetPackage' do
config = use_native_modules!

  pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
end
```
 For More Information & Detailed Guide About Icons: https://www.npmjs.com/package/react-native-vector-icons

RUN

```bash
cd ios && pod install && cd ..
```

## USAGE

```jsx
import FacekiApp from '@faceki/blaze-react-native';

<>
  <FacekiApp
    clientId="######################"
    clientSecret="######################"
    onError={onError}
    onComplete={onComplete}
    workflowId={"XXXX-XXXX-xxxX-XxXXX"} // get it from portal
    record_identifier="unique-id-from-your-side"
  />
</>;
```

Advance Usage

```jsx
import FacekiApp from '@faceki/blaze-react-native';
import { Branding } from '@faceki/blaze-react-native/src/service/types/interfaces';

 const CustomBranding:Branding ={
    colors: {
      primary: '#F8B427',
      secondary: '#343333',
      buttonColor: 'rgba(253, 181, 40, 0.10)',
      success: '#59C547',
      danger: '#FF3B30',
      warning: '#FF9500',
      info: '#5AC8FA',
      light: '#F5F5F5',
      dark: '#1C1C1E',
      background: '#f5f5f5',
      backgroundSecondary: '#eeeeee',
      backgroundCaptureBtn: '#F6F6F7',
      textDefault: '#444343',
      textSecondary: '#3E3E3E',
      fontRegular:"Inter",
      fontMedium:"Inter-Medium",
      fontBold:"Inter-Bold"
    },
    images:{
      card_guidance:"", //optional
      selfie_guidance:"" //optional
    }
  }
  
<>

      <FacekiApp
        clientId={"########"}
        clientSecret={"############"}
        workflowId={"XXXX-XXXX-xxxX-XxXXX"} // get it from portal
        record_identifier="unique-id-from-your-side"
        onError={(error) => { console.log("ERROR", error) }}
        onComplete={(data) => {

          if(data instanceof MultiDocumentKYCResponseClass){
            console.log("Multi Response")

          }else if(data instanceof SingleDocumentKYCResponseClass)
          {
            console.log("Single Response")
          }

         }}
        resultContent={{
          success:{
            heading:"",
            subHeading:""
          },
          fail:{
            heading:"",
            subHeading:""
          }
        }}

        consenttermofuseLink='https://faceki.com'
        logoURL='http://xyz.com/zyx.png'
        skipFirstScreen={true} // true | false (If you want to disable first getting started screen)
        skipGuidanceScreens={true} // true | false (if you want to hide the guidance screens)
        skipResultScreen={true} // true | false (if you want to skip the result screen and manage your logic by onError or onComplete method)
        branding={CustomBranding}

      />
</>;
```

## NOTE:

To request camera permissions from users on iOS in your app, you can utilize the 'react-native-permissions' package. However, for Android devices, the camera permission is by default handled by the package. [react-native-permissions](https://www.npmjs.com/package/react-native-permissions)

## Troubleshoot

Vector icons are causing an issue in the release build in version <= 9.2.0 in android. There is an ongoing discussion about it. Simple fix until the new version is released.

Go to node_modules/react-native-vector-icons/fonts.gradle

Add this 👇

```gradle
android.applicationVariants.all { def variant ->
    def targetName = variant.name.capitalize()
    def lintVitalAnalyzeTask = tasks.findByName("lintVitalAnalyze${targetName}")
    if (lintVitalAnalyzeTask) {
        lintVitalAnalyzeTask.dependsOn(fontCopyTask)
    }
    def generateAssetsTask = tasks.findByName("generate${targetName}Assets")
    generateAssetsTask.dependsOn(fontCopyTask)
}
```

You can read on 👉 [GitHub Discussion](https://github.com/oblador/react-native-vector-icons/issues/1508)

Sometimes it's better to reinstall all the node_modules and pods again

```bash
rm -rf node_modules && rm -rf yarn.lock && watchman watch-del-all && cd ios && rm -rf Pods && rm -rf Podfile.lock && pod deintegrate && pod cache clean --all && cd ..
npm i
cd ios && pod install
```


## Change Log

* 2024-02-26 -- 1.0.4
  * Update For Issue 413, Resize/Compress Image Added

* 2024-02-25 -- 1.0.3
  * Update Guidance Gifs

* 2024-02-25 -- 1.0.2
  * Update Vector Icon to Latest

* 2024-02-14 -- 1.0.1
  * Upgraded React Vision Camera V2 to V3

* 2024-1-24 -- 1.0.0
  * Initial Release for FACEKI BLAZE 3.0